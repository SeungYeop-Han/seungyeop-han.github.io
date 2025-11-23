---
layout: page
title: 원티드 포텐업 - 두 번째 LXP 프로젝트 회고
description: Spring Boot 기반의 LXP API 서버 개발기
tag: DDD, EventStorming, Layered Architecture, JPA, Spring Boot
img: /assets/img/project/2025-11-19-wanted-lxp-2nd/thumbnail.png
date: 2025-11-19
importance: 1
category: retrospect
giscus_comments: true  
---

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/thumbnail.png" title="thumbnail" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    이벤트스토밍 중인 팀 khy. 한 분은 카메라 뒤에 있다.
</div>

<br>

# 본 문서는…

원티드 포텐업 백엔드(1기) 2개월 차에 진행한 LXP 프로젝트에 대한 회고이다.

프로젝트의 성과를 평가하고 개선 방향을 모색해 볼 것이다. 그리고 기억에 남는 활동이나 일화, 문제 상황에 대해서도 소개한다. 우리가 겪었던 시행착오가 이 글을 읽는 모든 분들의 시간을 아껴줄 수 있기를 바란다.

<br>

<div class="row justify-content-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/fail_loop.gif" title="patrik fail loop" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    fail loop patrik
</div>

<br>

## 프로젝트 기간

25.10.29 - 25.11.14 (발표 제외 약 16일)

<br>

## 프로젝트 소개

LXP 서비스의 API 서버를 개발했다.

<br>

**LXP?**

LXP 란 개인화된 맞춤형 학습 경험을 제공하는 온라인 교육 플랫폼이다.

LMS 가 정해진 틀에 따른 체계적인 학습 경험을 제공한다면, LXP 는 개별 사용자의 목표, 관심사, 또는 수준 등을 바탕으로 맞춤형 학습 경험을 제공한다.

<br>

**roadmap.sh**

우리는 [roadmap.sh](http://roadmap.sh) 라는 LXP 서비스(이하 *roadmap*)를 벤치마킹했다. *roadmap* 의 특징은 목표 달성을 위한 맞춤형 학습 경로(이하 로드맵) 만 제공한다는 점이다. 자체 콘텐츠는 제공하지 않는다. *roadmap* 의 핵심 경쟁력은 바로 이 로드맵이며, 이것이 *Inflearn* 이나 *Udemy*  과 같은 강의 서비스와의 차별점이다.

<br>

<div class="row justify-content-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/udemy.png" title="udemy.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/roadmap1.png" title="roadmap1.png" class="img-fluid rounded z-depth-1" %}
    </div>
    
</div>
<div class="caption">
    (좌) udemy 와 같은 강의 사이트의 핵심 경쟁력은 얼마나 많은 양질의 강의 콘텐츠를 확보하고 있는지에 달렸다.<br>
    (우) roadmap.sh, 개발과 관련한 다양한 로드맵을 제공하고 있다.
</div>

<br>

<div class="row justify-content-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/roadmap2.png" title="roadmap2.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/roadmap3.png" title="roadmap3.png" class="img-fluid rounded z-depth-1" %}
    </div>
    
</div>
<div class="caption">
    (좌) 백엔드 개발자가 되기 위한 학습 경로가 트리 구조로 제시되고 있다.<br>
    (우) 로드맵 트리 노드를 클릭하면 나오는 본문. roadmap 은 자체적인 강의 콘텐츠를 제공하지 않고, 외부 사이트 링크 형태로 추천 자료만 제공한다.
</div>

<br>

*roadmap* 은 오픈소스 커뮤니티 기반으로 운영되며, 다음과 같은 방식으로 다양한 로드맵을 제공한다.

- 전문가들이 직접 **큐레이팅**
- 사용자 목적에 기반한 **맞춤형 AI 추천**
- 커뮤니티를 통해 서로 **공유**

<br>

이 외에도 다양한 기능이 있으나, 프로젝트 기간이 길지 않았던 만큼 우리 팀은 로드맵 중심의 필수 기능에 집중했다. 물론 roadmap 서비스를 그대로 베낀 것은 아니다. 예를 들어 로드맵을 클론하여 커스터마이징 하는 기능은 roadmap 에 없지만, 맞춤형 학습 경험을 제공하는 데 있어 필수적이라고 판단하여 자체적으로 추가한 기능이다.

<br>

우리는 다양한 수준의 사람들이 로드맵을 통해 효과적으로 목표를 달성할 수 있도록 만들어주기 위해 다음과 같은 MVP 를 도출했다.

- 회원 관련 공통 기능(회원 가입, 인증, 인가)
- 로드맵을 카테고리로 분류
- 로드맵 검색 및 조회
- 로드맵 여행(학습) 및 진척도 추적
- 로드맵 클론 및 커스터마이징
- 별점 기반 로드맵 추천

<br>

## 프로젝트 성과

우리 팀의 목표는 필요 최소 기능(MVP)를 기한 내에 성공적으로 제공하는 것이었다. 개인적으로는 80%의 성공이었다고 생각한다. 프로젝트 결과가 꽤 만족스러웠기는 했지만, 목표 달성에 있어 두 가지 아쉬운 부분이 있었기 때문이다.

<br>

### 첫 번째 아쉬움

**모든 MVP 기능을 구현했다. 딱 하나 빼고.**

바로 로드맵 수정 기능이다. 도메인 엔티티에 비즈니스 로직 자체는 구현 했으나, 서비스 로직을 구현하지 못했다. 사실 도메인 엔티티는 내가 개발 했었는데, 개발이 지연되어 업무 병목이 되었다. 이 자리를 빌어 다른 팀원 분들께 죄송하다는 말을 전하고 싶다.

<br>

**개발이 늦어진 이유에 대한 변명**

개발 도중에 방향성이 변하면서 수정해야 할 사항들이 많이 생겼다. 사실 사용자의 로드맵 수정은 구성 요소(`Topic` 또는 `SubTopic`) 단위로 생성/수정/삭제하기 보다는, 로드맵을 편집한 뒤 한 번에 요청을 전송하는 식으로 이루어진다.

<br>

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/domain-model.png" title="domain-model.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    이해를 돕기 위한 도메인 모델. 우측의 로드맵 애그리게이트 내의 관계에 주목.
</div>

<br>

따라서 도메인 엔티티가 로드맵의 구성 요소(`Topic` & `SubTopic`)에 대한 개별적인 수정 메서드를 제공하는 방식은 바람직 하지 않다고 판단했다(ex. `Topic` 생성, 삭제 등). 왜냐하면 이 방식을 사용하면, 서비스 계층에서 모든 변경 사항을 일일히 반영해야 하기 때문이다. 그래서 기존 방식(개별 수정 메서드 제공)을 버리고 새로운 방식(객체 그래프 탐색 및 변경 사항 반영)으로 전환했는데, 이 과정에서 생각지 못 했던 난관들이 있었다. 예를 들면 다음과 같다.

- 각 엔티티가 Creation 및 Update Spec 을 통한 정적 팩토리 메서드를 통해 생성되는 상황에서, 연쇄적인 일대다 관계를 따라서 수정해야 함.
- `ResourceTopic`, `ResourceSubTopic` 엔티티는 hard delete 로 처리하되, `Topic`, `SubTopic` 의 경우 soft delete 로 처리. 이때 삭제된 요소 관계 리스트에 존재할 수도 있고, 존재하지 않을 수도 있음
- 연관 리스트(`Topic`, `ResourceTopic`, `ResourceSubTopic`)의 순서에 대한 불변식 고려
- 애그리게이트 루트인 `RoadMap` 이 `Topic` 및 `SubTopic` 과 관련한 이벤트를 감지할 수 있어야 함.
- …

등을 전부 고려하면서 로직을 작성하는 것이 어려웠다. 물론 어디까지나 변명일 뿐 나의 미숙함이 모든 문제의 원인이었다.

<br>

<div class="row justify-content-center">
    <div class="col-sm-3 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/sorry.webp" title="sorry.webp" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br>

## 두 번째 아쉬움

<br>

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/test.png" title="test.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br>

테스트는 꼼꼼하게 이루어져서 아주 좋았다. 개인적으로 우리 팀이 자랑할 만한 성과라고 생각한다. 그러나 실제 DB 에 데이터를 넣어두고 테스트를 진행하지 못 한 부분은 아쉽다는 의견이 있었다. 이번에는 mock 객체로만 테스트 했었는데, 다음에는 DataFaker 등의 라이브러리를 활용하여 일정 규모 이상의 실질적인 데이터로 테스트 해보는 것이 좋겠다. 

AI 를 통한 테스트 자동화에 대해서도 조사해서 다음 프로젝트에 적용해 볼 생각이다.

<br>

### **ps.**

프로젝트 목표 설정에 대한 개인적인 아쉬움이 있다. 프로젝트 목표가 정성적으로 설정되어, 평가 역시 위 처럼 모호할 수 밖에 없었다. 다음 프로젝트부터는 목표 달성 여부를 평가하기 위한 정량적인 지표를 설정해볼 생각이다.

OKR 기법 등을 활용하여 프로젝트의 성과를 평가하기 위한 목표 지표를 설정하고, 개인적인 성과에 대한 KPI 도 설정해서 정량적으로 평가해보고 싶다.

<br>

## 지금부터…

본격적으로 기억에 남는 활동, 일화, 사건에 대해 회고해볼까 한다.

회고는 기억에 남는 주요 활동을 (대체로) 시간 순서대로 살펴보면서 어떤 교훈을 얻었는 지 서술한다. 짜임새 있고, 완결성 있게 구성해보고 싶었으나 능력의 부족만 느꼈다. 미리 양해의 말씀을 드린다.

---

<br>

# 기억에 남는 활동들

<br>

## 회고 취합

프로젝트 시작 후 가장 먼저 수행한 활동이다.

<br>

**배경**

각 팀원들이 서로 다른 팀에서 프로젝트를 진행하다 모인 상황이었고, 이번에 내가 팀장을 맡아서 프로젝트에 대한 전반적인 관리를 해야 했다.

<br>

**활동 내용**

프로젝트 시작에 앞서 저번 달에 진행했던 프로젝트에 대한 각자의 회고를 취합해보는 시간을 가졌다. 각자 아쉬웠던 점, 이에 대한 개선점, 그리고 새로 시도해보고 싶은 점에 대해 공유하고 정리해두었다.

<br>

**목적**

이를 통해 시행착오를 줄이고 이번 프로젝트의 대략적인 액션 플랜을 도출하는 것이 목적이었다.

<br>

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/not-this-time.webp" title="not-this-time.webp" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    이번엔 다르다!
</div>

<br>

**좋았던 점**

프로젝트 초반에 뭐 할 지 정하는 게 참 난관이었는데, 회고 취합에서 나왔던 내용들이 정말 큰 도움이 되었다. 다음에 팀 프로젝트를 진행할 때도 꼭 진행해보고 싶은 활동이다.

---

<br>

## 일정 계획

**배경**

회고 취합하면서 공통적으로 제시된 문제가 있었다. 저번 프로젝트 때 시간에 쫒겨서 제대로 테스트도 못하고 벼락치기를 하게 되었다는 것이었다.

<br>

**의도**

프로젝트 일정을 체계적으로 관리하여 같은 실수를 반복하지 않는 것이 목적이었다.

<br>

**활동 내용**

노션 Gantt 차트 템플릿을 통해 WBS 일정 계획을 세웠다.

<br>

<div class="row justify-content-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/gantt.png" title="gantt.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Thank you, @mrpugo!
</div>

<br>

**좋았던 점**

무엇을 어떤 순서로 진행해야 할 지 전반적인 계획을 세우니, 우리가 개발할 수 있는 시간 등을 파악하는 데 도움이 되었다. 계획을 세워보고 나서야 생각보다 개발 시간이 짧다는 것을 알게 되어 놀랐다. 막연하게 충분하다는 느낌과는 다르게 실제 구현할 수 있는 시간이 대략 4 일 정도 밖에 없었다. 도메인 분석, 요구사항 분석 및 설계, 테스트 및 발표 준비에 생각보다 많은 시간이 필요했다. 만약 사전에 계획을 세우지 않았다면 이번에도 같은 문제를 반복했을 것이다.

물론 계획했던 대로 완벽하게 진행될 것이라 기대하지도 않았고, 실제로도 그랬다. 그러나 프로젝트에 대한 전체적인 틀을 잡았던 것이, 남은 업무와 예상 소요 시간을 정리하는 데 큰 도움이 되었다.

<br>

**아쉬운 점 및 개선안**

다만 일정 계획 표가 팀원 분들에게 큰 도움이 되지는 못했던 것 같아서 개인적으로 아쉬웠다. 어떤 아쉬움이 있었고, 개선안은 무엇일 지 정리했다.

<br>

**#1**

노션 Gantt 차트 사용이 다소 불편했다, 템플릿 제공자를 탓하려는 것이 아니라(Thank you, @mrpugo!) 노션이라는 도구 자체가 가진 한계를 느꼈다. 사소하다면 사소하지만, 은근 신경쓰이기도 하는 부분이다. 예를 들어, 마우스 사용 시 좌우 스크롤이 불편하다거나, 요소가 실수로 이동 또는 삭제되곤 한다는 점 등이다.

- 노션은 좋은 도구이지만 WBS 도구로써는 썩 훌륭하지는 않은 것 같다. 다음에는 Jira 또는 Asana 같은 팀 일정 관리 도구 사용을 고려해보자.

<br>

**#2**

진척도는 백분율로 관리했었는데 구체적인 측정 기준이 없어서 느낌대로 진행했다.

- 다음부터는 그냥 `시작 전`, `진행 중`, `완료` 등의 진행 상태로만 관리해도 될 것 같다.

<br>

**#3**

각 팀원이 어떤 작업을 어떻게 작업하고 있는 지 추적 및 공유가 잘 안 됐다.

- 각 인원에게 할당된 업무를 노션 팀 페이지 상단에 노출해서 즉시 접근 가능하게 만드는 것도 괜찮을 것 같다.
- 이 경우 팀원 분들에게 적극적인 활용을 부탁하는 것도 중요하다. 요는 각 팀원에게 직접 가서 묻지 않더라도 현재 하고 있는 일과 진척 상황이 어떤 지를 알 수 있어야 한다는 것이다.

<br>

**#4**

이 외에도 아쉬웠던 점이 있다. 일단 수행 기간을 할당하는 것이 어려웠다. 작업이 어느 정도 걸릴 지 예측하는 것이 어려웠기 때문이다. 일정 변경점을 WBS 상에 계속해서 반영하는것도 번거로웠다. 특히 프로젝트 막바지에 다를 수록 개발에 급급해져서 일정 관리에 소홀했던 날이 많았던 점이 아쉽다. 이 부분은 내가 더 노력했어야 하는 부분인데 그러지 못했다. 반성한다.

---

<br>

## 소통 방식 논의

**배경**

저번 프로젝트 때 소통이 원활하지 않았다는 의견이 많이 제기되었다.

<br>

**목적**

더 빠르고 responsive 하게 의사소통 하는 것과, 서로의 업무 진행 현황을 공유하는 것이 목적이었다.

<br>

**활동 내용 1: 슬랙 활용**

우선 소통 매체는 슬랙을 사용하기로 결정했다. 포텐업 과정에서 슬랙을 활용하고 있어서 모든 팀원이 슬랙 사용에 익숙했기 때문이다. 그리고 더 나아가서 슬랙에서 효과적으로 소통하기 위한 방안에 대해서도 논의했다.

<br>

**좋았던 점**

- 반응 아이콘 활용
    
    이 방법을 사용하니 채팅 방이 길어지지도 않고, 누가 무엇을 하고 있는 지 바로 확인할 수 있어서 좋았다. (ex. 👀: 확인 중, ✅: 확인 완료, 🙌: 작업 완료)

<div class="row justify-content-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/slack-icon.png" title="slack-icon.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br>

- 주제 별 스레드 적극 활용
    
    특정 주제에 대해 이야기를 나눌 때 스레드를 만들어서 소통하는 방식으로 진행했다. 이를 통해 채널이 비대해지는 것을 방지할 수 있었다. 대화에 뒤늦게 참여하거나 나중에 어떤 이야기가 오갔는 지 확인할 때 대화의 흐름을 빠르게 이해할 수 있어서 좋았다.

<div class="row justify-content-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/slack-thread.png" title="slack-thread.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br>

**활동 내용 2: 데일리 스크럼**

다른 팀원 분들의 현황이 공유되지 않아서 답답했다는 의견이 있어서 데일리 스크럼을 활용하여 보완하기로 결정했다. 프로젝트 기간 동안 매일(평일) 15분 이내로 어제 한 일, 오늘 할 일, 그리고 장애 요소를 간단하게 정리해서 공유했다.

<br>

<div class="row justify-content-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/scrum-calendar.png" title="scrum-calendar.png" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/daily-scrum.png" title="daily-scrum.png" class="img-fluid rounded z-depth-1" %}
    </div>
    
</div>
<div class="caption">
    매일 스크럼 진행하는 게 부담이 된다는 의견이 있어서 최대한 간소하게 하자고 합의했다.
</div>

<br>

**아쉬운 점**

마지막 주에 바빠지면서 데일리 스크럼을 며칠 빠뜨린 부분이 좀 아쉽긴 하다. 처음 생각했던 것 보다 부담되는 활동이라는 점을 알았다. 팀원 수가 많아진다면 스크럼은 신중하게 도입하는 편이 좋겠다.

---

<br>

## 팀 스터디

**배경**

각 팀원 간 기술에 대한 이해도 차이가 있는 상황이었다.

<br>

**목적**

개발에 필요한 기술을 학습해서 각자 성장의 발판으로 삼는 한 편, 서로 대화를 나누거나 코드 리뷰를 할 때 시간을 줄여보는 게 목적이었다.

<br>

**활동 내용**

이번 프로젝트 설계 시 DDD 반영해보자는 의견에 따라 DDD 에 대한 스터디를 진행했다. 각자 공부해 온 뒤 10분 정도 발표하는 식으로 진행했다.

<br>

**좋았던 점**

DDD 에 대한 각자의 생각과, 중요하게 생각하는 부분이 어디인지 알 수 있어서 좋았다.

<br>

**아쉬운 점**

DDD 라는 주제 자체가 어렵고 방대하기도 했고, 진행 방식이나 소요 시간의 측면에서도 스터디가 부담스럽게 느껴졌었다. 이것이 팀 스터디를 초반에 한 번만 하고, 더 이상 하지 않았던 가장 큰 원인이 아니었나 하는 생각이 든다.

<br>

**개선안**

다음에는 조금 더 가볍게 진행하는 게 좋을 것 같다. 예를 들어, 20분 내외로 부담없이 읽을 수 있는 레퍼런스를 공유하고 느낀 점을 공유하는 방식은 어떨까? 잘 해야 한다는 부담을 팀원들에게 주지 않는 것이 중요할 것 같다. 대충 해도 되니 가볍게 소감 정도만 정리하는 식으로 진행한다면, 팀 전체에 더 큰 도움이 되었을 것 같다. 처음 보는 내용과, 그래도 어디서 한 번 들어봤던 내용을 받아들이는 것은 천지차이지 않은가?

---

<br>

## 컨벤션 합의

**배경**

각종 컨벤션 관련해서도 처음 회고 취합 때 많이 나왔던 내용이었다.

<br>

**목적**

- 형식을 통일하여 혼동을 줄이는 것
- 다른 사람의 작업물을 빠르게 이해하고, 효율적으로 유지 관리하는 것

<br>

**활동 내용**

각종 컨벤션에 대해 합의 후 문서화했다.

{% details 자바 코드 컨벤션 %}
- [구글 자바 코드 스타일](https://google.github.io/styleguide/javaguide.html) 준수
<br>
{% enddetails %}

{% details 커밋 메시지 컨벤션 %}
- [Conventional Commit](https://www.conventionalcommits.org/ko/v1.0.0/) 준수
- 커밋 주제 줄의 type 의 경우 [Angular 컨벤션](https://www.conventionalcommits.org/ko/v1.0.0/)을 준수
<br>
{% enddetails %}

{% details 브랜칭 컨벤션 %}
- 승격 흐름 제한(개인 작업 브랜치 → `develop` → `main`)
- 브랜치 네이밍(`{이름}/{type}/{스코프}/{짧은설명}`)
- 머지 된 브랜치 즉시 제거
<br>
{% enddetails %}

{% details PR & 코드 리뷰 컨벤션 %}
- PR 제목은 Conventional Commit 준수!
    - Squash 시 최종 커밋이 제목이 되기 때문
- Merge Commit 비활성화 ← “Create a merge commit” 가 매번 생기면 지저분해짐
- PR 템플릿 사용
- 개인 작업 브랜치 → `develop`
    - 반드시 push 전 `develop` 브랜치 rebase
    - “Squash and Merge” ← develop 히스토리를 PR 당 1 커밋으로 단순화하기 위함
    - 작게, 자주 PR
- `develop` → `main`
    - “Rebase and Merge” ← 커밋 단위를 보존하고, 선형 히스토리를 확보하기 위함(배포 후보 변경 추적성 확보)
- `develop` & `main` 브랜치 보호!
    - 병합 전 2인 이상 승인 필수
    - 업데이트 된 브랜치만 머지 허용
<br>
{% enddetails %}

<br>

**아쉬운 점 및 개선안**

**#1**

단순히 자바 자체에 대한 컨벤션 뿐만 아니라, 프레임워크 활용 측면에서도 컨벤션을 정해 놨으면 좋았을 것 같다. (ex, JPA 엔티티 클래스의 속성에 `@Column` 애노테이션의 `name` 을 항상 명시할 지, 아니면 아예 명시하지 않을 지 결정, …)

<br>

**#2**

DB 네이밍 컨벤션이나, API 컨벤션에 대해서도 가볍게 한 번 정리했으면 좋았을 것 같다.

<br>

**#3**

브랜치 이동하거나 할 때 전체 영문 이름을 적는 것이 불편해서 이니셜로만 적었다. 그런데 나중에 새로운 팀원이 들어오거나 해서, 영문 초성이 중복되는 경우 특정 브랜치를 누가 작업하고 있는지 헷갈릴 수 있다.

이를 해결하기 위해 다음부터는 “이름” 이 아니라 “개인 브랜치 코드”를 만들어서 공유하는 게 좋을 것 같다. 예를 들어 2~4 자 정도의 고유한 소문자 코드를 만들어서 컨벤션 문서 등으로 공유하는 것이다.

+) 조사하면서 알게 된 건데, 쉘 alias + 자동완성 기능을 사용하면 생산성을 개선할 수 있을 것 같다. 예를 들어 쉘에서 `gsw hsy` 입력 후 탭 키를 누르면 `git switch hsy/...`  처럼 자동 완성 되도록 만들 수 있다. 다음에는 이 방식 사용해봐야겠다.

---

<br>

## 이벤트스토밍

**배경**

DDD 스터디를 진행하면서 이벤트스토밍이라는 기법이 있다는 사실을 알게 되었다. 괜찮은 방법 같아서 한 번 시도해보기로 했다.

<br>

**활동 내용**

이벤트스토밍 진행 방법에 대해서 조사해온 뒤 가이드를 작성했다. 그리고 2시부터 6시까지 4시간 가량 1층 라운지에서 이벤트스토밍을 진행했다.

<br>

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/eventstorming.png" title="eventstorming.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    이벤트스토밍 중인 팀 khy. 이번에는 내가 카메라 뒤에 있다.
</div>

<br>

**좋았던 점**

동음이의어나 동의이음어 등이 드러나고, 이를 맞춰나가는 과정에서 서로의 생각이 통일된다는 느낌을 받았다. 같은 개념을 서로 다른 용어로 표현하는 경우가 생각보다 많았고, 서로 같은 용어로 다른 대상을 가리키는 경우도 있었다. 이 경험이 나중에 용어 사전을 만드는데 큰 도움이 되었다.

<br>

**아쉬웠던 점**

**준비 미흡**

- 포스트잇이 작아서 불편했다. 다이소나 모닝글로리 같은 오프라인 문구점에서 원하는 색상과 크기를 가진 포스트잇을 찾는 것이 생각보다 쉽지 않다. 미리 미리 온라인에서 구매하자.
- 포스트잇 구매시 (가능하다면) 접착력이 좋은 것을 구매하는 편이 좋다. 자꾸 떨어져서 번거롭게 마스킹 테이프를 사용해서 고정해야 했다.

<br>

**이벤트스토밍 이해도 부족**

- 각 범주(ex. 도메인 이벤트, 커맨드, 정책 등)의 의미가 뭔지 정확히 이해를 못 한 상태에서 진행되었다(사실 지금도 잘 모르겠다). 그래서 각 단계를 체계적으로 진행하지 못했다.
- 들이는 시간 대비 효과가 크지 않다는 느낌을 받았다. LXP 도메인에 대해 더 잘 알고 있어야 했다. 유저 스토리 기법 등을 통해서 제공할 핵심 가치와 기능 목록을 어느 정도 논의한 뒤에 진행했다면 어땠을까?
- 이벤트스토밍의 본래 의도와는 다르게, 갈수록 기술적인 설계 측면으로 흘러가서 많이 아쉬웠다. 내가 어느 정도 방향성을 잡았어야 했는데 그러지 못 했다.

<br>

**다음에도 할 것인가?**

선뜻 그렇다고 답하기 어렵다. 그 이유는 다음과 같다.

첫 번째로, 높은 러닝 커브를 가지고 있다는 점이다. 이벤트스토밍에 대해 깊이 이해하고 있는 사람이 퍼실리테이터 역할을 수행해야 한다. 우리 팀에서 진행할 때는 이벤트스토밍 시 퍼실리테이터 역할을 맡을 사람이 마땅치 않아서 퍼실리테이터 역할을 진행 규칙으로 대체했었다.

- 진행 시간 제한
- 단계 별 사용해야 할 포스트잇
- 단계 별로 행동 규칙 설정
    - ex. 이 단계에서는 대화 금지, 이 단계에서 드라이버가 아닌 경우 포스트잇에 손대지 말기, …

특히 도메인 전문가가 없다면 효과가 떨어질 수 밖에 없다. 기준이 되어 줄 사람이 없어서 결정해야 할 사항이 나올 때마다, 매번 토의를 해야 해서 시간이 지연될 수 밖에 없다.

결론적으로, 이 방식에 숙련도가 있지 않으면 효과를 얻기 힘든 반면, 시간을 너무 많이 잡아먹는다. 물론 좋은 워크숍이긴 하지만, 도메인에 대해 그리고 이벤트스토밍 기법에 대해 깊이 이해하고 있는 사람이 최소 한 명 씩은 있어야 한다.

<br>

**그럼에도 불구하고 다음에 이벤트스토밍을 해야 한다면?**

- 팀원들이 모두 도메인에 대한 어느 정도의 이해를 가지고 있어야 한다. 도메인 분석을 각자 한 뒤 공유하는 스터디 세션을 사전에 수행해야 한다.
- 이벤트스토밍을 잘 알고 있는 사람이 필요하다. 프로젝트가 끝난 뒤의 일이긴 하지만, 현재(11월 중순) 기준 이벤트스토밍에 대한 수업 및 실습을 진행하고 있으니 열심히 참여해서 이해도를 끌어올리자.
- 유저 스토리 기법 등으로 MVP 를 어느 정도 뽑고 나서 대강의 윤곽이 잡혀있었다면 더 좋았을 것 같다. 그러니까 처음 기획에 들어갈 때 이벤트스토밍을 진행하는 것이 아니라, 기획이 어느정도 나온 상태에서 생각을 통일 할 필요를 느낄 때 진행하는 것이다.
- 이벤트스토밍 진행 시 컨셉을 확실하게 잡고 가야 한다. 예를 들어, 도메인 관점에서 도메인 이벤트 도출하고 용어 통일하는 게 목표인지, 아니면 바운디드 컨텍스트 나누는게 목적인 지 등을 명확히 해야 한다. 그리고 퍼실리테이터를 한 명 두고 원래 목적에서 벗어날 때 마다 교정할 수 있어야 한다.

---

<br>

## MVP 기능 도출 및 용어 사전 정의

**상황**

시간이 넉넉하지 않았기 때문에 숙달이 필요한 방법론(ex. 유저 스토리 매핑)을 적용하는 것이 힘든 상황이었다.

<br>

**목적**

주 목적은 기술적인 부분은 최대한 배제하고 사용자 관점에서 가장 핵심적인 기능만 도출하는 것이었다.

<br>

**활동 내용**

이벤트스토밍 세션 이후에 JTBD 기법으로 핵심 가치와 기능을 도출하고, 용어 사전을 만들었다. 시간이 넉넉하지 않았으므로 즉시 적용해 볼 수 있는 간단한 방식을 ChatGPT 로 만들어 진행했다.

<br>

사용자 페르소나를 정의한 뒤 JTBD 한 줄 형식을 만들어서 논의를 통해 기능을 도출했다.
{% details 페르소나 %}
- 내가 공부해야 하는 걸 대략적으로만 알고 있어서 어떤 로드맵을 선택해야 할지도 모르는 사람
- 내가 공부할 걸 대략 알고 있고 로드맵을 선택할 수 있는 사람
- 전문가로서 로드맵을 작성하고 제공해 주는 사람
- 협업 경력자로서 이미 있는 로드맵의 일부를 변경하고 싶은 사람
- 지식 공유자는 로드맵과 컨텐츠를 제공하고 라이센스 별로 구독료의 일부를 정산 받는다.
<br>
{% enddetails %}

{% details JTBD 형식 %}
- **언제** [상황], **나는** [사용자], **하고 싶다** [목표], **이를 통해** [이득]
- ex. “출퇴근 중 짧게 학습해야 할 때, 나는 초보 개발자라서, 10분 내에 핵심 개념을 습득하고 싶다, 이를 통해 실무에서 바로 써먹을 수 있는 실용적인 지식을 얻을 수 있다.”
<br>
{% enddetails %}

<br>

용어 사전은 아래와 같은 표 형식으로 정의했다.

| 국문 | 영문 | 설명 |
| --- | --- | --- |
| 계획자 | planner | 로드맵 생성자이자 소유자 |
| 여행자 | traveler | 로드맵 사용자 |
| 로드맵 복제 | roadmap clone | 특정 로드맵을 가져와서 새로운 나의 로드맵을 만드는 기능 |
| … | … | … |

<br>

**느낀 점**

이벤트스토밍, 기능 도출, 및 용어 사전 정리 등의 과정이 **상호 보완적**이라는 점을 알게되었다. 각 과정을 일정한 순서에 맞춰 수행할 것이 아니라, 약간 뭐랄까 incremental 한 방식으로 처음에는 간단하게 한 사이클 돌린 뒤에, 해당 사이클을 한 번 더 돌리는 방식으로 진행했다면 더 좋았을 것 같다. 다음에 해봐야지.

<br>

**개선점**

당시 개인 사정으로 팀원 중 한 분이 안 계셔서 해당 인원을 빼고 진행했었다. 나중에 해당 인원에게 진행 상황 공유하는 데 시간에 꽤 소요됐었다. 처음에는 메신저를 통해서 전파하려고 시도했는데, 소통이 원활하지 않아서 별도의 회의를 한 번 더 진행해야 했다.

물론 회의에 모든 인원이 매번 참석해야 하는 것은 아니다. 그러나 이번 회의는 핵심 요구사항을 도출하고 유비쿼터스 언어를 정하는 아주 중요한 회의였으므로 빠지는 인원 없이 모든 인원이 참여해야 했다. 사전에 일정 조율을 했다면 좋았을 것 같다.

---

<br>

## 업무 분할

**배경**

이전 프로젝트에서 업무를 계층 단위로 수평 분할했었는데, 업무 간 의존 관계로 인한 업무 병목이 심했다.

<br>

**목적**

업무 병목을 최소화하여 팀 전체의 생산성을 높이는 것

<br>

**활동 내용**

업무를 도메인 단위로 수직 분할해서 업무 간 의존 관계를 최소화했다. 물론 이렇게 하더라도 업무 간 의존 관계를 완전히 없앨 수 있는 것은 아니다. 그러나 이 부분 역시 도메인 간 의존 관계를 고려하여 필요한 최소 인터페이스를 우선 구현 하는 것을 통해 해소하려고 노력했다.

<br>

**한계**

특정 도메인이 커서 여러 명이 함께 작업해야 하는 경우, 여전히 도메인 내에서 계층 별로 수평 분할 해야 한다. 실제로 로드맵 도메인은 다른 도메인에 비해 크기가 컸기 때문에 나와 다른 팀원 한 분이 함께 개발을 진행했었다.

<br>

**극복 방안**

내가 `RoadMap` 엔티티 개발을 담당했기 때문에 내가 작업을 마쳐야 다른 팀원 분이 작업을 시작할 수 있었다. 같이 하던 분이 필요로 하는 부분만 빨리 빨리 제공하려고 노력했다. 최선을 다했음에도 불구하고 나의 개발이 조금씩 늦어질 때마다 팀원 분을 기다리게 만들어야 했다. 그래도 적극적인 의사소통 덕분에 문제를 최소화할 수 있었다고 생각한다.

---

<br>

## Github 룰 셋 정의

**목적**

컨벤션이 깨지는 일을 막고, 중요한 브랜치를 안전하게 지키기 위해서 Github 에 룰 셋을 적용했다.

<br>

<div class="row justify-content-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/ruleset.png" title="ruleset.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br>

**활동 내용**

Github 룰 셋을 정의하여 2인 이상 승인 후에만 병합 가능하도록 제한했다.

<br>

**발생한 문제**

룰 셋 정의가 처음이라서 어떻게 하는 지 자료 조사가 필요하기도 했고, 일단은 팀원 분들이 컨벤션을 잘 지키시는 것 같아서 뒤로 미뤘었다. 그러다가 결국 `develop` 브랜치에 바로 push 되버리는 문제가 발생했다. 문제 발생 직후 발견해서, 로컬에서 커밋 삭제 후 force push 해서 해결할 수 있었다. 빨리 발견해서 망정이지, 해당 시점 이후 작업이 이루어지고 나서 뒤늦게 발견되었으면 골치 아팠을 것이다. 다음부터는 가능한 빠른 시점에 룰 셋을 정의해야겠다.

<br>

**아쉬운 점**

`develop`, `main` 브랜치에 바로 push 못하도록 방지하거나, 병합 흐름을 제한하는 등의 제약도 설정해 줄 수 있었는데, 이 부분을 룰 셋으로 제한하지 못했다.

**As-is**

- `main` 브랜치에 대한 룰 셋 적용 누락
- 룰 셋에서 `Restrict updates` 누락 → `develop` & `main` 에 대한 직접 push 를 막지 못 함.
- 브랜치 병합 흐름 제한 없음

**To-be**

- `main` 브랜치에 대해서도 룰 셋 적용
- `Restrict updates` 설정
- `Require status checks to pass` 체크 후 `Require branches to be up to date before merging` 체크하면 기준 브랜치가 항상 최신 상태여야 함이 보장됨.
    - → 기준 브랜치와 충돌이 있다는 것은 곧 최신 상태가 아니라는 사실을 내포함으로, 이 조건만으로 항상 최신 브랜치 상태이며 충돌이 없음을 보장할 수 있음
- Github Actions 기능 활용하여 병합 흐름 제한하기
    - base 가 `main` 이면, head 가 `develop` 이어야만 허용
    - base 가 `develop` 이면, head 가 `main` 이 아닌 경우에만 허용

---

<br>

## Spotless 를 로컬 Gradle 및 Github Action CI 에 적용

**활동 내용**

Spotless 를 로컬 Gradle 및 Github Action CI 에 적용했다.

<br>

**목적**

일관된 코드 스타일을 보장하기 위해 사용했다.

<br>

**아쉬운 점 1**

<br>

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/spotless1.png" title="spotless1.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br>

구글 자바 컨벤션이 적용된 Spotless 를 적용했는데, 들여쓰기가 과도하게 되거나 스타일이 이상한(이건 모든 팀원 분들이 인정한 부분이다) 경우가 많았다. Spotless 형식을 커스터마이징 할 수 있다고 하니까 개선할 수는 있겠지만 어느 정도 까지 개선할 수 있는 지는 미지수이다. 추가적인 조사가 필요하다.

<br>

**개선 방안**

개인적으로는 모든 팀원들이 인텔리제이 사용하고 있으니까 인텔리제이에 코드 스타일 xml 파일 적용해놓고, PR 시 보완하면 되지 않을까 하는 생각도 들었다. 그래도 Spotless 를 만족할 만한 수준으로 커스터마이징 할 수 있다면, 시간을 충분히 내 볼 수 있을 것 같다.

<br>

**아쉬운 점 2**

<br>

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/spotless2.png" title="spotless2.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br>

로컬에서 Spotless 를 적용하지 않은 상태에서 PR 을 생성하는 경우 Github CI 기능을 통해 자동으로 Spotless 을 적용 후 커밋해 주지만 불편한 점이 있다.

1. CI 가 반영될 때 까지 몇 분간 대기해야 함.
2. PR 리뷰에 따른 수정이 필요한 경우, CI 를 통해 Spotless 커밋이 반영된 후 로컬에 pull 한 뒤에 해당 커밋(Github bot) 에 수동으로 HEAD 를 옮겨야 함. Spotless 커밋이 붙어서 로그가 지저분해지는 것은 덤.

<br>

**개선 방안**

Spotless 를 사용한다면 CI 를 통해 적용하지 말고 git hook 기능을 사용하는 게 더 좋을 것 같다. **pre-push hook 또는 pre-commit hook** 등을 등록해서 Spotless 적용(또는 테스트 등)이 성공해야 push 또는 commit 되도록 제한할 수 있다.

이 방식은 팀원들의 로컬 환경에 git 설정 파일이 존재해야만 작동하므로 확실한 방법은 아니라는 단점이 있지만, 이 부분은 각 팀원이 처음 프로젝트 환경 설정할 때 한 번만 넣어주면 되므로 큰 문제는 아니라고 생각한다.

---

<br>

## PR 하면서 느낀 점

주말에 혼자 코드 리뷰하다 느낀 점이 있어서 적었던 내용이다. 요약하면 **코드 리뷰 할 때 문제 발견이 아닌 의도 파악에 초점을 두어야 한다**는 내용이다. 코드 리뷰의 중요성에 대해 체감했다.

<br>

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/pr.png" title="pr.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br>

**아쉬운 점**

코드 리뷰가 중요하다는 점을 알게 된 건 좋은데, 막상 평일에 수업도 듣고 개발도 해야 하는 상황에서 시간 내는 게 어려웠다.

코드 리뷰가 좋지만 부담스러운 것도 사실이다. 어떤 부분이 부담스러웠고, 어떻게 개선할 수 있을 지 고민해보았다.

<br>

**#1**

**PR 크기가 커서 확인이 어려웠다.**

이 부분은 회고 취합 때도 이야기 했었던 부분이고 나름 신경도 썼었는데, 하다 보니 커지게 돼서 PR 이 힘들어 지는 일들이 생겼다. 파일 수나 라인 수 제한에 대해 이야기 나눠봐야겠다.

<br>

**#2**

**의도 파악을 위해 코드를 들여다 봐야 했다.**

PR 본문 보면서 느낀 점은, 어떤 것을 개발 했는 지는 알겠는데, 왜 이걸 만들었고, 왜 이렇게 짰는 지에 대한 설명이 없었다는 점이다(사실 이 부분은 내가 제일 못 했다).

<br>

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/pr2.png" title="pr2.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    내가 작성했던 PR. 배경이나 결정 이유/의도 등을 하나도 알 수 없다. 반면교사로 삼아주시기 바란다.
</div>

<br>

**개선 방안**

코드가 아닌 PR 본문만 보더라도 내 의도를 알 수 있도록 작성해야 한다. 한 개인의 입장에서는 시간을 더 쓰게 되므로 손해처럼 느껴질 수 있지만, 내 시간을 더 써서 팀원들의 시간을 아껴줄 수 있으므로 팀 전체의 입장에서는 이득이다(특히 팀원 수가 많아질 수록 그렇다). 위 PR 을 뒤늦게나마 다시 작성해보았다.

<br>

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/pr3.png" title="pr3.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    위 PR 을 뒤늦게나마 다시 작성해보았다. 
</div>

<br>

물론 시간은 한정된 자원이고, 모든 PR 을 심혈을 기울여서 작성하는 건 현실적이지 않다. 그러니, 선택과 집중을 하되 매번 단 한 줄이라도 의도를 적어 두어야 한다는 것이다. 이 밖에도 Codex 와 같은 AI 도구를 사용하는 것도 괜찮을 것 같다.

---

<br>

## Github Discussion 활용

이번에는 깃허브 디스커션 탭을 적극적으로 활용해보았다. 모든 팀원들이 적극적으로 참여해주어서 좋은 기억으로 남아있어서 잠깐 공유해 본다.

<br>

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/discussion.png" title="discussion.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br>

**ADR**

소프트웨어 아키텍처부터 단순 타입 결정에 이르기까지, 기술적 대안 사이의 트레이드 오프에 대해 논의하고 결정하기 위해 만들었다.

<br>

**생각 공유**

서로의 생각을 자유롭게 나누고 인사이트를 공유할 목적으로 만들었다.

<br>

---

## 전문성에 대한 고찰

개발자로서의 전문성을 기르기 위한 방안에 대해 고민했던 내용을 공유해보고 싶어서 적었다.

<br>

<div class="row justify-content-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid loading="lazy" path="/assets/img/project/2025-11-19-wanted-lxp-2nd/expert.webp" title="expert.webp" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br>

우리가 병원을 가는 경우에 대해 생각해보자. 열이 나고, 몸이 으슬으슬 춥고 열도 나는 것 같다. 감기 몸살인 듯 하여 동네 병원에 가면 아니나 다를까 감기 몸살이 맞다. 이번에는 배탈이 났다. 이에 더해 몸살 기운도 있어서 장염이구나 싶어 동네 병원에 가면 이번에도 역시나 장염이 맞다. 개인적인 경험이기는 하지만, 다른 분들도 비슷한 경험 들을 많이 하셨을 것이다. 큰 병에 걸리지 않는 이상, 내가 내린 진단이 맞는 경우가 많다.

여기서 던져볼 질문이 있다. 그렇다면 과연 내가 의사인가? 이에 대한 답은 명확하다. “당연히 아니다.” 왜냐하면, 내가 단순한 느낌 만으로 내린 결론과, 의사가 10 여 년의 수련과, 그 이상의 진료 및 연구 경험을 바탕으로 진단해서 내린 종합적인 판단이 같을 수가 없기 때문이다.

<br>

위 내용을 개발 분야로 끌고 오면 이렇다. 맹목적으로 *best practice* 를 따르는 것과, 특정 상황에서 여러 기술적 대안들의 트레이드 오프를 고려해서 내린 종합적인 판단이 같은가? 아니다.

물론 *“best practice”* 라고 불리는 이유가 있다. 내가 이번에 이 방식을 따르면서 느낀 것은, 대안 사이의 트레이드 오프를 고려해서 결론을 내렸을 때, 결국 *best practice* 를 따르게 되는 경우가 많다는 점이었다. 그럼에도 불구하고, 이 둘은 결코 같을 수가 없다고 생각한다. 결국 평소에 이런 고민을 얼마나 많이 했느냐가 전문가로 성장할 수 있느냐 없느냐의 성패를 좌우하지 않겠는가? 평소에 시간을 내서 여러 대안을 탐색해보고, 어떤 결정을 내릴 때 그 이유에 대해 정리해보는 시간을 가지는 것이 정말 중요한 것 같다.

<br>

요약하면, 맹목적으로 best practice 를 따르는 것이 아니라, 특정 상황과 여러 대안 사이의 트레이드 오프를 고려했을 때 어떤 방식이 좋을 지 논증할 수 있는 판단력을 길러야 한다.

<br>

이런 생각을 하고 나서 이번 프로젝트에 적용해보기도 했다. - [**로드맵 도메인 개발 #16**](https://github.com/potenup-kllhy/roadmap/issues/16)

시간이 정말 많이 소요되기는 한다. 그래도 시간 쓰는 만큼 성장하는 것 아니겠는가?

---

<br>

# 기술적인 부분들(작성 중…)

<br>

## 도메인 이벤트

- 처음에는 id
- 생각해보니 없어서 못 넣어주잖아? 어떡하지?
    - 대안 3개
- UUID 로 결정
- 근데 사용하는 쪽 고려를 못 했음. 바보임.
- 다시 ID 사용으로 변경, 단, 생성 이벤트의 경우 엔티티 리스너를 달아서 처리하도록 변경
- 같은 문제를 반복하지 않으려면? DTO?
- 해결되지 않은 문제
    - 너무 많은 이벤트가 발생함.
    - 통합해서 구현하는 방식으로 변경할 수 있을 것

---

<br>

## 비대한 엔티티

- DDD 사용 시 엔티티 (특히 애그리게이트 루트) 가 비대해지는 문제가 있음
- 원인이 뭘까?
- 어떻게 해소할 수 있을까?

---

<br>

## 추상 엔티티

---

<br>

## getter 이름 형식의 불일치

- 자바 record 에서는 필드 이름으로 바로 가져갈 수 있는데, lombok getter 에서는 getXxx 식임
- 큰 문제는 아닌데 살짝 거슬린다 정도?

---

<br>

## 도메인 이벤트 등록을 위한 나름의 방법 공유

---

<br>

## 도메인 예외가 HTTP 상태 코드에 의존하는 문제

---

<br>

## 메인 엔티티와 JPA 엔티티를 완전히 분리할 수는 없을까?

---

<br>

## MultipleBagFetchException 에 대해

---

<br>

## Topic vs SubTopic 을 통합할 수는 없었을까?

- 로드맵 애그리게이트에서 `Topic` 과 `SubTopic` 을 분리했던 이유가 뭐였지? 굳이 나눌 필요가 있었을까? 나누지 않았다면 복잡성을 많이 줄일 수 있었을텐데…

---

<br>

## 객체 그래프 동기화를 위한 업데이트 로직

- Creation Spec 정적 팩토리 메서드와 Update Spec 내부 정적 팩토리 메서드를 둘 다 만드는 것이 포인트
- 현재는 전부 덮어쓰기 식으로 update 처리를 하고 있는데, 나중에 diff 체크를 해서 변경 이벤트 발생 여부를 확인하는 로직을 만들어야 한다.

---

<br>

## 테스트?

- mocking 잘 모르겠음
- AI 를 활용한 테스트 자동화 어떻게 효율적으로 잘 할 수 있을까?
- 이번에 테스트 잘 하려고 했는데 잘 안돼서 아쉬웠음

---

<br>