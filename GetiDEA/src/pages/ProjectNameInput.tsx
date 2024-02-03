// App.tsx
import React from 'react';
import { useState,ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';


const ProjectNameInput: React.FC = () => {

    const navigate = useNavigate();

    const [projectName, setProjectName] = useState<string>('');
    const [isExceeded, setIsExceeded] = useState<boolean>(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        
        const inputText = e.target.value;
        const length = Array.from(inputText).length;

         if (length <= 10) {
            setProjectName(inputText);
            setIsExceeded(false);
        } else {
            setIsExceeded(true);
        }

    };

      
  return (

    <div>
        {/* 상단 블록 */}
        <div className='flex justify-between mt-12'>
            <div className='flex flex-row '>
                <img src="/logo.svg" alt="" className="object-cover h-10 w-10 ml-28"/>
                <div className="text-[26px] text-center pl-2 font-inter font-bold rotate-[-0.03deg]">
                Get iDEA
                </div>
            </div>
            <div className='flex flex-row mr-48'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mt-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                <div className="inline-flex items-center justify-center w-10 h-10 ml-4 text-base text-white bg-[#81A4AD] rounded-full">
                    TW
                </div>
            </div>
        </div>

        {/* 문구 */}
        <div className='mt-8 ml-[70px] duration-700'>
            <span className='opacity-0 animate-fadeIn ml-[36px] font-Nanum font-regular text-4xl rotate-[-0.03deg] text-[#333333]' style={{ animationDelay: '0s' }}>프로젝트 이름을 입력해주세요</span>
            <br/>
            <span className='opacity-0 animate-fadeIn ml-10 font-Nanum font-regular text-lg rotate-[-0.03deg] text-[#333333] opacity-82' style={{ animationDelay: '0.5s' }}>
            최대 10자까지 입력 가능합니다.
            </span>
            <br />
            <span className='opacity-0 animate-fadeIn  ml-10 font-Nanum font-regular text-lg rotate-[-0.03deg] text-[#333333] opacity-82' style={{ animationDelay: '0.5s' }}>
            이름은 언제든 다시 변경할 수 있습니다.
            </span>
            
        </div>

        {/* 프로젝트 명 입력 */}
        <div className='flex justify-center opacity-0 animate-fadeIn duration-700' style={{ animationDelay: '1s' }}>
            <input className="shadow-md appearance-none  rounded w-96 mt-36 h-16 text-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="username" type="text" spellCheck={false} placeholder="프로젝트 이름" onChange={onChange} value={projectName} ></input>
        </div>

        {/* 취소, 시작 버튼 */}
        <div className='flex flex-row mt-56 bg-main animate-fadeIn opacity-0' style={{ animationDelay: '1s' }}>

            {/* 뒤로 버튼 */}
            <div className='absolute left-28 bg-[#D6E8EF] rounded-md w-36 h-12 flex items-center justify-center cursor-pointer' onClick={()=>navigate(-1)}>
                <div className='font-IBM font-regular text-base text-[#6d6d6d] opacity-57 rotate-[-0.03deg]'>뒤로</div>
            </div>

            {/* 시작 버튼 */}
            <div className={projectName.length===0 ? 'absolute invisible cursor-pointer right-28 bg-[#6AA2B8] rounded-md w-36 h-12 flex items-center justify-center': 
                'absolute cursor-pointer right-28 bg-[#6AA2B8] rounded-md w-36 h-12 flex items-center justify-center'} onClick={()=>navigate("/board")}>
                <div className='font-IBM font-regular text-base ml-3 text-white  rotate-[-0.03deg]'>시작</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className=" ml-2 w-4 h-5 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
            </div>
        </div>
    </div>
    
   
  );
};

export default ProjectNameInput;
