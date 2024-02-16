// App.tsx
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const TemplateSelect: React.FC = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const [isSelected, setIsSelected] = useState<boolean[]>( Array(4).fill(false));
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [folderName, setFolderName] = useState<string>('');

    const select = (idx: number): void => {
        const arr: boolean[] = Array(4).fill(false);
        arr[idx] = true;
        setIsSelected(arr);
        setSelectedIndex(idx);
      };

       useEffect(()=>{
        const name = location.state.folderName
        setFolderName(name);
    })

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
        </div>

        {/* 문구 */}
        <div className='mt-8 ml-[70px] duration-700'>
            <span className='opacity-0 animate-fadeIn ml-[36px] font-Nanum font-regular text-4xl rotate-[-0.03deg] text-[#333333]' style={{ animationDelay: '0s' }}>무슨 템플릿을 사용할까요?</span>
            <br/>
            <span className='opacity-0 animate-fadeIn ml-10 font-Nanum font-regular text-lg rotate-[-0.03deg] text-[#333333] opacity-82' style={{ animationDelay: '0.5s' }}>
                화이트보드를 포함해 4개의 템플릿이 구현되어 있습니다.
            </span>
            <br />
            <span className='opacity-0 animate-fadeIn  ml-10 font-Nanum font-regular text-lg rotate-[-0.03deg] text-[#333333] opacity-82' style={{ animationDelay: '0.5s' }}>
                원하는 템플릿을 선택해 주세요.
            </span>
            
        </div>

        {/* 템플릿 선택박스 */}
        <div className='opacity-0 animate-fadeIn flex flex-row gap-12 justify-center mt-8' style={{ animationDelay: '1s' }}>

       
            <div className={!isSelected[1] ? 'flex flex-col items-center cursor-pointer  w-72 h-[380px] bg-white  rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px]'
            : 'flex flex-col items-center  w-72 h-[380px] bg-white  rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px] border border-[3.5px] border-main'    
        } onClick={() => select(1)}>
                <img src="/blankPage.png" alt="" className='w-56 h-64 ' />
                <div className='font-IBM  text-lg font-normal rotate-[-0.03deg]'>화이트보드</div>
                <div className='text-center mt-2 font-IBM text-sm rotate-[-0.03deg] text-[#666666]'>빈 공간에서 자유롭게<br/>아이디어를 구상해보세요.</div>
                <div className={!isSelected[1] ? 'invisible':'visible'}>
                 <img src="/check.svg" alt="" className='ml-56 w-10 h-10'/>
                </div>
            </div>

            <div className={!isSelected[2] ? 'flex flex-col items-center cursor-pointer w-72 h-[380px] bg-white  rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px]'
            : 'flex flex-col items-center  w-72 h-[380px] bg-white  rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px] border border-[3.5px] border-main'    
        } onClick={() => select(2)}>
            <img src="/bubbleChat.png" alt="" className='w-80 h-56 mt-4 ' />
                <div className='font-IBM  text-lg font-normal rotate-[-0.03deg] '>랜덤 버블</div>
                <div className='text-center mt-2 font-IBM text-sm rotate-[-0.03deg] text-[#666666]'>
                    원하는 주제를 중심으로 랜덤한 단어들을
                    <br/> 조합시켜 폭넓은 아이디어 구상을 하게 
                    <br/>도와주는 창의적인 기법입니다.
                    
                </div>
                <div className={!isSelected[2] ? 'invisible':'visible'}>
                 <img src="/check.svg" alt="" className='ml-56 w-10 h-10'/>
                </div>
            </div>

            <div className={!isSelected[3] ? 'flex flex-col items-center cursor-pointer  w-72 h-[380px] bg-white  rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px]'
            : 'flex flex-col items-center  w-72 h-[380px] bg-white  rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px] border border-[3.5px] border-main'    
        } onClick={() => select(3)}>
            <img src="/six thinking hats.png" alt="" className='w-64 h-40 mt-8 ' />
                <div className='font-IBM  text-lg font-normal rotate-[-0.03deg] mt-10'>6개의 생각하는 모자</div>
                <div className='text-center mt-2 font-IBM text-sm rotate-[-0.03deg] text-[#666666]'>
                6가지 색상의 모자를 활용하여
                    <br/>각 색상에 해당하는 사고 방식에 집중함으로써
                    <br/>아이디어를 창출하는 방법입니다. 
                </div>
                <div className={!isSelected[3] ? 'invisible':'visible'}>
                 <img src="/check.svg" alt="" className='ml-56 w-10 h-10'/>
                </div>
            </div>
            
            <div className={!isSelected[4] ? 'flex flex-col items-center cursor-pointer w-72 h-[380px] bg-white  rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px]'
            : 'flex flex-col items-center  w-72 h-[380px] bg-white  rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px] border border-[3.5px] border-main'    
        } onClick={() => select(4)}>
            <img src="/7Check.png" alt="" className='w-64 h-32 mt-16 ' />
                <div className='font-IBM  text-lg font-normal rotate-[-0.03deg] mt-10'>7 Check</div>
                <div className='text-center mt-2 font-IBM font-normal text-sm rotate-[-0.03deg] text-[#666666]'>
                아이디어 관련 7가지 체크포인트를
                    <br/>한가지씩 점검해보며
                    <br/>다양한 시각으로 접근하는 기법입니다.
                </div>
                <div className={!isSelected[4] ? 'invisible':'visible'}>
                 <img src="/check.svg" alt="" className='ml-56 w-10 h-10'/>
                </div>
            </div>
        </div>

        {/* 취소, 시작 버튼 */}
        <div className='flex flex-row mt-8 bg-main animate-fadeIn opacity-0' style={{ animationDelay: '1s' }}>

            {/* 취소 버튼 */}
            <div className='absolute left-28 bg-[#D6E8EF] rounded-md w-36 h-12 flex items-center justify-center cursor-pointer' onClick={()=>navigate(-1)}>
                <div className='font-IBM font-regular text-base text-[#6d6d6d] opacity-57 rotate-[-0.03deg]'>취소</div>
            </div>

            {/* 다음 버튼 */}
            <div className={isSelected.some(value => value === true)? 'absolute cursor-pointer right-28 bg-[#6AA2B8] rounded-md w-36 h-12 flex items-center justify-center': 
                'absolute invisible right-28 bg-[#6AA2B8] rounded-md w-36 h-12 flex items-center justify-center'} onClick={()=>navigate("/projectnameinput",{state : {index : selectedIndex, folderName : folderName}})}>
                <div className='font-IBM font-regular text-base ml-3 text-white  rotate-[-0.03deg]'>다음</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className=" ml-2 w-4 h-5 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
            </div>
        </div>
    </div>
    
   
  );
};

export default TemplateSelect;
