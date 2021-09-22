# ourStory
## ● 주제 및 목적
ourStory는 그룹 간의 스토리를 공유할 수 있는 플랫폼이다.  
카카오스토리와 페이스북 그룹을 모티브로 하여 관심있는 그룹 사람들 간에 게시글을 올리며 일상을 공유하면 좋겠다고 생각하여 개발하게 되었다.
___
## ● 개발 인원 및 기간
- <strong>인원:</strong> 김도현 (1명)
- <strong>개발 기간:</strong> 21.09.13 ~ (진행 중) <strong>(자세한 과정은 ourStroy 파일 안의 README에 작성)</strong>
___
## ● 사용 스택
- <strong>front-end:</strong> Javascript, Vue.js, Vuetify, Eslint, Axios
- <strong>back-end:</strong> strapi (https://strapi.io)
___
## ● 실행 방법
- <strong>파일 ourStory</strong>  
```sh
npm install
npm run serve
```
- <strong>파일 my-project</strong>
```sh
npm install
npm run develop
```
___
## ● 기능
- 유저는 회원가입 및 로그인을 할 수 있다.
- 유저는 비밀번호를 설정하여 자신의 그룹이 사용할 방을 만들 수 있다.
- 유저는 방에서 게시글을 작성할 수 있다.
- 유저는 게시글에 댓글을 달 수 있다.
- 유저는 게시글을 좋아요 누를 수 있다.
___
## ● ERD
<img src="https://user-images.githubusercontent.com/52418706/134389848-46fc7284-86c0-444b-a2bc-7615eac738c4.PNG" width="400" height="400">

___
## ● 각 화면

___
## ● 앞으로 구현 및 시도 할 예정
- strapi의 graphQL로 시도하기
- 위의 사항이 안될 시 localStorage로 구현 (게시글에 댓글을 작성 시 해당 게시글 데이터에 작성한 comment 데이터를 넣기 위함)
- 좋아요 기능 및 댓글 달기 기능 구현
- 방의 즐겨찾기 혹은 방에 가입하기 기능 구현
- typescript 적용
- nuxt.js 적용

