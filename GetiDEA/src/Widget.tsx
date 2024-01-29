import React from 'react';

const Widget: React.FC = () => {
  return (
    
    <div className="ml-24 flex justify-center items-center bg-gradient-to-r from-main to-gradient_color" style={{ width: '80%', height: '300px' }}>
      {/* 위젯 콘텐츠 */}
      <h2 className="text-lg font-bold">Widget</h2>
    </div>
  );
};

export default Widget;
