import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const VideoCall = () => {
  const socketRef = useRef();
  const myVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef();

  const { roomName } = useParams();

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      if (!pcRef.current || !socketRef.current) {
        return;
      }
      stream.getTracks().forEach((track) => {
        // if (!pcRef.current) {
        //   return;
        // }
        pcRef.current.addTrack(track, stream);
      });

      pcRef.current.onicecandidate = (e) => {
        if (e.candidate && socketRef.current) {
          console.log("recv candidate");
          socketRef.current.emit("candidate", e.candidate, roomName);
        }
      };

      // pcRef.current.ontrack = (e) => {
      //   console.log('ontrack event:', e);
      //   if (remoteVideoRef.current) {
      //     remoteVideoRef.current.srcObject = e.streams[0];
      //   }
      // };

      pcRef.current.ontrack = (e) => {
        // 상대방의 비디오 요소에 스트림을 할당합니다.
        if (remoteVideoRef.current && e.streams[0]) {
          remoteVideoRef.current.srcObject = e.streams[0];
        }
      };

    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async () => {
    console.log("create Offer");
    if (!pcRef.current || !socketRef.current) {
      return;
    }
    try {
      const sdp = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(sdp);
      console.log("sent the offer");
      socketRef.current.emit("offer", sdp, roomName);
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp) => {
    console.log("createAnswer");
    if (!pcRef.current || !socketRef.current) {
      return;
    }

    try {
      await pcRef.current.setRemoteDescription(sdp);
      const answerSdp = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answerSdp);

      console.log("sent the answer");
      socketRef.current.emit("answer", answerSdp, roomName);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socketRef.current = io("localhost:8080");

    pcRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    socketRef.current.on("all_users", (allUsers) => {
      if (allUsers.length > 0) {
        createOffer();
      }
    });

    socketRef.current.on("getOffer", (sdp) => {
      console.log("recv Offer");
      createAnswer(sdp);
    });

    socketRef.current.on("getAnswer", (sdp) => {
      console.log("recv Answer");
      if (pcRef.current) {
        pcRef.current.setRemoteDescription(sdp);
      }
    });

    socketRef.current.on("getCandidate", async (candidate) => {
      if (pcRef.current) {
        await pcRef.current.addIceCandidate(candidate);
      }
    });

    socketRef.current.emit("join_room", { room: roomName });

    getMedia();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <video
        id="myvideo"
        style={{
          width: 240,
          height: 240,
          backgroundColor: "black",
        }}
        ref={myVideoRef}
        autoPlay
      />
      <video
        id="remotevideo"
        style={{
          width: 240,
          height: 240,
          backgroundColor: "black",
        }}
        ref={remoteVideoRef}
        autoPlay
      />
    </div>
  );
};

export default VideoCall;
