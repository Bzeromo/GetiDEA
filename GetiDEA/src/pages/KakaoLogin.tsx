import React, { useEffect ,useState} from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const KakaoLogin: React.FC = () => {
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();

  // const accessToken = searchParams.get("access_token");
  // const refreshToken = searchParams.get("refresh_token");

  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();

  useEffect(() => {
    // localStorage.setItem('accessToken',accessToken ?? "" )
    // localStorage.setItem('refreshToken',refreshToken ?? "" )

    // const access_Token = Cookies.get('access_token');
    // const refresh_Token = Cookies.get('refresh_token');

    const access_Token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdW5neW9hbndvb0BuYXZlci5jb20iLCJpYXQiOjE3MDc5NjI0OTgsInVzZXJOYW1lIjoi7KCV7Jew7JqwIiwicHJvdmlkZXIiOiJLQUtBTyIsImV4cCI6MTcwNzk2NjA5OH0.iqPoafDntKIu-PCa5UZz9J7U-mzAMBDyB0srlKbeArUJsYHkhNxq8iUt19S0LA1Ou7dWTTedKpfcAuK6ZqWlMA"
    const refresh_Token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdW5neW9hbndvb0BuYXZlci5jb20iLCJpYXQiOjE3MDc5NjI0OTgsInByb3ZpZGVyIjoiS0FLQU8iLCJleHAiOjE3MDgwNDg4OTh9.8PU8vzyctKPEcVfOOgzaZlueY4I56PJCAVLxriP8-uD0f-DWwgKheB0B1SvO2O3yjdVVq-SuopeAsPTqYjn_XQ"

    console.log(Cookies.get('access_token'));
    console.log(refreshToken);
    // 상태 업데이트
    setAccessToken(access_Token);
    setRefreshToken(refresh_Token);
    
    // if(accessToken){
    //   const decoded=jwtDecode(localStorage.getItem('accessToken')??"");
    //   console.log(`토큰 디코딩 결과 : ${JSON.stringify(decoded)}`);
    //   navigate("/home");
    // }
  
    if (accessToken && refreshToken) {
      // JWT 디코딩
      try {
        const decoded = jwtDecode(accessToken);
        console.log(`토큰 디코딩 결과: ${JSON.stringify(decoded)}`);
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

