# 📝 TodoList | wanted-pre-onboarding-fe-7

원티드 프리온보딩 프론트엔드 선발 과제 입니다.
투두 리스트를 구현하였습니다.

[1. 🗒️ 프로젝트 설명](#description) <br>
[2. 🌎 프로젝트 소개](#about-project) <br>
[3. ✍🏻 프로젝트 개선 과정](#개선-및-결과) <br>
[4. 🖥️ 구현 화면](#results)

## Description

### 프로젝트 실행 방법

```
npm install
npm start
```

### 배포 링크

[사이트 바로가기](https://wanted-pre-onboarding-fe-7-pearl.vercel.app/)

```
id : 123@test.com
pw : 12345678
```

### 패키지 설명

```
"react": "^18.2.0",
"axios": "^1.0.0", -------------- 서버 통신 관리 라이브러리
"react-router-dom": "^6.4.1", --- 라우터 설정
"styled-components": "^5.3.6", -- 스타일 라이브러리
```

<details>
<summary>폴더 구조</summary>

```
📦src
 ┣ 📂apis
 ┃ ┣ 📜auth.js
 ┃ ┣ 📜instance.js
 ┃ ┗ 📜todo.js
 ┣ 📂components
 ┃ ┣ 📂Auth
 ┃ ┃ ┣ 📜Login.jsx
 ┃ ┃ ┗ 📜SignUp.jsx
 ┃ ┗ 📂Todo
 ┃ ┃ ┗ 📜Todo.jsx
 ┣ 📂routers
 ┃ ┣ 📜PrivateRoute.jsx
 ┃ ┗ 📜Router.jsx
 ┣ 📂styles
 ┃ ┗ 📜Style.jsx
 ┣ 📂utils
 ┃ ┗ 📜token.js
 ┣ 📜App.js
 ┗ 📜index.js
```

</details>

## About Project

### Skill


<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">  <img src="https://img.shields.io/badge/React&nbsp;Router-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=black">  <img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styled-components&logoColor=black"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=black">

### Function

- **Auth**
  - 실시간 유효성 검사 (유효하지 않다면 로그인/회원가입 버튼 비활성화) <br>
  - 스토리지에 token 있을 시 `/todo` 리다이렉트 (로그인, 회원가입 페이지 접근 불가) <br>
  - 스토리지에 token 없을 시 `/` 리다이렉트 (투두 페이지 접근 불가) <br> 
  - 회원가입 성공 시 `/todo` 리다이렉트 <br>

- **Todo**
  - todo CRUD <br>
  - 스토리지에 token 없을 시 `/` 리다이렉트 <br> 

## 개선 및 결과

[개선사항 관련 이슈로 이동하기]()

**1. 파일 구조 변경** https://github.com/jaeyeong815/wanted-pre-onboarding-fe-7/pull/2 <br>

  `각 폴더와 파일이 갖는 역할`에 따라 나누기 위해 1차 작업을 진행하였습니다. <br>
  이후 이 파일 구조를 토대로 필요한 기능들을 구현하였고, 프로젝트 개선 진행 상황이 80%정도 진행 된다면<br>
  한 컴포넌트에선 하나의 기능을 하여 각각의 코드가 서로 얽혀있지 않고 독립적으로 분리될 수 있게끔 관심사 분리를 할 예정입니다.<br>
  (추후 쉬운 유지보수와 높은 가독성을 기대하기 위해서)

**2. 불필요한 state 관리 제거** https://github.com/jaeyeong815/wanted-pre-onboarding-fe-7/pull/3 <br>

  이미 존재하는 값으로 계산될 수 있는 값을 불필요하게 `useState`로 상태를 관리하고 있는 부분을 제거하여 <br>
  불필요한 리렌더링을 방지하였습니다.<br>
  또한 `side effect`(ex. 비동기로 처리되어야 하는 로직)를 처리하기 위해 존재하는 hook인 `useEffect`를 사용하고 있었고,<br>
  해당 로직은 `useEffect`까지 사용 할 필요가 없다는 생각이 들어 제거하였습니다.<br>
  
**3. 여러 컴포넌트에서 사용되는 동일한 로직 분리** https://github.com/jaeyeong815/wanted-pre-onboarding-fe-7/pull/4 | https://github.com/jaeyeong815/wanted-pre-onboarding-fe-7/pull/5 (1번)<br>
  
  `로그인 여부를 확인하여 라우팅`을 시키는 과정에서 처음 구현했던 기능도 틀린 방법은 아니었지만,<br>
  고민을 해봤을 때 더 나은 방향이 분명히 있다고 생각이 들었고<br>
  왜 그런 생각을 했는지, 어떻게 구현해야 하는지 구체적으로 고민하여 개선을 하였습니다.<br>
  그 결과 `여러 컴포넌트에서 사용되고 있던 같은 로직을 분리`하여 필요한 컴포넌트에서만 간단히 사용할 수 있도록 개선하였습니다.

**4. performance time을 고려한 state 로직 변경** https://github.com/jaeyeong815/wanted-pre-onboarding-fe-7/pull/5 (2번) <br>

  새로 받아온 데이터를 기존 데이터에 합치는 과정을 구현하던 중,<br>
  기존 `스프레드 문법`을 사용하여 구현되어 있던 부분을 `concat` 메서드로 변경해도 되겠다는 생각이 들었습니다.<br>
  왜 변경해야 하는지 근거를 설명하기 위해 `performance 측정`을 하였고, 납득할만한 결과가 확인되어 로직을 수정하였습니다.

## Results

### 회원가입 / 로그인
![회원가입](https://user-images.githubusercontent.com/85178602/213903273-999d62b7-c24e-4e7b-8117-9c1cd8ac8a48.gif)

![로그인](https://user-images.githubusercontent.com/85178602/213903271-a153ef15-2e29-4de9-b52f-ecb7ead3d906.gif)

### 할일 등록

![등록](https://user-images.githubusercontent.com/85178602/213903280-e1ca57e3-e0b1-47ce-93ee-7871f6f8bcac.gif)

### 할일 수정

![수정](https://user-images.githubusercontent.com/85178602/213903292-12d00c09-4494-4981-9ed5-913f867d3d2a.gif)

### 할일 삭제

![삭제](https://user-images.githubusercontent.com/85178602/213903299-33a0229a-20de-4cce-a6f2-f7ec9c8d5be4.gif)
