// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-bookshelf",
          title: "bookshelf",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/books/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "프로젝트 기록",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-about-tododo-privacy-policy",
        
          title: "About Tododo Privacy Policy",
        
        description: "개인정보 관리 의무에 대해 살펴보고, 계정 휴면 기능의 필요성을 재고해보자.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/about-tododo-privacy-policy/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-원티드-포텐업-lms-1개월차-회고",
          title: '원티드 포텐업 LMS - 1개월차 회고',
          description: "JDBC 기반의 커맨드라인 LMS 개발 여정",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2025-10-26-wanted-lms-1st/";
            },},{id: "projects-원티드-포텐업-두-번째-lxp-프로젝트-회고",
          title: '원티드 포텐업 - 두 번째 LXP 프로젝트 회고',
          description: "Spring Boot 기반의 LXP API 서버 개발기",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2025-11-20-wanted-lxp-2nd/";
            },},{id: "projects-팔로우-멱등성-구현-시-발생한-문제-상황과-해결-방안-결정을-위한-여정",
          title: '팔로우 멱등성 구현 시 발생한 문제 상황과 해결 방안 결정을 위한 여정',
          description: "원티드 포텐업 - 두 번째 LXP 프로젝트 진행 중 경험한 문제 해결 여정 공유",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2025-12-11-wanted-lxp-3rd/";
            },},{id: "projects-원티드-포텐업-네-번째-lxp-프로젝트-회고",
          title: '원티드 포텐업 - 네 번째 LXP 프로젝트 회고',
          description: "DDD, 헥사고날, MSA 까지 다양한 것들을 훑어보면서 느낀 경험들",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2026-01-20-wanted-lxp-4th/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%6D%6D%65%7A%6B%68%61%6E@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/SeungYeop-Han", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
