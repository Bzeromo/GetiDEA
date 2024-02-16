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
import WhiteBoard from './pages/Board';
import BoardTemplate1 from './pages/BoardTemplate1';
import BoardTemplate2 from './pages/BoardTemplate2';
import BoardTemplate3 from './pages/BoardTemplate3';
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
          </Route>

          <Route path="/templateSelect" element={<ProtectedRoute><TemplateSelect /></ProtectedRoute>} />
          <Route path="/projectnameinput" element={<ProtectedRoute><ProjectNameInput /></ProtectedRoute>} />
          {/* <Route path="/board" element={<ProtectedRoute><WhiteBoard /></ProtectedRoute>} />
          <Route path="/board/template1" element={<ProtectedRoute><BoardTemplate1 /></ProtectedRoute>} />
          <Route path="/board/template2" element={<ProtectedRoute><BoardTemplate2 /></ProtectedRoute>} />
          <Route path="/board/template3" element={<ProtectedRoute><BoardTemplate3 /></ProtectedRoute>} /> */}
 
          <Route path="/board" element={<WhiteBoard />} />
          <Route path="/board/template1" element={<BoardTemplate1 />} />
          <Route path="/board/template2" element={<BoardTemplate2 />} />
          <Route path="/board/template3" element={<BoardTemplate3 />} /> 
        
         
      </Routes>
    </AuthProvider>
  );
};

export default App;
