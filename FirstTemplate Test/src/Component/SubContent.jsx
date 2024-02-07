import React from 'react';

const Widget = () => {
  return (
    
    <div className="ml-24 mt-10 flex " style={{ width: '800px', height: '300px' }}>
      <div>
        <span className='inline-block font-Nanum text-xl font-semibold rotate-[-0.03deg]'>나의 최근 작업</span>
        <a className='inline-block  ml-[540px] font-Nanum text-xl font-semibold text-main rotate-[-0.03deg]' href='/recent'>더보기</a>
        <div className='flex flex-row mt-5'>

          <a className='hover:scale-105 duration-500 w-56 h-56 mr-8 bg-[#B8D8DC] opacity-60 drop-shadow-lg flex justify-center flex-col items-center' href='/board'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 absolute top-20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
            <span className='inline-block font-Nanum text-xl font-semibold rotate-[-0.03deg] mt-32 '>새 프로젝트</span>
          </a>

          <div className='hover:scale-105 duration-500 w-56 h-56 mr-8 bg-white drop-shadow-lg flex justify-center flex-col items-center'>
            <img src="/project_image1.png" alt="" className='w-36 h-36 object-cover ' />
            <span className='inline-block font-Nanum text-xl font-semibold rotate-[-0.03deg] '>프로젝트 1</span>
          </div>

          <div className='hover:scale-105  duration-500 w-56 h-56 mr-8 bg-white drop-shadow-lg flex justify-center flex-col items-center'>
            <img src="/project_image3.jpg" alt="" className='w-36 h-36 object-cover ' />
            <span className='inline-block font-Nanum text-xl font-semibold rotate-[-0.03deg] '>프로젝트 2</span>
          </div>
        </div>
      
      </div>
      <div className=' mt-32 mb-10 min-w-72 min-h-[460px] flex  flex-col '>
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
    </div>
    
  );
};

export default Widget;
