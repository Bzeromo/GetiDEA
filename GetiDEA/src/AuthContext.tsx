import React, { createContext, useContext, useState, useEffect,ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
  userName?: string;
  provider: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode; // children의 타입을 ReactNode로 명시
  }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const isAuthenticated = !!Cookies.get('access_token');
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지 로드 시 토큰 확인 로직
    const storedToken = Cookies.get('access_token');
    if (storedToken) {
      setAccessToken(storedToken);
      const decoded:DecodedToken=jwtDecode(Cookies.get('access_token')??"");
      localStorage.setItem('userEmail',decoded.sub??"");
      localStorage.setItem('provider',decoded.provider??"");
      localStorage.setItem('userName',decoded.userName??"");
    }
  }, []);

  const login = (token: string, refreshToken: string) => {
    setAccessToken(token);
    navigate('/home');
  };

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('provider');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
