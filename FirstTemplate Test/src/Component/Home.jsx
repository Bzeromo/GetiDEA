// App.tsx
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MainContent from './MainContent';
import SubContent from './SubContent';
import AddedIdea from './AddedIdea';
const Home = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex  relative">
          <MainContent />
        </div>
        <div className=" flex flex-1 relative w-[800px]">
            <SubContent />
        </div>
        <div className=" flex flex-1 relative w-[800px]">
            <AddedIdea />
        </div>
      </div>
    </div>
  );
};

export default Home;
