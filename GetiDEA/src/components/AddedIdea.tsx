import React from 'react';

const AddedIdea: React.FC = () => {
  return (
    
    <div className="ml-24 mt-10 flex " style={{ width: '800px', height: '300px' }}>
    <div>
      <span className='inline-block font-Nanum text-xl font-semibold rotate-[-0.03deg]'>최근 추가된 아이디어 기법</span>
      <div className='flex flex-row mt-5'>

        <div className='w-[350px] h-40 mr-8 bg-[#D2E3EA]  rounded-md drop-shadow-lg flex justify-center flex-col items-center'>
          <div className='flex flex-row'>
              <div className='flex flex-col mt-3'>
              <span className='inline-block ml-4 text-main  font-poppins text-lg font-semibold rotate-[-0.03deg]  '>BrainWriting</span>
              {/* <a href='/' className='w-[128px] h-10 bg-main ml-3 mt-6 rounded-md text-white font-poppins text-base font-semibold rotate-[-0.03deg] flex justify-center items-center'>보기</a> */}
              </div>
              <div className='w-36 h-18 ml-8'>
              <img src="/brainwriting.png" className=' drop-shadow-2xl'  alt="" />
              </div>
          </div>
        </div>

        <div className='w-[350px] h-40 mr-8 bg-[#D2E3EA]  rounded-md drop-shadow-lg flex justify-center flex-col items-center'>
          <div className='flex flex-row'>
              <div className='flex flex-col mr-36 mt-2'>
              <span className='inline-block ml-4 text-main  font-poppins text-lg font-semibold rotate-[-0.03deg]  '>Osborne Checklist<br/>Technique</span>
              {/* <a href='/' className='w-[128px] h-10 bg-main ml-3 mt-3 rounded-md text-white font-poppins text-base font-semibold rotate-[-0.03deg] flex justify-center items-center'>보기</a> */}
              </div>
              <div className='w-36 h-18 absolute top-3 right-3'>
              <img src="/Checklist-bro.png" className=' drop-shadow-2xl'  alt="" />
              </div>
          </div>
        </div>

     

      </div>
    </div>
  </div>
    
  );
};

export default AddedIdea;
