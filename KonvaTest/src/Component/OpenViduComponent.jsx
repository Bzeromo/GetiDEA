import React, { useState, useEffect } from "react";
import { OpenVidu } from "openvidu-browser";

function OpenViduComponent() {
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const OV = new OpenVidu();
    getSessionAndToken().then(({ sessionId, token }) => {
      joinSession(OV, sessionId, token);
    });

    return () => {
      if (session) {
        session.disconnect();
      }
    };
  }, []);

  const getSessionAndToken = async () => {
    // 서버에 POST 요청을 보내 세션 ID와 토큰을 받아옵니다.
    const response = await fetch("/session", { method: "POST" });
    const data = await response.json();
    return { sessionId: data.sessionId, token: data.token };
  };

  const joinSession = (OV, sessionId, token) => {
    const session = OV.initSession();

    session.on("streamCreated", (event) => {
      const subscriber = session.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    session.connect(token)
      .then(() => {
        // 화면 공유와 음성 채팅을 위한 퍼블리셔 설정
        const pub = OV.initPublisher(undefined, {
          audioSource: undefined, // 마이크 사용
          videoSource: "screen", // 화면 공유 활성화
          publishAudio: true, // 음성 전송 활성화
          publishVideo: true, // 비디오 전송 활성화 (이 경우 화면)
          mirror: false, // 화면 공유 시 미러링 비활성화
        }, (error) => {
          if (error) {
            console.log("Error publishing:", error);
          }
        });

        setPublisher(pub);
        session.publish(pub).catch(error => console.log("Publish error:", error));
      })
      .catch(error => console.log("Session connect error:", error));

    setSession(session);
  };

  return (
    <div>
      <div
        id="publisher"
        ref={(ref) => {
          // 퍼블리셔 비디오를 DOM에 마운트
          if (ref && publisher) ref.appendChild(publisher.element);
        }}
      ></div>
      <div id="subscribers">
        {subscribers.map((subscriber, index) => (
          <div
            key={index}
            ref={(ref) => {
              // 구독자 비디오를 DOM에 마운트
              if (ref) ref.appendChild(subscriber.element);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default OpenViduComponent;
