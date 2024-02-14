import React, { useEffect } from 'react';

interface InviteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  projectId : number;
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, closeModal ,projectId }) => {

 
  useEffect(() => {
   
    console.log(`프로젝트 아이디 : ${projectId}`)
  
  }, [isOpen]);
 
  

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px'
      }}>
        <div className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
            <div className="relative container m-auto px-6">
                <div className="w-[400px] ">
                    <div className="rounded-xl h-96 bg-white dark:bg-gray-800 shadow-xl">
                        <div className="px-8 py-4">
                            <svg  onClick={closeModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 ml-80 text-light_gray cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                            <div className="space-y-4 mt-5">
                                <h2 className="mb-8 text-2xl text-center text-Nanum dark:text-white font-light rotate-[-0.03deg]">초대하기
                                </h2>
                            </div>
                            
                      
                    </div>
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
