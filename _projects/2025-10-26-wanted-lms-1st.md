---
layout: page
title: 원티드 포텐업 LMS - 1개월차 회고
description: JDBC 기반의 커맨드라인 LMS 개발 여정
tag: JDBC, MySQL, DDD, Github, Git
img: /assets/img/project/2025-10-26-wanted-lms-1st/thumbnail.jpg
date: 2025-10-26
importance: 1
category: wanted
giscus_comments: true  
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-10-26-wanted-lms-1st/team_janban.png" title="team janban" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    팀 Janban
</div>

# 1. 본 글의 주제

이번 글의 주제는 원티드 포텐업 백엔드 과정 1개월차에 진행한 '콘솔 기반의 LMS 서비스 개발 프로젝트' 에 대한 회고이다.

회고를 진행하기 전에 우선 회고 그 자체에 대해서 살펴볼 생각이다.
회고를 해보는 것이 처음이어서 그런지 회고가 정확히 무엇인지, 왜 해야하는 지, 무엇을 해야 하는 지 알 수 없었기 때문이다.
위의 3가지 질문에 대해 스스로 답을 내리고 난 뒤에야, 회고를 진행할 수 있을 것 같다.

<br>

## 1.1. 회고란 무엇인가?

회고란 내가 과거에 수행했던 어떤 일에 대해서 되돌아보고 교훈을 얻는 활동을 말한다.
단순히 지나간 일을 떠올리는 회상과 달리, 회고는 반성하고 배우는 과정을 포함한다.
특히 소프트웨어 개발 등의 분야에서 특정 기간의 성과를 검토하고 개선점을 찾는 활동을
가리키는 용어로 자주 사용된다.

한 문장으로 요약하면 회고란
성과를 검토하고, 개선 방향을 모색하는 것이다.

<br>

## 1.2. 왜 회고를 해야 하는가?

개인적인 관점에서는, 내가 개발을 더 잘하기 위해서 회고를 해야한다.  
팀의 관점에서는, 프로젝트를 더 성공적으로 완수하기 위해서 회고를 해야한다.

개인적인 관점에서 내가 더 나은 개발자가 되기 위한 회고를 진행할 때는, 좋은 개발자란 어떤 개발자인가에 대한 기준이 세워져 있어야한다. 내 나름의 생각을 기준으로 삼을 수도 있겠으나, 전세계적으로 유명한 guru 들의 기준을 참고하는 편이 더 나아보인다. 체크리스트를 만들어서 프로젝트를 평가해보는 시간을 가져보겠다.

팀의 관점에서 프로젝트를 더 성공적으로 마치기 위해서 어떻게 해야 할지에 대해서는 협업을 중심으로 살펴보면 좋을 것 같다. 사실 이번에 프로젝트 마치고 난 뒤, 팀 내부적으로도 소통이 원활하지 않았다는 피드백이 많았다. 어떻게 하면 다음 프로젝트에서 더 적극적으로 소통할 수 있는 체계를 만들 수 있을지를 중심으로 살펴보면 좋을 것 같다.

<br>

## 1.3. 무엇을 해야 하는가?

위 질문에 대해 간단하게나마 답을 적어 보니 내가 무엇을 해야 하는지 어느 정도 방향성을 잡을 수 있었다.

우선은 프로젝트의 성과를 평가하는 것이다.
1. 프로젝트의 목표는 무엇이었고 이를 성공적으로 달성했는가?
2. 달성 여부를 평가하기 위한 핵심 지표는 무엇인가?

그 다음 개인적인 관점에서 프로젝트를 평가하기 위한 기준을 마련하기 위해서 좋은 개발자가 가진 특징들을 정리해본다. 내가 참고한 인물은 다음과 같다.
1. Robert C. Martin(Uncle Bob)
2. Martin Fowler
3. Kent Beck
4. Linus Torvalds
5. Steve McConnell

그 다음 위에서 선정한 기준에 입각하여 문제점 또는 개선점을 찾아야 한다.
1. 어떤 문제점 또는 개선할 점이 있었는가?
2. 어떻게 해결 또는 개선할 수 있을까?

마지막으로 협업에 대해 점검해보고 마치면 될 것 같다.

<br>

## 1.4. 좋은 개발자란 무엇인가

<br>

### 1.4.1. Robert C. Martin

그가 말하는 좋은 개발자란 다음과 같다.

1. 프로의 자세를 갖춘 개발자
   
   많은 개발자들이 일정의 압박에 못 이겨 편법을 쓰거나, 엉성한 코드를 짜곤 한다. 일정 및 환경의 압박이 있을 때에도 품질을 희생하지 않는 개발자가 좋은 개발자이다. 내가 안 하면 다른 사람이 해 줄 것이라는 안일한 생각을 버려라. 스스로 낼 수 있는 최고의 품질을 지향하며, 결함 있는 코드가 쌓이지 않도록 유의하라.

2. 자동화된 테스트, 반복 가능한 검증을 구현하는 사람

   대화형 실행 환경에서 대충 돌아가는 것만 확인하는 것과는 다르게, 테스트는 공식 문서이자 프로그램이다. 반복 가능하고 유지관리 가능한 테스트가 존재해야만 코드의 건강이 유지될 수 있다. 테스트를 단순 버그 찾는 도구가 아닌, 코드 품질을 유지하고 발전시키는 수단으로서 바라보아야 한다. 릴리즈마다 코드를 검증할 수 있는 빠르고, 확실하며 반복 가능한 증거를 제공하라.

3. 읽기 쉽고 유지보수가 용이한 코드 및 설계를 지향하는 사람

   코드의 복잡성, 기술 부채, 구조적 부적합을 인식하고 그것을 개선하려는 활동(=리팩토링)을 실천해야 한다. 지속적으로 배우고 개선하라.

4. 자주, 작게 릴리즈하여 다른 개발자의 진척을 막지 않는 사람

<br>

### 1.4.2. Martin Fowler

***작성 중...***

<hr>
<br>

# 2. 프로젝트 평가

프로젝트를 평가하기 위해서는 우선 우리의 목표가 무엇이었는지 되돌아보아야 한다. 그런데...

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/project/2025-10-26-wanted-lms-1st/404.png" title="404 not found" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    그런건 없었다
</div>

목표가 없었다는 충격적인 결과를 마주하고 말았다. 주도적으로 목표를 세우지도 않았고, 심지어
어떤 기능이 필요한지 조차 제대로 정해놓지 않았다. 목표를 평가하기 위한 주요 지표는 당연하게도 존재하지 않았다.

<br>

## 2.1 도대체 왜 그랬는가?

가장 처음에 모여서 한 활동이 뭐였는지 생각해보니 인프런이라는 강의 사이트를 참고해서 어떤 기능들이 있는지 그리고 어떤 데이터들이 필요한지 파악했었던 것 같다. 대강 아래와 같은 취지의 이야기가 나왔었던 것 같다.

- 강좌의 카테고리는 상위-하위 2단계로 구분이 된다.
- 강좌는 섹션으로 구분된 강의들을 가지고 있다.
- 강의는 동영상 또는 문서 등의 자료를 가지고 있다.
- 강좌에는 공지사항 같은 것도 있다.
- 근데 너무 크게 만들지 말아야 할 것 같다. 회원 같은건 그냥 id 랑 name 정도만 만들고 관계만 넣어놓자. 회원 가입이나 로그인 기능은 뺴자
- ...

문제는 이 이후에 우리가 정확히 무엇을 만들지 정했어야 하는데, 얼렁뚱땅 바로 DB 설계를 해버렸다는 점이다.
DB 설계가 뭔가 나왔네? 싶으니 목표도 기능도 확정되지 않았음에도 불구하고 일단 개발부터 시작한 것이다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/project/2025-10-26-wanted-lms-1st/erd.png" title="erd" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    ERD가 나왔으니 개발을 진행해야겠지?
</div>

그렇다면 우리가 왜 그랬을까? 어쩌면 "애초에 이건 서비스 할 일 없는 토이 프로젝트야" 라는 생각이 바탕에 깔려있던 것이 아닐까? 다시 말해, 학습했던 내용을 복습하는 연습 예제 정도로 여긴 것이 가장 큰 문제의 원인이라고 할 수 있을 것 같다. 물론 어느 팀원 하나 열심히 하지 않은 인원은 없었다. 모두가 열심히 개발을 했는데 정작 뭘 만들지 확실하게 정해놓지 않고 어설프게 개발을 진행했던 것이다.

<br>

## 2.2. 그러면 어떻게 프로젝트를 진행했는가?

가장 먼저 도메인을 설계하는 것 부터 시작했다. 앞서 말했듯 기능이나 비즈니스 규칙 등이 명확히 정의되지는 않았다. 그저 회의 동안 나왔던 일종의 구두 합의와 ERD를 바탕으로 도메인을 정의했다.

- 강좌 도메인
  - Course 강좌
  - Section 섹션
  - Content 강의
- 카테고리 도메인
- 강의 자료(Asset) 도메인

그리고 나서 계층 단위로 업무를 분할했다.

- A: Domain
- B: Repository
- C: Service
- D: Presentation
- E: Asset 도메인(작업 큐를 이용한 비동기 파일 처리)

나는 B 역할인 데이터 접근 계층 개발을 맡아서 수행했다. 데이터 베이스는 MySQL 을 사용했고 JDBC 로 통신했다. 커넥션 풀은 HikariCP 로 관리했다.

<br>

## 2.3. 프로젝트의 결과는 어떠했는가?

여러 우여곡절이 있었으나 그래도 발표 당일 아침에 머지를 마치고 기능 시연을 할 수 있었다.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-10-26-wanted-lms-1st/demonstration.gif" title="demonstration" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    어떻게 시연을 하긴 했다.
</div>

여러모로 아쉬움이 많이 남는다. 다음에 진행할 프로젝트에서는 목표를 확실하게 정해야겠다는 생각을 했다. 어떻게 보면 너무 당연한 부분을 놓친 것 같아 더 아쉽다.

  ***다음부터 반드시 할 것!***
  - [ ] 프로젝트 목표 설정
    - [ ] 기능 범위 설정
    - [ ] 기능 요구사항 명세
    - [ ] 주요 지표 목표치 설정(주로 성능이나 테스트 커버리지 같은 게 되지 않을까?)

그래도 완성에 의의를 두려고 한다. 이번 경험을 성장의 밑 거름으로 삼고, 같은 실수를 반복하지 않기 위해서
기록해놓을 필요가 있다. 지금부터 프로젝트를 진행하면서 느꼈던 문제점들을 정리하고자 한다. 

<hr>
<br>

# 3. 문제점 및 개선 사항

생각날 때마다 적어서 조금 두서없을 수도 있으니 양해 바란다.

<br>

## 3.1. 기술적인 관점에서의 문제점 및 개선 사항

<br>

### 3.1.1. ORM 부재 상황에서의 DDD 적용

**문제**
  - 데이터 접근 계층의 구현이 지나치게 복잡하고 크다.
  - 강좌를 생성할 것을 요청하는 `CourseRepository.create` 메서드를 예로 들어 보겠다.
  - 강좌를 하나 생성하기 위한 코드가 300줄 가까이 되는 것을 확인할 수 있다.
  - 개발 시간의 상당 부분이 CourseRepository 구현에 소모되었다.
  
{% details CourseRepository.create %}
{% highlight java %}
@Override
  public Course create(Course course) {

      // 1. 파라미터 검증
      if (course == null) {
          throw new IllegalArgumentException("course 가 null");
      }
      if (course.getId() != null) {
          throw new IllegalArgumentException("course.id 가 null");
      }

      // 2. SQL 작성
      String sql = """
              INSERT INTO course
              (title, category_id, summary, detail, user_id, created_at, updated_at)
              VALUES(?, ?, ?, ?, ?, ?, ?)
              """;

      // 3. Connection 객체 획득(Connection 객체는 여기서 닫으면 안 됨!)
      Connection conn = ConnectionHolder.get();

      // 4. JDBC 를 통해 SQL 문 실행 및 결과 처리
      try {

          // a. 처리 유형 (1): create - executeUpdate -> t/f (with ResultSet for auto inc key)
          try (PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

              // SQL 와일드 카드에 값 채우기
              pstmt.setString(1, course.getTitle());
              pstmt.setInt(2, course.getSubCategoryId());
              pstmt.setString(3, course.getSummary());
              pstmt.setString(4, course.getDetail());
              pstmt.setLong(5, course.getUserId());
              pstmt.setTimestamp(6, Timestamp.valueOf(course.getCreatedAt()));
              pstmt.setTimestamp(
                      7,
                      course.getUpdatedAt() == null ? null : Timestamp.valueOf(course.getUpdatedAt())
              );

              // SQL 실행
              int result = pstmt.executeUpdate();
              if (result == 0) {
                  throw new DatabaseException("알 수 없는 이유로 생성에 실패했습니다.", null);
              }

              // 처음에는 비어있음
              int id = -1;
              RebuildCourse rebuildCourse = null;
              List<RebuildSection> rebuildSections = new ArrayList<>();

              try (ResultSet rs = pstmt.getGeneratedKeys()) {
                  if (rs.next()) {
                      // Course.id
                      id = rs.getInt(1);
                  }
              }

              // 섹션 리스트 영속화
              rebuildSections
                      = sectionRepository.createAllSectionsOfCourse(course.sections(), id);

              // RebuildCourse
              rebuildCourse = new RebuildCourse(
                      id,
                      course.getTitle(),
                      course.getSummary(),
                      course.getDetail(),
                      course.getSubCategoryId(),
                      course.getUserId(),

                      // 이 시점에서 rebuildSections 리스트는 비어있음
                      rebuildSections,

                      course.getCreatedAt(),
                      course.getUpdatedAt()
              );

              // rebuild 및 반환
              return Course.rebuild(rebuildCourse);
          }
          // b. 예외 처리
      } catch (SQLException e) {
          dbUtils.handleSQLException(conn, e);
      } catch (IllegalArgumentException e) {
          throw new IllegalArgumentException("CourseRepository.create: rebuild 할 수 없습니다." +
                  "course 내부 상태를 다시 한 번 확인하시기 바랍니다.", e);
      }

      // x. 코드가 의도대로 올바르게 구현된 경우 여기에 도달할 수 없습니다.
      throw new RuntimeException("CategoryRepositoryImpl.create: 도달 불가능하도록 의도된 지점에 도달했습니다.");
  }
{% endhighlight %}
{% enddetails %}

{% details SectionRepository.createAllSectionsOfCourse %}
{% highlight java %}
@Override
public List<RebuildSection> createAllSectionsOfCourse(List<Section> sections, int courseId) {

    // 1. 파라미터 검증
    if (sections == null) {
        throw new IllegalArgumentException("sections 가 null 입니다.");
    }
    if (sections.isEmpty()) {
        throw new IllegalArgumentException("sections 가 empty 입니다.");
    }

    // 2. SQL 작성
    StringBuilder sqlBuilder = new StringBuilder();
    String invariant = """
            INSERT INTO section
            (name, seq, course_id)
            VALUES
            """;
    sqlBuilder
            .append(invariant)
            .append("(?, ?, ?),".repeat(sections.size()))
            .deleteCharAt(sqlBuilder.length() - 1);  // 마지막 , 제거

    // 3. Connection 객체 획득(Connection 객체는 여기서 닫으면 안 됨!)
    Connection conn = ConnectionHolder.get();

    // 4. JDBC 를 통해 SQL 문 실행 및 결과 처리
    try {

        // a. 처리 유형 (1): create - executeUpdate -> t/f (with ResultSet for auto inc key)
        try (PreparedStatement pstmt
                      = conn.prepareStatement(
                              sqlBuilder.toString(), Statement.RETURN_GENERATED_KEYS)
        ) {

            // SQL 와일드 카드에 값 채우기
            int wildcardSeq = 0;
            for (int i = 0; i < sections.size(); i++) {

                Section eachSection = sections.get(i);

                pstmt.setString(++wildcardSeq, eachSection.getName());
                pstmt.setInt(++wildcardSeq, eachSection.getSeq());
                pstmt.setInt(++wildcardSeq, courseId);
            }

            // SQL 실행
            int result = pstmt.executeUpdate();
            if (result != sections.size()) {
                throw new DatabaseException("일부 섹션 생성에 실패했습니다.", null);
            }
            
            // 모든 컨텐츠 저장
            List<Integer> generatedSectionIds = new ArrayList<>();
            Map<Integer, List<Content>> contentsToBeCreated = new HashMap<>();
            try (ResultSet rs = pstmt.getGeneratedKeys()) {

                for (int i = 0; rs.next(); i++) {
                    int id = rs.getInt(1);
                    generatedSectionIds.add(id);

                    Section eachSection = sections.get(i);
                    contentsToBeCreated.put(id, eachSection.getContents());
                }
            }
            Map<Integer, List<RebuildContent>> rebuildContentsBySectionId
                    = contentRepository.createAllContentsOfSections(contentsToBeCreated);

            // List<RebuildSection> 객체 생성 및 반환
            List<RebuildSection> rebuildSections = new ArrayList<>();
            for (int i = 0; i < sections.size(); i++) {

                int sectionId = generatedSectionIds.get(i);
                List<RebuildContent> rebuildContents = rebuildContentsBySectionId.get(sectionId);

                rebuildSections.add(new RebuildSection(
                        sectionId,
                        sections.get(i).getSeq(),
                        sections.get(i).getName(),
                        rebuildContents
                ));
            }

            return rebuildSections;
        }
        // b. 예외 처리
    } catch (SQLException e) {
        dbUtils.handleSQLException(conn, e);
    }

    // x. 코드가 의도대로 올바르게 구현된 경우 여기에 도달할 수 없습니다.
    throw new RuntimeException("CategoryRepositoryImpl.create: 도달 불가능하도록 의도된 지점에 도달했습니다.");
}
{% endhighlight %}
{% enddetails %}

{% details ContentRepository.createAllContentsOfSections %}
{% highlight java %}
@Override
public Map<Integer, List<RebuildContent>> createAllContentsOfSections(
        Map<Integer, List<Content>> contentsBySectionId) {

    // 1. 파라미터 검증
    if (contentsBySectionId == null) {
        throw new IllegalArgumentException("contentsBySectionId 가 null");
    }

    // 2. SQL 작성
    int numOfContents = 0;
    for (List<Content> contentList : contentsBySectionId.values()) {
        numOfContents += contentList.size();
    }
    StringBuilder sqlBuilder = new StringBuilder();
    String invariant = """
            INSERT INTO content
            (name, seq, section_id, body)
            VALUES
            """;
    sqlBuilder
            .append(invariant)
            .append("(?, ?, ?, ?),".repeat(numOfContents))
            .deleteCharAt(sqlBuilder.length() - 1);  // 마지막 , 제거

    // 3. Connection 객체 획득(Connection 객체는 여기서 닫으면 안 됨!)
    Connection conn = ConnectionHolder.get();

    // 4. JDBC 를 통해 SQL 문 실행 및 결과 처리
    try {

        // a. 처리 유형 (1): create - executeUpdate -> t/f (with ResultSet for auto inc key)
        try (PreparedStatement pstmt
                      = conn.prepareStatement(
                              sqlBuilder.toString(), Statement.RETURN_GENERATED_KEYS)
        ) {

            // SQL 와일드 카드에 값 채우기
            int wildcardSeq = 0;
            for (Integer sectionId : contentsBySectionId.keySet()) {
                List<Content> contents = contentsBySectionId.get(sectionId);

                if (contents == null) {
                    continue;
                }

                for (Content content : contents) {
                    pstmt.setString(++wildcardSeq, content.getName());
                    pstmt.setInt(++wildcardSeq, content.getSeq());
                    pstmt.setInt(++wildcardSeq, sectionId);
                    pstmt.setString(++wildcardSeq, content.getBody());
                }
            }

            // SQL 실행
            int result = pstmt.executeUpdate();
            if (result != numOfContents) {
                throw new DatabaseException("일부 컨텐츠 생성에 실패했습니다.", null);
            }

            // Map<Integer, List<RebuildContent>> 객체 생성 및 반환
            Map<Integer, List<RebuildContent>> rebuildContentsBySectionId
                    = new HashMap<>();
            try (ResultSet rs = pstmt.getGeneratedKeys()) {

                for (Integer sectionId : contentsBySectionId.keySet()) {
                    List<RebuildContent> rebuildContents = new ArrayList<>();
                    List<Content> contents = contentsBySectionId.get(sectionId);

                    if (contents == null) {
                        continue;
                    }

                    for (Content content : contents) {
                        rs.next();
                        rebuildContents.add(new RebuildContent(
                                rs.getLong(1),
                                content.getName(),
                                content.getSeq(),
                                content.getBody()
                        ));
                    }
                    rebuildContentsBySectionId.put(sectionId, rebuildContents);
                }
            }

            return rebuildContentsBySectionId;
        }
        // b. 예외 처리
    } catch (SQLException e) {
        dbUtils.handleSQLException(conn, e);
    }

    // x. 코드가 의도대로 올바르게 구현된 경우 여기에 도달할 수 없습니다.
    throw new RuntimeException("CategoryRepositoryImpl.create: 도달 불가능하도록 의도된 지점에 도달했습니다.");
}
{% endhighlight %}
{% enddetails %}

<br>

**원인**
  - OOP 와 RDBMS 간 데이터를 다루는 패러다임의 불일치는 비즈니스 로직과 무관한 보일러 플레이트 코드를 양산한다.
  - 쿼리 마다 다음 과정이 계속해서 반복된다.
  - Connection 획득 → SQL 문자열 생성 → PreparedStatement 생성 → 파라미터 바인딩 → 실행 → ResultSet 매핑 → 예외 처리 → 리소스 정리
  - 이에 더해 DDD 특유의 캡슐화로 인한 객체 생성의 제한은 이 복잡도를 증폭시켰다.
  - 개발 시간의 상당 부분이 비즈니스 로직과 무관한 데이터 접근 코드를 작성하는 데 소모되었다.

**기존의 개선 노력**
  - JDBC 의 Batch 기능을 이용하여 SQL 생성 부분 간소화
  - 공통된 예외 처리 로직을 분리(`dbUtils.handleSQLException`)

**기존 방식의 한계**
  - 여전히 너무 크고 복잡하다.
  - DDD는 좋은 설계 방식이지만, ORM의 도움 없이는 OOP-RDBMS 간 패러다임 불일치 문제가 극심하게 드러난다.
  - Asset, Category, Notice 와 달리, Course 엔티티는 Section 및 Content 에 대한 연쇄적인 의존 관계를 가지는 것이 특히 ResultSet 매핑 과정에서의 복잡성을 높였다.

**개선 방향**
  - JPA/Hibernate 와 같은 ORM 기술 도입
  - JDBC 기술과 DDD 를 동시에 적용하는 것은 오버 엔지니어링이 될 수 있음을 명심하자.
  - 단, 이번에 JDBC 기술과 DDD를 사용해 본 것은 경험해보기 위해서 사용한 측면도 있었다. 실제로는 아마도 같이 사용할 일이 없을 것.
  - 그럼에도 불구하고 JDBC 기술과 DDD을 함께 사용해야 한다면, Aggregate 내 엔티티 간 관계의 깊이를 제한하거나, Repository 를 도메인 별로 분리하여 생성자 접근을 쉽게 만드는 등의 작업이 필요할 것 같다.
  - 📁 domain
    - 📁 course
      - CourseRepository
      - SectionRepository
      - ContentRepositoru
    - 📁 category
      - CategoryRepository
    - ...

<br>

## 3.2. 협업의 관점에서의 문제점 및 개선 사항

<br>

### 3.2.1. 계층 기반 업무 분할의 한계

**문제**
  - 계층 단위(presentation/service/repository/domain)로 업무를 나누어 진행하였고, 계층 간 의존성에 따른 업무 상 병목이 발생했다.
  
**원인**
  - 요구사항이 명확하게 명세되지 않았고, 사실 얼추 나왔던 도메인을 인원 수에 맞게 쪼갤 수도 없었다. 이런 이유로 계층 단위로 업무를 나누기로 결정했으나 결과적으로 좋은 선택은 아니었다. 업무에 있어 직렬적인 의존관계가 발생했기 때문이다. 예를 들어, 도메인 초안 코드가 나오기 전에 repository 계층을 구현할 수가 없었고, repository 계층을 구현하기 전에 service 레이어를 구현할 수 없었다.
  
**기존 개선 노력**
  - 서비스 계층 구현 인원이 최대한 빠르게 구현을 시작할 수 있도록 repository 계층의 인터페이스를 먼저 구현하여 제공했다.
  
**기존 방식의 한계**
  - 모든 계층에서 인터페이스를 만드는 것이 바람직한 것은 아니다. 추상화 비용을 고려해야 한다.
  - 인터페이스가 변경되는 것이 바람직하지 않다는 것은 알았지만, 경험의 부족으로 실수하거나 간과한 부분들이 조금씩 보였다. 이로 인해 인터페이스 변경이 몇 번 있었고, 이 때마다 추가적인 의사소통 및 코드 조정 비용이 발생했다.
  
**개선 방향**
  - 요구 사항을 명확히 정의하는 것이 필요했을 것 같다.
  - 그리고 도메인 단위의 수직 분할을 고려하여 업무 상 병목 최소화 꾀할 수 있을 것 같다.

<br>

### 3.2.2. 인터페이스 변경 관리

**문제**
  - 분할된 업무 간 직렬적인 의존성으로 인한 문제를 최소화하고자 인터페이스를 정의했으나, 이에 따른 추가적인 의사소통 및 코드 충돌 조정으로 인한 소요가 발생했다.

**원인**
  - 소극적인 소통
  - 변경 후 구두로 전파해야 했음. braking change 를 전파하기 위한 체계 부재
  - 기존 인터페이스를 변경하는 것 자체가 문제였을 수도 있겠다.

**개선안**
  - 주기적인 스크럼을 통해 변경사항 전파
  - CHANGELOG.md 파일 등을 따로 두어, breaking change 를 열람할 수 있는 방안 마련
  - 인터페이스를 변경해야 하는 경우 기존 인터페이스를 변경하지 말고 새로운 버전의 인터페이스를 추가한 뒤, 나중에 적용하는 식으로 개발하는 방향은 어떨까?

<br>

### 3.2.3. 소통의 부재

다양한 소통의 문제들이 있었다.

**문제**
  - 각자 따로노는 느낌이었다.
  - PR 수정 후 수정 완료를 알리지 않아서, 확인이 지연되는 일이 잦았다.
  - 나 할 일이 바빠서 적극적으로 PR 리뷰를 해주지 못 했다.
  - 머지에 대한 체계가 없어서, 대충 확인한 것 같아도 머지해도 되는 지 추가적으로 한 번씩 더 확인해야 하는 문제가 있었다.
  - 의도 전달 실패로 인한 오해가 빈번했다.

**원인**
  - 주기적인 회의나 스크럼 부재
  - 중간 정리를 했어야 했는데 이것도 안 했다.
  - PR 컨벤션 부재. 특히 PR 크기가 커서 확인이 불편한 경우가 있었다.
  - 특히 머지 어떻게 언제 해야 하는지 규칙이 없어서 서로 눈치를 좀 봤다. (ex. 머지 해도 되나? 애매한데 일단 나 할거 하자...)

**개선안**
  - 간단한 일일 안내: 매일 인당 5분 이내의 진행상황 공유 시간을 가져보는 것도 좋을 것 같다. 어제 했던 일, 오늘 할 일, 알리고 싶은 주요한 문제점 등을 간단히 짚어보는 것이다.
  - PR 컨벤션을 정리해서 CONVENTION.md 등의 파일로 공유. 특히 크기 제한이나 PR 올라온 뒤 언제까지 확인해야 하는 지에 대한 시간 규칙도 있으면 좋을 것 같다. 이런 규칙이 없으면 각자 자기 할 일 바빠서 확인을 못하게 될 수도 있을 것 같다.
  - 정해진 체크 포인트마다 중간 점검 시간을 마련.