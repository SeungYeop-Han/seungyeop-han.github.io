---
layout: page
title: 팔로우 멱등성 구현 시 발생한 문제 상황과 해결 방안 결정을 위한 여정
description: 원티드 포텐업 - 두 번째 LXP 프로젝트 진행 중 경험한 문제 해결 여정 공유
tag: DDD, EventStorming, Layered Architecture, JPA, Spring Boot
img: /assets/img/project/2025-12-11-wanted-lxp-3rd/thumbnail.jpg
date: 2025-12-11
importance: 1
category: retrospect
giscus_comments: true  
---

## 상황

팔로우 및 언팔로우의 멱등성이 잘 동작하는 지 테스트하고 있었음

### 서비스 메서드

```java
@Service
@Transactional
public class FollowCommandService {

    private final FollowRepository followRepository;

    public FollowCommandService(FollowRepository followRepository) {
        this.followRepository = followRepository;
    }

    public void follow(Long followerId, Long followeeId) {
        Follow follow = new Follow(followerId, followeeId);
        try {
            followRepository.save(follow);
        } catch (DataIntegrityViolationException e) {
            // 다른 트랜잭션에서 이미 팔로우 처리가 완료된 경우에도 문제 없이 넘어가야 함. (팔로우 멱등성 보장)
        }
    }

    public void unfollow(Long followerId, Long followeeId) {
        try {
            followRepository.deleteByFollowerIdAndFolloweeId(followerId, followeeId);
        } catch (DataIntegrityViolationException e) {
            // 다른 트랜잭션에서 이미 팔로우 취소가 완료된 경우에도 문제 없이 넘어가야 함. (팔로우 취소 멱등성 보장)
        }
    }

    public void unfollowById(Long userId, Long followId) {
        Optional<Follow> optionalFollow = followRepository.findById(followId);
        if (optionalFollow.isEmpty()) {
            // 이미 취소된 팔로우에 대해서도 문제 없이 넘어가야 함. (팔로우 취소 멱등성 보장)
            return;
        }

        Follow followFound = optionalFollow.get();
        if (!followFound.getFollowerId().equals(userId)) {
            throw new FollowException(UNFOLLOW_PERMISSION_DENIED);
        }

        try {
            followRepository.delete(followFound);
        } catch (DataIntegrityViolationException e) {
            // 다른 트랜잭션에서 이미 팔로우 취소가 완료된 경우에도 문제 없이 넘어가야 함. (팔로우 취소 멱등성 보장)
        }
    }
}

```

### 테스트 코드

```java
@SpringBootTest
@ActiveProfiles("test-clean-console")
@Transactional
class FollowCommandServiceTest {

    private final FollowJpaRepository followJpaRepository; // flush 용
    private final FollowRepository followRepository;
    private final FollowCommandService followCommandService;

    @Autowired
    public FollowCommandServiceTest(FollowJpaRepository followJpaRepository, FollowRepository followRepository, FollowCommandService followCommandService) {
        this.followJpaRepository = followJpaRepository;
        this.followRepository = followRepository;
        this.followCommandService = followCommandService;
    }

    // Setup & Teardown --------------------

    private final Long FOLLOWER_ID = 1L;
    private final Long FOLLOWEE_ID = 2L;

    @BeforeEach
    void setup() {
        followCommandService.follow(FOLLOWER_ID, FOLLOWEE_ID);
    }

    @AfterEach
    void teardown() {
        followCommandService.unfollow(FOLLOWER_ID, FOLLOWEE_ID);
    }

    // Unit Tests --------------------

    @Test
    void shouldFollowIdempotent() {

        Follow found1 = followRepository.findByFollowerIdAndFolloweeId(FOLLOWER_ID, FOLLOWEE_ID).get();
        long followeeCount1 = followRepository.countByFollowerId(FOLLOWER_ID);
        long followerCount1 = followRepository.countByFolloweeId(FOLLOWEE_ID);

        followCommandService.follow(FOLLOWER_ID, FOLLOWEE_ID);

        Follow found2 = followRepository.findByFollowerIdAndFolloweeId(FOLLOWER_ID, FOLLOWEE_ID).get();
        long followeeCount2 = followRepository.countByFollowerId(FOLLOWER_ID);
        long followerCount2 = followRepository.countByFolloweeId(FOLLOWEE_ID);

        assertAll(
                () -> assertEquals(found1, found2), 
                () -> assertEquals(followerCount1, followerCount2), 
                () -> assertEquals(followeeCount1, followeeCount2)
        );
    }

    @Test
    void shouldUnfollowIdempotent() {

        Follow found = followRepository.findByFollowerIdAndFolloweeId(FOLLOWER_ID, FOLLOWEE_ID).get();
        long followeeCount = followRepository.countByFollowerId(FOLLOWER_ID);
        long followerCount = followRepository.countByFolloweeId(FOLLOWEE_ID);

        followCommandService.unfollow(FOLLOWER_ID, FOLLOWEE_ID);

        assertAll(
                () -> assertTrue(followRepository.findById(found.getId()).isEmpty()), 
                () -> assertEquals(followeeCount - 1, followRepository.countByFolloweeId(FOLLOWEE_ID)), 
                () -> assertEquals(followerCount - 1, followRepository.countByFollowerId(FOLLOWER_ID))
        );
    }
}
```

## 문제 발생

souldFollowIdempotent 테스트 메서드가 계속해서 예외를 던짐

- Entry for instance of 'com.gorogoro.followandlike.follow.domain.model.**Follow' has a null identifier** (this can happen if the session is flushed after an exception occurs)

## 원인 분석

조사 결과 테스트 클래스(`FollowCommandServiceTest`) 에 `@Transactional` 이 붙으면 트랜잭션 단위가 다음과 같이 묶인다는 것을 알게됨

- `@BeforeEach` → `@Test` → `@AfterEach`
- 서비스의 트랜잭션은 테스트 트랜잭션의 합류하게 됨(`Propagation.REQUIRED`)

즉, 하나의 트랜잭션 안에서 다음과 같이 동작할 것임

1. `@BeforeEach`
    
    ```java
    @BeforeEach
    void setup() {
        followCommandService.follow(FOLLOWER_ID, FOLLOWEE_ID);
    }
    ```
    
2. `@Test shouldFollowIdempotent`
    1. 첫 번째 조회는 정상 작동
        
        ```java
        Follow found1 = followRepository.findByFollowerIdAndFolloweeId(FOLLOWER_ID, FOLLOWEE_ID).get();
        long followeeCount1 = followRepository.countByFollowerId(FOLLOWER_ID);
        long followerCount1 = followRepository.countByFolloweeId(FOLLOWEE_ID);
        ```
        
    2. 동일 `Follow` 엔티티 삽입에 따른 예외(`DataIntegrityViolationException`) 발생 → **롤백!**
        
        ```java
        followCommandService.follow(FOLLOWER_ID, FOLLOWEE_ID);
        
        // 한편 follow 메서드는 다음과 같음
        public void follow(Long followerId, Long followeeId) {
            Follow follow = new Follow(followerId, followeeId);
            try {
                followRepository.save(follow);
            } catch (DataIntegrityViolationException e) {
                // 다른 트랜잭션에서 이미 팔로우 처리가 완료된 경우에도 문제 없이 넘어가야 함. (팔로우 멱등성 보장)
            }
        }
        ```
        
    3. 롤백이 되면서 `@BeforeEach setup` 메서드에서 save 된 `Follow` 엔티티 생성 취소(롤백)
    4. 따라서 두 번째 조회에서 예외 발생
        
        ```java
        Follow found2 = followRepository.findByFollowerIdAndFolloweeId(FOLLOWER_ID, FOLLOWEE_ID).get();
        long followeeCount2 = followRepository.countByFollowerId(FOLLOWER_ID);
        long followerCount2 = followRepository.countByFolloweeId(FOLLOWEE_ID);
        ```
        
        - 예외 메시지
            - `org.hibernate.AssertionFailure`: Entry for instance of 'com.gorogoro.followandlike.follow.domain.model.**Follow' has a null identifier** (this can happen if the session is flushed after an exception occurs)

## 해결 시도

- 테스트 클래스에 적용된 `@Transactional` 애노테이션 제거 각각 별도의 트랜잭션 단위로 묶이도록 함
- `@BeforeEach`
    
    ```java
    // 아래 서비스 메서드의 트랜잭션 단위를 따름
    followCommandService.follow(FOLLOWER_ID, FOLLOWEE_ID);
    ```
    
- `@Test`, `@AfterEach` 에 대해서도 위와 같이 서비스 메서드에 적용된 트랜잭션 단위대로 분리됨

이제 문제가 해결 될 것이라고 기대했으나 아니었음.

## 문제 발생 2

- org.springframework.transaction.`UnexpectedRollbackException`: Transaction silently rolled back because it has been marked as rollback-only

## 원인 분석 2

- `JpaRepository` 의 메서드들은 기본적으로 `@Transactional` 이 붙어있음. `JpaRepository` 인터페이스의 구현체인 `SimpleJpaRepository` 를 살펴보면 다음과 같다.
    
    ```java
    @Repository
    **@Transactional(readOnly = true)**
    public class SimpleJpaRepository<T, ID> implements JpaRepositoryImplementation<T, ID> {
    
    		...
    		
    		@Override
    		**@Transactional**
    		public <S extends T> S **save**(S entity) {
    	
    			Assert.notNull(entity, ENTITY_MUST_NOT_BE_NULL);
    	
    			if (entityInformation.isNew(entity)) {
    				entityManager.persist(entity);
    				return entity;
    			} else {
    				return entityManager.merge(entity);
    			}
    		}
    		
    		...
    		
    		@Override
    		public Optional<T> **findById**(ID id) {
    	
    			Assert.notNull(id, ID_MUST_NOT_BE_NULL);
    	
    			Class<T> domainType = getDomainClass();
    	
    			if (metadata == null) {
    				return Optional.ofNullable(entityManager.find(domainType, id));
    			}
    	
    			LockModeType type = metadata.getLockModeType();
    			Map<String, Object> hints = getHints();
    	
    			return Optional.ofNullable(
    					type == null ? entityManager.find(domainType, id, hints) : entityManager.find(domainType, id, type, hints));
    		}
    ```
    
    - 수정 메서드(ex. `save`, `delete` 등) 에는 `@Transactional` 이 적용되어 있고,
    - 조회 메서드(ex. `findById` 등) 에는 클래스에 붙은 `@Transactional(readOnly = true)` 가 적용되고 있음을 확인할 수 있다.
- 트랜잭션 실행 중 `JpaRepository` 의 `save` 메서드 실행 중 DB 에서 기본키 제약사항 오류가 발생해서 rollback 해야 한다고 표시되었으나, 서비스에서 발생한 예외를 잡은 뒤 다시 던지지 않고 있으므로 커밋 시점에 “어? rollback-only 로 표시되어 있는데 예외(예상컨데, `DataIntegrityViolationException`)가 발생 안 했네?” 하면서 예상치 못한 롤백 예외(`UnexpectedRollbackException`)가 발생한다.
- 근데 자료조사하면서 알게 된 것은 일반적으로 `JpaRepository` 의 `save` 메서드를 호출해도 즉시 쿼리가 나가지 않고, 트랜잭션 종료 시점에 한 번에 전송된다는 것이다. → **Transactional write-behind**
- JPA 표준 스펙에서도 persist 가 호출될 때 INSERT 쿼리를 보내는 것이 필수가 아니라고 한다.
- 근데 그 말대로면 [위와 같이 예외가 잡힌 부분](https://www.notion.so/2c6649136c1180b9aedbe896ffa03aae?pvs=21)이 설명되지 않는다. 다시 말해, write-behind 로 인해 `UnexpectedRollbackException` 을 catch 절에서 못 잡아야 하는게 맞는데, catch 절 내의 print 문이 동작함을 확인할 수 있다.
    
    ```java
    ...
    try {
        followRepository.save(follow);
    } catch (DataIntegrityViolationException e) {
        // 다른 트랜잭션에서 이미 팔로우 처리가 완료된 경우에도 문제 없이 넘어가야 함. (팔로우 멱등성 보장)
        System.out.println("WHAT THE?");
    }
    ...
    ```
    
    - “WHAT THE?” 출력 됨
- 그 이유는 하이버네이트 구현체에서 persist 메서드가 동작하는 원리 때문이다.
    - 현재 `Follow` 엔티티는 `@GeneratedValue(strategy = GenerationType.IDENTITY)` 로 선언되어 있는데, 이 키 전략을 사용하는 경우 write-behind 를 적용하지 않고 즉시 쿼리를 날린다고 한다.
    - 쿼리를 받은 DB 에서 기본키 제약조건 위반에 따라 에러를 발생시키고, 이에 따라 `DataIntegrityVioloationException` 이 발생한다.
    - 이러한 예외는 영속성 컨텍스트에 저장한 시점에 ID 를 알아야 한다는 요구와 충돌하기 때문이다?

이 시점에서 [처음에 발생했던 예외](https://www.notion.so/2c6649136c1180b9aedbe896ffa03aae?pvs=21)가 발생한 원인도 알 수 있다.

1. `@BeforeEach setup` 에서 `follow` 호출
    1. → 내부에서 `save` 호출
    2. → `Follow` 의 키 전략이 `IDENTITY` 이므로 즉시 flush 되어 db 에 쿼리가 날아감
    3. → 정상적으로 생성됨
2. `@Test shouldFollowIdempotent` 에서
    1. 위에서 생성한 엔티티 조회(조회의 경우 즉시동기적으로 쿼리됨에 주의)
    2. 위에서 생성한 `Follow` 와 중복되도록 `follow` 호출
        1. → 내부에서 `save` 호출
        2. → `Follow` 의 키 전략이 `IDENTITY` 이므로 즉시 flush 되어 db 에 쿼리가 날아감
        3. → 기본키 제약사항 위반으로 인해 DB 에서 오류 발생
        4. → 발생한 오류가 수신된 뒤 `DataIntegrityViolationException` 내부 예외로 변환됨
        5. → `follow` 메서드의 try-catch 절에 위 예외가 잡힘
    3. `follow` 에서 `@Test shouldFollowIdempotent` 메서드로 복귀함. 바로 이전에 예외가 잡힌 후 던져지지 않았기 때문에 이 시점에 문제가 발생하지는 않음. 또한 아직 트랜잭션 안 끝났으므로(다시 말하지만 트랜잭션 범위는 `@AfterEach teardown` 까지임) 에러는 발생하지 않음
    4. 이 시점의 1차 캐시에는 앞서 `@BeforeEach` 에서 삽입한 첫 번째 `Follow` 엔티티 (이하 F1) 과 두 번째로 삽입 시도한 `Follow` 엔티티(이하 F2) 가 모두 존재함. F2 의 경우, 앞서 DB 에서 기본키 제약조건 때문에 save 에 실패했으므로 id 가 설정되지 않은 채로 저장되어 있음.
    5. 위에서 생성한 엔티티 두 번째로 조회
        1. 여기서 중요한 점은 바로 JPA 표준 + Hibernate 기본 설정(`FlushModeType.AUTO`)에서, 조회 메서드를 호출하면 쿼리를 보내기 전에 `EntityManager` 가 알아서 `flush` 를 호출한다는 점임.
        2. `flush` 에서 F1 은 문제가 안 됨. 이미 영속화 된 최신 엔티티니까. 문제는 F2 임. 아직 id 가 null 인 엔티티가 캐시에 존재하는 상황에서 `flush`  가 호출되었으므로 `AssertionFailure` 가 발생함!
3. 예외가 try-catch 등으로 처리되지 않고 있으므로 테스트는 실패한다!

여기서 기억해야 할 핵심 포인트는, JPA/Hibernate 에서 flush 중 예외가 발생하면, 해당 `EntityManager` 및 `Session` 은 정상적으로 사용할 수 없는 상태가 된다는 것이다.

JPA 스펙에서도 flush 중 예외가 발생한 이후에는

- `EntityManager` 는 더 이상 신뢰할 수 없으며 해당 트랜잭션은 롤백해야 한다고 알리고 있다. 때문에 Hibernate 역시 [**앞선 예외 메시지**](https://www.notion.so/2c6649136c1180b9aedbe896ffa03aae?pvs=21)에서 처럼 “(this can happen if the session is flushed after an exception occurs)” 라는 단서 문장을 붙인 것이기도 하다.

이런 관점에서 기존 서비스 메서드 `follow` 에서 `DataIntegrityViolationException` 을 잡은 뒤 “아무 일도 없었던 것 처럼” 계속 진행하는 것은 절대적으로 피해야 할 안티패턴임을 알 수 있다. 물론 `follow` 의 경우 예외를 잡은 후 추가적인 로직을 진행하지 않고 곧장 반환하고 있기는 하지만 나중에 로직이 변경되면서, 이후의 추가적인 영속화 로직이 실수로 추가되지 않을 것이라고 장담하기는 힘들다.

## 해결 방법

앞선 원인 분석 과정에서

- 서비스 레이어에서 발생한 예외를 잡은 뒤 아무 일도 없던 것 처럼 return 한다고 해서 idempotent 하게 처리 할 수 없음을 확인했으며
- 기존 서비스 메서드 `follow` 에서 처럼, `flush` 과정에서 발생한 예외(ex.  `DataIntegrityViolationException` 등)을 잡은 뒤 “아무 일도 없었던 것 처럼” 계속 진행하는 것은 절대적으로 피해야 할 안티패턴임 이라는 것을 알게 되었다.

이를 바탕으로 해결 책을 모색해보자.

일단 삭제(언팔로우)에 대해서는 try-catch 절을 없애도 멱등성이 보장된다. 추가적인 조사 결과, `JpaRepository` 의 delete 계열 메서드 호출 시, 삭제 대상이 DB 에 존재하지 않더라도 별도의 예외를 발생시키지 않는다는 것을 알게 되었다. 멱등 삭제 시 별도의 try-catch 절은 없어도 된다.

문제는 `follow` 이다.

1. 일단 예외를 그냥 던지고 presentation 계층에서 처리하도록 만들기
    - 여기서 기존 방식의 문제가 하나 더 있는데 바로 `DataIntegrityViolationException` 의 범위가 너무 크다는 점이다. 해당 예외는 기본키 중복에 의한 예외 외에도 수 많은 제약사항 위반 경우를 전부 포괄한다. 따라서 해당 예외를 잡고 끝인게 아니라 해당 예외 객체의 `cause` 를 파고 들어가서 기본키 제약사항 위반 시 발생하는 예외를 감지하고 해당 경우에만 멱등 처리하도록 만들어야 한다.
    - 위와 같은 처리를 팔로우 처리하는 프레젠테이션 레이어 핸들러에서 처리해주어야 하는데 문제가 있다.
        - 이 경우 특정 DBMS 에 의존적인 예외가 외부에 노출된다는 단점이 있어서 나중에 DB 바꾸거나 할 때 이 부분 바꿔줘야 한다.
        - 확장성 떨어지는 설계이므로 이 안을 우선적으로 고려하고 싶지는 않다.
2. 서비스 계층에서 follow 저장하는 정적 내부 클래스 선언.
    - 그러니까 기존 `follow` 메서드가 트랜잭션을 타지 않도록 바꾼 뒤, 정적 내부 클래스에서 `save` 한 뒤 예외 발생 시 해당 예외를 더 이상 트랜잭션 범위로 묶이지 않는 `follow` 메서드에 전파시킨다.
    - 그런 다음 이전 방법에서 처럼 예외의 cause 를 파고 들어가 기본키 중복의 경우에만 멱등처리하도록 만들 수 있다.
        
        ```java
        @Service
        @Transactional
        public class FollowCommandService {
        
        		...
        		
        		@Transactional(propagation = Propagation.NOT_SUPPORTED)
            public void follow(Long followerId, Long followeeId) {
                Follow follow = new Follow(followerId, followeeId);
                try {
                    FollowSaver.of(followRepository).save(follow);
                } catch (DataIntegrityViolationException e) {
                    **// 기본키 제약사항 위반인 경우에만 멱등 처리되도록 하는 코드**
                    ...
                }
            }
            
            ...
            
            public static class FollowSaver {
        
                private FollowRepository followRepository;
        
                private FollowSaver(FollowRepository followRepository) {
                    this.followRepository = followRepository;
                }
        
                public static FollowSaver of(FollowRepository followRepository) {
                    return new FollowSaver(followRepository);
                }
        
                @Transactional
                public void save(Follow follow) {
                    followRepository.save(follow);
                }
            }
        }
        ```
        
    - 이 방식의 문제는 우리의 코드가 여전히 특정 DBMS 에 의존적인 예외를 알고 있어야 한다는 것에 있다. 확장성은 여전히 떨어진다.
    - 또한 `follow` 메서드가 트랜잭션을 중단시켜버리는 것 역시, 현재는 문제가 없지만 나중에 감지하기 어려운 에러의 원인이 될 수 있다. 다른 서비스에서 `follow` 메서드를 호출하게 되는 경우가 생길 수 있고 이 경우 트랜잭션이 끊겨버려서 트랜잭션의 의도된 원자성이 깨질 수 있다. 또한 이 문제를 인지했다 하더라도, 새로운 멱등 로직을 고안해야 한다. 그럴 거면 애초에 해당 방법을 사용해서 해결하는 게 맞다. 이 방법도 그닥 사용하고 싶지는 않다.
3. DB upsert 쿼리를 이용한 멱등 구현
    - DB 쿼리 수준에서 upsert(없으면 insert 있으면 update) 처리가 가능하다. 해당 쿼리를 구현하는 리포지토리에서 upsert 쿼리를 수행하는 메서드를 정의하고 이를 사용할 수 있다.
    - 특정 DBMS 에 의존하는 예외 처리 로직을 구현해야 한다는 문제도 없으며, 트랜잭션 중단 문제도 일어나지 않는다. 동시에 동시성 문제까지 자연스럽게 해결되므로 현재로서는 최선의 방법일 것 같다.
        - 특히 동시성 문제에 대해서는, 기존에는 select 후 문제가 없으면 save 하는 식으로 동작해야 했으며, 트랜잭션 분리 수준에 따라 여전이 동시성 문제가 존재할 수 있었다. 특히 쿼리가 하나 더 날아간다는 점이 더더욱 불쾌했던 지점이었다.
        - upsert 쿼리를 사용하면 중복 체크와 생성 또는 삽입 로직이 애초에 DB 수준에서 원자적으로 수행되므로 이런 부분을 신경 쓸 필요가 없다는 뜻이다. 개좋음
        - 정리하면
            - 애플리케이션 코드가 간결해지고 신경 쓸 부분도 줄어듦
            - 경합 조건 관리 불필요(DB 가 원자적으로 처리함)
            - 성능 최적화(불필요하게 select 한 번 더 날리지 않아도 됨)
            - 중복 시 예외 처리 고민 안 해도 됨 → 내가 위에서 신나게 삽질한 그 부분 없어도 됨
    - 그러나 문제 역시 존재한다.
        - 성능 저하 가능성, upsert 쿼리는 insert 쿼리에 더해 추가적인 비용이 존재한다. 당연하게도 중복 여부를 체크해야 하기 때문이다. insert 쿼리만으로 가능한 것을 굳이 upsert 로 처리할 필요는 없다. 그럴 사람도 없겠지만
        - 사실 내 생각에 가장 큰 문제는 upsert 쿼리 문법이 dbms 마다 다르다는 것이다. 예를 들어
            - MySQL & H2 의 경우 `INSERT IGNORE INTO` 또는 `ON DUPLICATE KEY UPDATE` 문법을 사용하고
            - PostgreSQL 의 경우 `ON CONFLICT DO NOTHING` 문법을 사용하고
            - Oracle 의 경우 `MERGE INTO` 문법을 사용하고
            - SQLite 의 경우 `INSERT OR REPLACE` 문법을 사용하고
            - …
            - 이런 문제 때문에 JPA 사용하는 경우 네이티브 쿼리 사용해야 함(JPA 에서 upsert 쿼리는 미지원). 그리고 `INSERT`, `UPDATE`, `DELETE` 를 직접 사용하기 때문에 `@Modifying` 을 꼭 붙여줘야함. (Jpa 기본 구현체 또는 네이밍 구현체의 경우 명시적으로 안 붙여줘도 됨 왜 그런지는 찾아봐야 함)
                - 나중에 `@Modifying` 의 `flushAutomatically` 와 `clearAutomatically` 에 대해서도 찾아보면 좋을 듯?
                - 표준 좀 만들어줘잉
                - https://revi1337.com/Spring/UpsertQuery
    
    MySQL 및 H2(테스트) 사용할 생각이니까 `INSERT IGNORE INTO` 또는 `ON DUPLICATE KEY UPDATE` 문법 사용하면 될 듯?
    
    - `INSERT IGNORE INTO`: H2 지원이 MySQL 호환 모드로 동작은 하는데 완전 동일한 동작을 기대하면 안 됨. 그리고 중복키만 무시하는게 아니라 더 넓은 범위를 무시할 수 있음. 멱등성을 위해 데이터 품질 까지 손상될 수 있음.
    - `ON DUPLICATE KEY UPDATE`: 자기 자신으로 대체하여 사실상 no-op 으로 처리할 수도 있기는 한데, 중복 시 UPDATE 쿼리를 타야 함.
        - 이 경우 만약 update_at 같은 컬럼 `ON UPDATE CURRENT_TIMESTAMP` 등으로 정의되어 있는 경우 사실 상 no-op 이지만 UPDATE 를 타긴 했으므로 갱신될 수 있음. 일르 막기 위해서는 해당 컬럼(update_at) 을 명시적으로 기존 값으로 대체해야 함.
        - 또한 MySQL에서는 UPDATE 를 타면서 auto_increment가 소모되어 id gap이 생길 수 있다(중복 요청이 많으면 gap이 빨리 커짐). 이 부분은 다소 문제가 될 수도? 있을 듯
        - 우리가 원하는 건 중복 시 무시라서 의미 상으로는 `INSERT IGNORE INTO` 가 더 적절하긴 한데, 중복키만 무시되는 게 아니어서 위험할 수 있음
    
    네이티브 쿼리 시 지원되지 않는 것들
    
    - JPA 1차 캐시에서 관리
        
        persist 를 통해 영속화하는 경우에는 쿼리가 날아가기 전에 1차 캐시에 등록해서 관리하므로 별도 select 없이 가능(키 전략이 IDENTITY 인 경우에만 자동 생성 키만 가져옴)
        
        네이티브 DML 의 경우 JPA 가 엔티티 상태를 추적하는 경로를 우회하므로 upsert 쿼리를 네이티브로 날리면 해당 Follow 엔티티가 자동으로 managed 상태가 되지 않음
        
        이로 인해, DB 에는 반영되었으나, 1차 캐시에는 낡은 값(stale)이 될 수 있다.
        
    - JPA Auditing (ex. `@CreatedDate` 등) 관리 안 됨
    
    네이티브 upsert 에서 JPA 가 관리해주기 바란다면
    
    - upsert 후에 한 번은 select 로 로딩해서 영속성 컨텍스트로 올려야 함, 근데 select 한 번 더 날리지 않으려고 이 방식을 선택한 측면도 있는데 이렇게 하고 싶지는 않음
    
    JPA Auditing 못 쓰니까, DB default 로 생성 시키거나, 아니면 애플리케이션에서 Instant.now() 등으로 전송해야 함
    
    여기서 중요한 점! 지금 팔로우 후에 JPA 관리가 필요한지의 여부임. 멱등성 지원 팔로우 기능의 경우 기존에 이미 존재하면 (문제가 없다는 전제 하에) 그냥 넘어가고, 없으면 insert 할 뿐이므로 추가적인 관리가 필요할 것 같지는 않다. 따라서 그냥 JpaRepository 에서 네이티브 쿼리 작성해도 무방할 듯?
    
    +) H2 DB MySQL mode 로 설정하는 게 좋음
    

## 결론

- 멱등 처리 시
    - 삭제는 크게 고려안해도 됨 그냥 해도 된다.
    - 삽입은 upsert 쿼리 쓰면 되는데 상황에 따라 고려할 부분이 좀 있긴 함. 이 부분은 위 참조

## 더 고려해볼 사항들

- 핫 스팟(유명인 한테 몰릴 때 어떻게 처리할거냐)
    - DB 커넥션 같은거 고갈날 수도 있음
- 락(latch?) 경합 발생 경위 분석 및 해결 방법
- DB 간 동작 매커니즘 차이 분석(트레이드 오프 정리)
    - PostgreSQL, MySQL, Reddis?, …
- 각 DBMS 별로 upsert 쿼리 문법 정리해보는 것도 좋을듯?
- upsert 쿼리 문제점에 대해 분석해보는 것도 좋을 것 같음
    - 예를 들면 id 고갈 문제에 대해, 나중에 고갈 되었을 때 해결 방식이 준비되어 있는가? 어떻게 해결할 수 있지?
- 락의 개념, 이론을 정리하고, 자바에서 어떻게 지원하는 지(concurrent 패키지?) 정리해보는 것도 좋을 듯
    - 사용 상에 어떤 유의 사항이 있는 지 같은 것도 정리하면 좋을 것 같다.
- `@Modifying` 의 `flushAutomatically` 와 `clearAutomatically` 에 대해서도 찾아보면 좋을 듯?