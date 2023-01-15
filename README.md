# public_issuer
고객들이 내가 자주 가는 Public Repository의 Issue들을 확인할 수 있도록 웹 페이지를 개발하였습니다. 

## 1. 프로젝트 설정
Github에서 해당 파일을 다운로드([링크](https://github.com/byungmin12/public_issuer)) 후

### 환경변수 설정

**.env.example** 파일 혹은 아래를 참조하여 **.env**파일을 생성합니다.
```dotenv
REACT_APP_GITHUB_TOKEN=(YOUR_GITHUB_TOKEN)
```
>GITHUB TOKEN
깃헙 토큰이란 패스워드 대신 github api와 github cli를 사용할 수 있게 도와주는 토큰입니다. GITHUB TOKEN 없이 해당 웹 애플리케이션을 사용하게  된다면 API 요청에 대한 제한이 발생할 수 있습니다. ( 시간당 최대 60개 요청 )
>
>방법 : [링크](https://docs.github.com/ko/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)


### node_module 설치
해당 파일 위치에서 터미널을 킨 뒤

```shell
npm install
```
을 입력하여 node_modules를 설치해준다.

## 2. 프로젝트 실행

해당 파일 위치에서 터미널을 킨 뒤

```shell
npm run start
```
를 입력하여 프로젝트를 실행시켜준다.


## 3. 기능

### Repository 검색
![ezgif com-gif-maker (13)](https://user-images.githubusercontent.com/79984280/212537106-118a0e41-7486-44b8-a870-0bcff21b7a49.gif)

검색에는 muidml autocomplete을 사용했으며 마지막 하단으로 스크롤 시 다음 페이지가 검색되도록 구현하였습니다.

### Repository 등록

![](https://velog.velcdn.com/images/kbm940526/post/c540bd39-43df-42d0-a0e7-f35a279e5273/image.gif)

검색된 레포를 클릭하면 로컬스토리지에 저장되고 이는 새로고침 시에도 유지되도록 구현하였습니다.

또한, 레포는 최대 4개까지 저장됩니다.

### Issue
![](https://velog.velcdn.com/images/kbm940526/post/436a75d3-00d7-489a-a61c-4a88b69dd3f0/image.gif)

각 이슈카드에는 레포, 이슈 타이틀, 작성자, 라벨이 보이며 클릭 시 상세페이지로 이동합니다..

또한 맨 마지막 이슈에 도착 시 다음 페이지의 이슈를 로드하게 구현했습니다.



