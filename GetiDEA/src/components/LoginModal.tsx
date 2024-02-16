import React, { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useAuth } from '../AuthContext';
import { useNavigate,Link } from 'react-router-dom';
import Cookies from 'js-cookie';

interface LoginModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, closeModal }) => {

  const navigate = useNavigate();
  const auth = useAuth();

  const [searchParams] = useSearchParams();
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
  
  useEffect(() => {
    // 페이지 로드 시 토큰 확인 로직
    localStorage.setItem('accessToken',accessToken ?? "" )
    localStorage.setItem('refreshToken',refreshToken ?? "" )
    if(!!accessToken){
      navigate("/home");
    }
    
  
  }, []);
 
  
  const setToken = ()=>{
    auth?.login("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdW5neW9hbndvb0BuYXZlci5jb20iLCJpYXQiOjE3MDcxMDkxMjEsInVzZXJOYW1lIjoi7KCV7Jew7JqwIiwicHJvdmlkZXIiOiJLQUtBTyIsImV4cCI6MTcwNzExMjcyMX0.6Sbb6dXDnIzENV1AQjoInitBgE6Dbawt-g67OIfWZ3-QMRjeHUqr_37ZlOiOkjqT3uEpEb-jZXgqwzJzsYyVsw",
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdW5neW9hbndvb0BuYXZlci5jb20iLCJpYXQiOjE3MDcxMDkxMjEsInByb3ZpZGVyIjoiS0FLQU8iLCJleHAiOjE3MDcxOTU1MjF9.RizvhwfS9rhwfl8sKPIJWkcMOfEbaPZyERhhsAan7S09BkSCerIAu4EI9chkCxYWu-Q5ckP0Ss_8BrwSYgdiRw");
  }

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px'
      }}>
        <div className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
            <div className="relative container m-auto px-6">
                <div className="w-[400px] ">
                    <div className="rounded-xl h-80 bg-white dark:bg-gray-800 shadow-xl">
                        <div className="px-8 py-4">
                            <svg  onClick={closeModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 ml-80 text-light_gray cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                            <div className="space-y-4 mt-5">
                                <h2 className="mb-8 text-2xl text-center text-Nanum  font-light rotate-[-0.03deg]">로그인
                                </h2>
                            </div>
                            <div className="mt-12 grid space-y-4">

                              

                                {/* 네이버 로그인 버튼 */}
                                <Link to="/naverlogin"
                                    className="group h-12 px-6 pt-1 rounded-full bg-[#03c75a]  " onClick={setToken}>
                                    <div className="relative  items-center flex font-regular font-Nanum tracking-wide rotate-[-0.03deg] text-white text-base ">
                                       <img src="/naver.png" alt="" className='w-10 h-10'/>
                                            <span className='ml-12'>네이버로 시작하기</span>
                                    </div>
                                </Link>

                                {/* 카카오 로그인 */}
                                <Link to="/kakaologin"
                                    className="group h-12 px-6 rounded-full bg-[#FEE500]  " onClick={setToken}>
                                    <div className="relative items-center flex font-regular font-Nanum tracking-wide rotate-[-0.03deg] text-black text-base ">
                                       <img src="/kakao.svg" alt="" className='w-7 h-7 mt-2 ml-1'/>
                                            <span className='ml-14 mt-3'>카카오로 시작하기</span>
                                    </div>
                                </Link>
                        </div>
                      
                    </div>
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
