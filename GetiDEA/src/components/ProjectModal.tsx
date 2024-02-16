import React from 'react';
import { useState,useEffect,useRef,ChangeEvent, } from 'react';
import api from '../api';
import Swal from 'sweetalert2';


interface ProfileModalProps {
  isOpen: boolean;
  closeModal: () => void;
  projectId : number;
}

interface Project {
  projectName: string;
  thumbnail: string; // API 응답의 오타가 의도된 것이라면 여기도 같게 유지
}



const ProjectModal: React.FC<ProfileModalProps> = ({ isOpen, closeModal,projectId}) => {

    const [projectName, setProjectName] = useState<string>('');
    const [thumbnail, setThumbnail] = useState<string>('');

    const showAlert = async() => {
     await Swal.fire({
          text: '프로젝트가 수정되었습니다.',
        icon: 'success',
        confirmButtonText: '확인'
      });
    };
  
    useEffect(() => {
        const fetchData = async () => {
        try {
          const response = await api.get<Project>(`/api/project/open?projectId=${projectId}`);
          setProjectName(response.data.projectName);
          setThumbnail(response.data.thumbnail); 
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
        };
        fetchData();
    }, [isOpen]);

    //프로젝트 이름 변경 관련
    const nameChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value;
        const length = Array.from(inputText).length;

        if (length <= 8) {
            setProjectName(inputText);
        } 
    };

    const nameChangeSave = async () =>{ 
      try {
   
        const response = await api.patch(`/api/project/rename`, {
            "projectId" : projectId,
            "newProjectName" : projectName
        });
            await showAlert();  
            closeModal();
            window.location.reload();
         
        } catch (error) {
            console.error('업로드 실패:', error);
            alert('파일 업로드 실패.');
        }
        
    }

    // 프로젝트 이미지 변경 관련
    const selectFile = useRef<HTMLInputElement>(null);
    
    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          
          reader.onloadend = async () => {
            setThumbnail(reader.result as string);
          };
          reader.readAsDataURL(file);

          const formData = new FormData();
         
          try {
            await api.post('/api/image/thumbnail',{
                "Image" : file,
                "projectId" : projectId
            });
            } catch (error) {
                alert('파일 업로드 실패.');
            }
          }
      };

      // 저장 버튼 클릭 시 유저 정보 변경
      const changeUserProfile =()=> {
        closeModal();
        
    }

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
                <div className="w-[500px] ">
                    <div className="rounded-xl h-[360px]  rotate-[-0.03deg] bg-white dark:bg-gray-800 shadow-xl">
                        <div className="px-8 py-4">
                            

                            <div className=" mt-3 flex flex-row gap-60 items-center justify-center ">
                                <h2 className="text-2xl mt-2 text-center font-Nanum  font-bold rotate-[-0.03deg]">프로젝트 수정
                                </h2>
                                <svg  onClick={closeModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 ml-6  text-light_gray cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="flex flex-row mt-7 h-52">
                                <div className='flex flex-col items-center  h-full w-[30%]'>
                                    
                                        <img src={thumbnail} alt="" className=' w-32 h-32 object-cover' />
                                    
                                    <div className='mt-3 w-40 text-center cursor-pointer text-sm font-Nanum font-regular text-opacity-80 text-black bg-white drop-shadow-md rounded-lg p-2 rotate-[-0.03deg]' onClick={() => {
                                        if (selectFile.current) {
                                            selectFile.current.click();
                                        }
                                        }}
                                        >
                                        <input  type = "file" accept = "image/*" 
                                            name="image"
                                            multiple
                                            hidden
                                            ref={selectFile}
                                            onChange={handleImageChange}
                                        />
                                        프로젝트 이미지 변경
                                    </div>
                                   
                                </div>
                                <div className='flex flex-col font-Inter ml-10 py-5 h-full w-[60%] rotate-[-0.03deg]'>
                                    <div className='mb-1'>프로젝트 이름</div>
                                    <input className='w-full h-12 rounded-md border-2 px-3 border-line_gray bg-white' type="text" value={projectName} onChange={nameChange} spellCheck={false}/>
                                </div>
                            </div>
                            <div className='flex flex-row justify-end gap-2 h-10 font-Nanum'>
                                <button className='bg-white rounded-md border-[1.5px] text-opacity-80 text-black text-sm font-regular border-line_gray w-16 h-8' onClick={closeModal}>취소</button>       
                                <button className='bg-blue bg-opacity-80 rounded-md  text-opacity-80 text-white text-sm w-16 h-8' onClick={nameChangeSave}>저장</button>
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

export default ProjectModal;
