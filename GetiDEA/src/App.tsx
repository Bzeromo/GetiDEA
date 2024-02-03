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
// import Board from './pages/Board';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Routes>

        <Route path="/intro" element={<Intro />} />
          <Route path='/' element={<Layout />}>
            <Route index  element={<Home />} />
            <Route path="recent" element={<Recent />} />
            <Route path="bookmark" element={<Bookmark />} />
            <Route path="projects" element={<Projects />} />
            <Route path="folder" element={<Folder />} />
            {/* 중첩된 다른 라우트들을 이곳에 추가 */}
          </Route>
        <Route path="/templateSelect" element={<TemplateSelect />} />
        <Route path="/projectnameinput" element={<ProjectNameInput />} />
        {/* <Route path="/board" element={<Board />} /> */}
      </Routes>
  );
};

export default App;
