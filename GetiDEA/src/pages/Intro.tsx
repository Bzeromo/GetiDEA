// App.tsx
import React from 'react';
import { useEffect, useState } from 'react';
import LoginModal from '../components/LoginModal';

interface CarouselImageProps {
  url: string;
  alt: string;
  title : string;
  content : string;
}

const Intro: React.FC = () => {
  

    const explanation: CarouselImageProps[] = [
      { url: '/intro1.png', alt: 'Image 1', 
      title: '실시간 협업 보드\n 서비스', 
      content: '• 실시간 동시 보드 작업을 통해 언제 어디서나 창의적인 협업이 가능합니다.\n • 모든 팀원이 동시에 아이디어를 스케치하고, 공유할 수 있습니다.'  },
      
      { url: '/intro2.png', alt: 'Image 2' , 
      title: '그리기 도구\n 서비스', 
      content: '• 다양한 도형, 선 및 펜 기능이 구현되어 있습니다.\n • 텍스트를 입력할 수 있는 메모지를 사용해보세요.\n• 아이디어를 즉각적으로 시각화하고 공유하세요.'},
      
      { url: '/intro31.png', alt: 'Image 4', 
      title: '유용한 아이디어\n템플릿 제공', 
      content: '• 창의력을 자극하는 다양한 아이디어 템플릿들을 제공합니다.\n • 6개의 생각하는 모자, 7 CHECK 기법 등을 경험해보세요.' },

      { url: '/intro4.png', alt: 'Image 1', 
        title: '실시간 온라인\n화상 회의 ', 
        content: '• 실시간 화상 채팅 및 화면 공유 서비스를 이용하실 수 있습니다.\n • 음성 채팅 및 문자 채팅 기능 또한 구현되어 있습니다.' },
      
      
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isSelected, setIsSelected] = useState<boolean[]>( [true,false,false,false]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // 소개 페이지 탭 선택 함수
    const select = (idx: number): void => {
      const arr: boolean[] = Array(4).fill(false);
      arr[idx] = true;
      setIsSelected(arr);
    };

    const selectTab = (idx: number): void => {
      setActiveIndex(idx);
      select(idx);
    };

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex(prevActiveIndex => {
          const nextIndex = (prevActiveIndex + 1) % explanation.length; // 다음 인덱스 계산
    
          // isSelected 상태 업데이트
          const newIsSelected = Array(explanation.length).fill(false);
          newIsSelected[nextIndex] = true;
          setIsSelected(newIsSelected);
    
          return nextIndex; // activeIndex 업데이트
        });
      }, 3000); // 3초마다 실행
    
      return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    }, [explanation.length]);
    
    // 로그인 창 띄우는 함수
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

  return (
    <div className=' h-screen pt-10'>
      <LoginModal isOpen={isModalOpen} closeModal={closeModal}></LoginModal>

      <div className='h-[90%] bg-white '>
        <div className='flex flex-row  h-[95%]'>
          <div className=' w-[50%] pl-24 '>

            <div className='flex flex-row mt-6  items-center'>
              {/* 로고 */}
              <div className=" flex justify-center items-center">
                <img src="/logo.svg" alt="" className="object-cover h-12 w-12 "/>
              </div>

              {/* 로고 이름 */}
              <div className="text-[28px] text-center pl-3 font-SCoreDream font-bold rotate-[-0.03deg]">
                Get iDEA
              </div>
            </div>
           

            {/* 기능 제목 */}
            <div style={{ whiteSpace: 'pre-line' }} className='text-7xl rotate-[-0.03deg] text-main mt-24  font-black animate-slide-down duration-300' key={explanation[activeIndex].title}>{explanation[activeIndex].title}</div>

            {/* 기능 설명 */}
            <div style={{ whiteSpace: 'pre-line' }} className='text-lg rotate-[-0.03deg] text-main font-regular mt-16 font-Nanum  animate-slide-down duration-300' key={explanation[activeIndex].content}>{explanation[activeIndex].content}</div>
            

             {/* 시작하기 */}
            <div className='absolute w-36 h-12 top-[550px] cursor-pointer rotate-[-0.03deg] bg-main rounded-lg justify-center flex items-center font-SCoreDream font-medium text-xl text-white' onClick={openModal}>시작하기</div>

            </div>

          {/* 이미지 */}
          <div className='flex justify-center items-center cursor-pointer w-[45%]  '>
            <img key={explanation[activeIndex].url} src={explanation[activeIndex].url} alt={explanation[activeIndex].alt} className="  animate-slide-down duration-100" />
          </div>
          
          
        </div>
        <div className='h-16 mt-5 flex justify-center'>
        <button onClick={()=>{selectTab(0)}} className={!isSelected[0]?"w-3 h-3 mt-3  absolute left-[680px] bg-gray-200 rounded-full opacity-60 bg-main" :
           "w-5 h-5 mt-2  absolute left-[675px] border-[5px] border-[#225154] rounded-full opacity-60 bg-white"}></button>
          <button onClick={()=>{selectTab(1)}} className={!isSelected[1]?"w-3 h-3 mt-3  absolute left-[720px] bg-gray-200 rounded-full opacity-60 bg-main" :
           "w-5 h-5 mt-2  absolute left-[715px] border-[5px] border-[#225154] rounded-full opacity-60 bg-white"}></button>
          <button onClick={()=>{selectTab(2)}} className={!isSelected[2]?"w-3 h-3 mt-3  absolute left-[760px] bg-gray-200 rounded-full opacity-60 bg-main" :
           "w-5 h-5 mt-2  absolute left-[755px] border-[5px] border-[#225154] rounded-full opacity-60 bg-white"}></button>
          <button onClick={()=>{selectTab(3)}} className={!isSelected[3]?"w-3 h-3 mt-3  absolute left-[800px] bg-gray-200 rounded-full opacity-60 bg-main" :
           "w-5 h-5 mt-2  absolute left-[795px] border-[5px]  border-[#225154] rounded-full opacity-60 bg-white"}></button>
        </div>
      
      </div>
    </div>
    // <div className="flex h-screen justify-center items-center bg-main">
    //     <button className='text-2xl font-bold' onClick={openModal}>로그인</button>
    //     <LoginModal isOpen={isModalOpen} closeModal={closeModal}></LoginModal>
    // </div>
  );
};

export default Intro;
