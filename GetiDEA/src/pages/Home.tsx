// App.tsx
import React, { useEffect } from 'react';
import Topbar from '../components/TopBar';
import MainContent from '../components/MainContent';
import SubContent from '../components/SubContent';
import AddedIdea from '../components/AddedIdea';
import { jwtDecode } from 'jwt-decode';


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

        {/* 최근 업데이트 목록 */}
          <div className=' absolute right-6 top-[450px] min-w-72 min-h-[460px] flex  flex-col '>
            <span className='ml-3 mb-3 inline-block font-Nanum text-xl font-semibold rotate-[-0.03deg]'>최근 업데이트</span>
            <div className=' w-72 h-[400px] shadow-[rgba(0,_0,_0,_0.08)_8px_8px_48px_8px]	 bg-white rounded-md'>
              <div className='mt-8 ml-5 mr-10 inline-block font-Nanum text-base font-[800] rotate-[-0.03deg]'>
                작업 보드 UI 수정
                <div className='mt-3 font-Noto Sans text-base font-[600] opacity-50 rotate-[-0.03deg]'>
                작업 보드의 전체적인 UI가 수정되었습니다. 작업 툴의 아이콘 디자인을 수정해 기능에 대한 직관성을 높였고 뒤로 가기 버튼을 추가하였습니다.
                </div>
              </div>

              <div className='mt-10 ml-5 mr-10 inline-block font-Nanum text-base font-[800] rotate-[-0.03deg]'>
                실시간 보드 공유 기능 추가
                <div className='mt-3 font-Noto Sans text-base font-[600] opacity-50 rotate-[-0.03deg]'>
                실시간 보드 공유 기능을 통해 같은 보드를 여러 명이서 같이 작업하고 꾸밀 수 있습니다.
                </div>
              </div>
            </div>
          
          </div>
        <div className=" flex flex-1 relative w-[800px]">
            <AddedIdea />
        </div>
      </div>
    </div>
  );
};

export default Home;
