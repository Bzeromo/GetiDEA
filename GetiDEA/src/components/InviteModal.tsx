import React, { useEffect, useState, ChangeEvent } from 'react';
import api from '../api';
import Swal from 'sweetalert2';

interface InviteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  projectId : number;
}

interface User {
    userName: string;
    userEmail: string; // API 응답의 오타가 의도된 것이라면 여기도 같게 유지
    profileImage: string;
  }

  type UserResponse = User[];

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, closeModal ,projectId }) => {

  const [users, setUsers] = useState<User[]>([]);  
  const [input,setInput] = useState<string>('');

  const showAlert = async() => {
    await Swal.fire({
         text: '초대되었습니다.',
       icon: 'success',
       confirmButtonText: '확인'
     });
   };

   const failAlert = async() => {
    await Swal.fire({
         text: '이미 초대한 유저입니다.',
       icon: 'error',
       confirmButtonText: '확인'
     });
   };

  useEffect(() => {
   
  
  }, [isOpen]);
 
//   입력한 이메일로 사용자 검색
  const searchUsers = async () => {
    try {
        const response = await api.get<UserResponse>(`/api/user/search?userEmail=${input}`);
        setUsers(response.data);

    } catch (error) {
        console.error('Error fetching data: ', error);
    }
    };
  
    const nameChange = async (e: ChangeEvent<HTMLInputElement>) => {
       setInput(e.target.value);
      };

    //   사용자 초대
      const inviteMember = async (userEmail:string) => {
        try {
            const response = await api.post(`/api/location/invite`,{
                "userEmail": userEmail,
                "projectId": projectId
            });
            showAlert();
        } catch (error) {
            failAlert();
            console.error('Error fetching data: ', error);
        }
        };
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
                    <div className="rounded-xl h-[600px] bg-white dark:bg-gray-800 shadow-xl">
                        <div className="px-8 py-4 h-full ">
                            <svg  onClick={closeModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 ml-80 text-light_gray cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                            <div className="space-y-2 mt-3">
                                <h2 className="mb-1 text-2xl text-center text-Nanum  font-regular rotate-[-0.03deg]">초대하기
                                </h2>
                                <h2 className="mb-8 text-sm text-center text-Nanum font-light rotate-[-0.03deg]">같이 프로젝트에 참여할 팀원들을 초대하세요
                                </h2>
                            </div>

                            {/* 팀원 검색창 */}
                            <div className="relative mt-6 max-h-24 ">
                                <input
                                    className="appearance-none border-2 pl-10 border-light_gray hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-black text-base font-regular leading-tight focus:outline-none  focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    value={input}
                                    autoComplete='off'
                                    onChange={nameChange}
                                    placeholder="이메일을 입력해주세요"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault(); // 폼 제출을 방지
                                          searchUsers();
                      
                                        }
                                      }}
                                />
                             

                                <div className="absolute left-0 inset-y-0 flex items-center">
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 ml-3 text-light_gray hover:text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                    </svg>
                                </div>
                            </div>

                            {/* 이메일로 검색 결과 목록 */}
                            <div className='overflow-scroll h-[400px]' >
                                <>
                                {users&&users.map((item,index)=>(
                                    <div className=' h-20 mt-3 flex flex-row items-center'>
                                        <img src={item.profileImage} className='w-12 h-12 rounded-full object-scale-down' alt="" />
                                        <div className='flex flex-col ml-3 w-52'>
                                            <span className='text-lg font-bold font-Nanum rotate-[-0.03deg]'>{item.userName}</span>
                                            <span className='text-sm text-gray font-Nanum font-regular rotate-[-0.03deg]'>{item.userEmail}</span>
                                        </div>
                                            <button onClick={()=>inviteMember(item.userEmail)} className=' bg-main font-Nanum font-regular text-white w-16 h-8 rounded-lg '>초대</button>
                                    </div>
                                ))}
                                </>
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
