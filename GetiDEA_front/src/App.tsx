// App.tsx
import React from 'react';
import Intro from './pages/Intro';
import Layout from './components/Layout';
import Home from './pages/Home';
import Recent from './pages/Recent';
import Bookmark from './pages/Bookmark';
import Projects from './pages/Projects';
import Folder from './pages/Folder';
import TemplateSelect from './pages/TempleteSelect';
import ProjectNameInput from './pages/ProjectNameInput';
import Board from './pages/Board';
import GoogleLogin from './pages/GoogleLogin';
import NaverLogin from './pages/NaverLogin';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import KakaoLogin from './pages/KakaoLogin';


const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = useAuth();
  return auth?.isAuthenticated ? children : <Navigate to="/" replace />;
};

const LoginRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = useAuth();
  console.log( `로그인됨? : ${auth?.isAuthenticated}`);
  return auth?.isAuthenticated ? <Navigate to="/home" replace /> : children;
};
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        
        <Route path="/" element={<LoginRoute><Intro /></LoginRoute>} />
        <Route path="/googlelogin" element={<GoogleLogin />} />
        <Route path="/naverlogin" element={<NaverLogin />} />
        <Route path="/kakaologin" element={<KakaoLogin />} />
          <Route path='/' element={<Layout />}>
              <Route path="home"  element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="recent" element={<ProtectedRoute><Recent /></ProtectedRoute>} />
              <Route path="bookmark" element={<ProtectedRoute><Bookmark /></ProtectedRoute>} />
              <Route path="projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
              <Route path="folder/:folderId" element={<ProtectedRoute><Folder /></ProtectedRoute>} />
              {/* 중첩된 다른 라우트들을 이곳에 추가 */}
          </Route>

          <Route path="/templateSelect" element={<ProtectedRoute><TemplateSelect /></ProtectedRoute>} />
          <Route path="/projectnameinput" element={<ProtectedRoute><ProjectNameInput /></ProtectedRoute>} />
          {/* <Route path="/board" element={<ProtectedRoute><Board /></ProtectedRoute>} /> */}
          <Route path="/board" element={<Board />} />
        
         
      </Routes>
    </AuthProvider>
  );
};

export default App;
