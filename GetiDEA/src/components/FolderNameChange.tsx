import React from 'react';
import { useState,useEffect,useRef,ChangeEvent, } from 'react';
import api from '../api';
import Swal from 'sweetalert2';

interface Folder {
  folderId: number;
  userEmail: string;
  folderName: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  closeModal: () => void;
  index : number,
  folders: string[];
  setFolders : React.Dispatch<React.SetStateAction<string[]>>;
  folderId : number;
}


const FolderNameChange: React.FC<ProfileModalProps> = ({ isOpen, closeModal ,folderId, index,folders,setFolders }) => {

    const [folderName, setFolderName] = useState<string>('');
    
    useEffect(() => {
      if (folders[index]) {
        setFolderName(folders[index]);
      }
      },[isOpen]); 

    const showAlert = async() => {
      await Swal.fire({
           text: '폴더 이름이 수정되었습니다.',
         icon: 'success',
         confirmButtonText: '확인'
       });
     };

    const nameChange = (e: ChangeEvent<HTMLInputElement>) => {

        const inputText = e.target.value;
        // 입력된 텍스트의 길이를 계산합니다. 한글 포함.
        const length = Array.from(inputText).length; // ES6 스프레드 연산자를 사용하여 문자열을 배열로 변환 후, length 계산

        if (length <= 8) {
            setFolderName(inputText);
        } 
    };

    // 이름 변경 api 요청
    const rename = async() => {
      
      try {
        const data = {
          "beforeFolderName" : folders[index],
          "newFolderName" : folderName
        }
        const response = await api.patch(`/api/folder/rename`,data);
        
           showAlert();
        } catch (error) {
            console.error('업로드 실패:', error);
            alert('폴더 생성 실패.');
        }
        const updatedFolders = [
            ...folders.slice(0, index), // 첫 번째 부분
             folderName ,                 // 삽입할 요소
            ...folders.slice(index+1)     // 두 번째 부분
          ];
        
        setFolders(updatedFolders);
        closeModal();
  };
    const close =()=> {
        closeModal();
        setFolderName('');
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
                    <div className="rounded-xl h-[280px]  rotate-[-0.03deg] bg-white dark:bg-gray-800 shadow-xl">
                        <div className="px-8 py-4">
                            

                            <div className=" mt-3 flex flex-row gap-56 items-center justify-center ">
                                <h2 className="text-2xl mt-2 text-center font-Nanum   font-bold rotate-[-0.03deg]">폴더 이름 수정
                                </h2>
                                <svg  onClick={close} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 ml-6  text-light_gray cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="flex flex-row mt-5 h-32">
                              
                                <div className='flex flex-col text-base font-Inter ml-10 py-8 h-full w-[70%] rotate-[-0.03deg]'>
                                    <input className={`w-full h-12 rounded-md border-2 px-3 bg-white border-line_gray`} type="text" value={folderName} onChange={nameChange} spellCheck={false}/>
                                </div>
                            </div>
                            <div className='flex flex-row justify-end gap-2 h-10 font-Nanum'>
                                <button className='bg-white rounded-md border-[1.5px] text-opacity-80 text-black text-sm font-regular border-line_gray w-16 h-8' onClick={close}>취소</button>       
                                <button className='bg-blue bg-opacity-80 rounded-md  text-opacity-80 text-white text-sm w-16 h-8' onClick={rename} >수정</button>
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

export default FolderNameChange;
