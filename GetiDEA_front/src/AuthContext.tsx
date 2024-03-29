import React, { createContext, useContext, useState, useEffect,ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

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
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지 로드 시 토큰 확인 로직
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);
      const decoded:DecodedToken=jwtDecode(localStorage.getItem('accessToken')??"");
      console.log(decoded);
      localStorage.setItem('userEmail',decoded.sub??"");
      localStorage.setItem('provider',decoded.provider??"");
      localStorage.setItem('userName',decoded.userName??"");
    }
  }, []);

  const login = (token: string, refreshToken: string) => {
    localStorage.setItem('accessToken', token);
    // RefreshToken은 안전하게 처리하세요. 예: HttpOnly Cookie
    setAccessToken(token);
    navigate('/home');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
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
