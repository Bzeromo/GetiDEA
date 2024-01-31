# 음성채팅 구현 (webRTC 활용) 필요 내용 정리

## 진행 사항
- SSAFY GIT에 webRTC 관련 명세서가 있음! => backend/frontend 관련해서 내용 정리되어 있으니 확인 바람! <br>
- webRTC_test 폴더 관련 내용
1) createOffer, sendOffer 됨 / createAnswer 부터 안되는데 이유를 모르겠음.
2) VideoCall.jsx 로 구현 연습 ( VideoCallType.tsx 는 완전히 미완성! )

## webRTC 개념 학습 관련
- mdn 공식문서 <br>
https://developer.mozilla.org/ko/docs/Web/API/WebRTC_API <br>

- 구글에서 제공하는 webRTC 관련 내용 <br>
https://webrtc.org/?hl=ko <br>

- velog : WebRTC를 React에서 구현해보자! <br>
https://velog.io/@kymkjh2002/WebRTC%EB%A5%BC-React%EC%97%90%EC%84%9C-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EC%9E%90 <br>

- tistory : webRTC 장단점/통신방법 등 <br>
https://kbs77.tistory.com/94 <br>

## 예제 (우선순위 순으로 기재) 
- SpringBoot WebRTC Chatting Project (가장 쓸만해 보이는 gitHub / 하지만, Kurento 사용해야 함) <br>
https://github.com/SeJonJ/Spring-WebSocket-WebRTC-Chatting?tab=readme-ov-file <br>
(정리해놓은 포스팅)
https://terianp.tistory.com/149 <br>

- webRTC, React, TypeScript <br>
https://kbs77.tistory.com/102 <br>

- WebRTC <br>
https://devmemory.tistory.com/106 <br>

- OpenVidu 튜토리얼 <br>
https://jini-space.tistory.com/18#article-5--4--openvidu-%EC%84%9C%EB%B2%84-%EC%8B%A4%ED%96%89%ED%95%98%EA%B8%B0

## 관련 싸피 프로젝트
- SSAFY 8기 보이는 라디오 WebRTC 프로젝트 <br>
https://github.com/yyh7750/Bora

- webRTC 화상 술자리 서비스 - SSAFY 8기 <br>
https://github.com/0901jbh/homezakaya

- 🏆아바타임 : Web RTC 기술을 이용한 블라인드 미팅 플랫폼 - 🥇SSAFY 7기 공통프로젝트 우수상 1등(2022.08.26) <br>
https://github.com/avatime/avatime?tab=readme-ov-file