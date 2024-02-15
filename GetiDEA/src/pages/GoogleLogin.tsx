import React, { useEffect } from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom';

const GoogleLogin: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");

  useEffect(() => {
    localStorage.setItem('accessToken',accessToken ?? "" )
    localStorage.setItem('refreshToken',refreshToken ?? "" )
    if(!!accessToken){
      navigate("/home");
    }
  
  }, []);

  useEffect(() => {
    // 목표 URL로 리다이렉션
    window.location.href=`${process.env.REACT_APP_GOOGLE_LOGIN_URI}?redirect_uri=${process.env.REACT_APP_LOGIN_REDIRECT_URI}`;
  }, []);

  return null; // 리다이렉션 중에는 아무것도 렌더링하지 않습니다.
};

export default GoogleLogin;

