// App.tsx
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './TopBar';
import MainContent from './MainContent';
import Widget from './Widget';

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        
        <div className="flex flex-1 relative">
          <MainContent />
         
        </div>
        
        <div className="flex flex-1 relative">
            <Widget />
          </div>
      </div>
    </div>
  );
};

export default App;
