import React, { useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';

const OPENVIDU_SERVER_URL = 'http://43.202.42.142:5446/';
const OPENVIDU_SECRET = 'bs970610yg980512yw980227';

function VideoSession() {
    useEffect(() => {
      const OV = new OpenVidu();
      const session = OV.initSession();
  
      session.on('streamCreated', (event) => {
        session.subscribe(event.stream, 'video-container');
      });
  
      async function initializeSession() {
        try {
          const sessionId = await createSession();
          const token = await getToken(sessionId);
          await session.connect(token);
          const publisher = OV.initPublisher('video-container');
          session.publish(publisher);
        } catch (error) {
          console.error(error);
        }
      }
  
      initializeSession();
  
      return () => session.disconnect();
    }, []);
  
    async function createSession() {
      const response = await fetch(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SECRET}`)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error('Failed to create session');
      }
      const data = await response.json();
      return data.id;
    }
  
    async function getToken(sessionId) {
      const response = await fetch(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SECRET}`)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error('Failed to get token');
      }
      const data = await response.json();
      return data.token;
    }
  
    return <div id="video-container" style={{ width: '720px', height: '480px' }}></div>;
  }
  
  export default VideoSession;