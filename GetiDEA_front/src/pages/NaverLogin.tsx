import React, { useEffect } from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const NaverLogin: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");

  useEffect(() => {
    localStorage.setItem('accessToken',accessToken ?? "" )
    localStorage.setItem('refreshToken',refreshToken ?? "" )
    console.log(localStorage.getItem('accessToken'));
  
    if(!!accessToken){
     
      navigate("/home");
    }
  
  }, []);

  useEffect(() => {
    // 목표 URL로 리다이렉션
    window.location.href='http://i10b104.p.ssafy.io:8084/oauth2/authorization/naver?redirect_uri=http://localhost:3004&mode=login';
  }, []);

  return null; // 리다이렉션 중에는 아무것도 렌더링하지 않습니다.
};

export default NaverLogin;

