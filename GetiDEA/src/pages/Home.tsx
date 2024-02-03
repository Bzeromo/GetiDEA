// App.tsx
import React from 'react';
import Topbar from '../components/TopBar';
import MainContent from '../components/MainContent';
import SubContent from '../components/SubContent';
import AddedIdea from '../components/AddedIdea';
const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
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
