import React, { useEffect,useState } from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const KakaoLogin: React.FC = () => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();

  useEffect(() => {
 
    const access_Token = Cookies.get('access_token');
    const refresh_Token = Cookies.get('refresh_token');

    setAccessToken(access_Token);
    setRefreshToken(refresh_Token);

    if (accessToken && refreshToken) {
      try {
        const decoded = jwtDecode(accessToken);
        navigate("/home");
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
      }
    }
  
  }, []);

  useEffect(() => {
    // 목표 URL로 리다이렉션
    window.location.href=`${process.env.REACT_APP_KAKAO_LOGIN_URI}?redirect_uri=${process.env.REACT_APP_LOGIN_REDIRECT_URI}`;
  }, []);

  return null; // 리다이렉션 중에는 아무것도 렌더링하지 않습니다.
};


export default KakaoLogin;

