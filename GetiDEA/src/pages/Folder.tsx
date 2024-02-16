  // App.tsx
  import React from 'react';
  import { useState ,useEffect, useRef} from 'react';
  import { Link, useLocation,useNavigate  } from 'react-router-dom';
  import Topbar from '../components/TopBar';
  import api from '../api';
  import Swal from 'sweetalert2';
  import moment from 'moment';
import ProjectModal from '../components/ProjectModal';

  interface project {
    projectId: number;
    templateId: string;
    projectName: string;
    thumbnail: string;
    lastUpdateTime: Date;
  }

  

  const Folder: React.FC = () => {
      
      const [isSelected, setIsSelected] = useState<boolean[]>([]);
      const [dropdownsOpen, setDropdownsOpen] = useState<boolean[]>([]);
      const [folderName, setFolderName] = useState<string|null>('');
      const [projects, setProjects] = useState<project[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [projectId, setProjectId] = useState<number>();
      const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
      const [isOpen, setIsOpen] = useState(false);


      const location = useLocation();

      
      const navigate = useNavigate();

      const DeleteAlert = async() => {
        const result = await Swal.fire({
          title: '정말 삭제하시겠습니까?',
          icon: 'warning',
          showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
          confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
          cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
          confirmButtonText: '네', // confirm 버튼 텍스트 지정
          cancelButtonText: '아니요', // cancel 버튼 텍스트 지정
          reverseButtons: true, // 버튼 순서 거꾸로
        })
        
          if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
            deleteFolder();
            await Swal.fire('삭제되었습니다.','' ,'success');
            navigate("/ ");
            window.location.reload();
        }
        }
    
        const DeleteProjectAlert = async(projectId:number) => {
          const result = await Swal.fire({
            title: '정말 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
            cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
            confirmButtonText: '네', // confirm 버튼 텍스트 지정
            cancelButtonText: '아니요', // cancel 버튼 텍스트 지정
            reverseButtons: true, // 버튼 순서 거꾸로
          })
          
            if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
              deleteProject(projectId);
              await Swal.fire('삭제되었습니다.','' ,'success');
              window.location.reload();
          }
        }
  

      // 북마크 관련 함수
      const select = (idx: number, projectId:number): void => {
        const arr = [...isSelected]; // 기존 배열의 상태를 복사
          arr[idx] = !arr[idx];
          setIsSelected(arr);
          bookmark(projectId);
        };
        
      const dropdownRef = useRef<HTMLDivElement>(null);
    
      // 프로젝트 메뉴 드롭다운 함수
      const menuDropdown = (index: number) => {
        setDropdownsOpen(prevState => 
          prevState.map((item, idx) => idx === index ? !item : item)
        );
      };
    
    
    
      // 외부 클릭 처리 함수
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setDropdownsOpen(new Array(dropdownsOpen.length).fill(false));
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, [isOpen,dropdownsOpen]); // 종속성 배열에 isOpen 추가
     
      const containerRef = useRef<HTMLDivElement>(null);

      //폴더 삭제 함수
      const deleteFolder =async() => {

        try {
          const response = await api.delete(`/api/folder/remove/${folderName}`);

          } catch (error) {
              console.error('업로드 실패:', folderName);
              alert('폴더 생성 실패.');
          }
      };

      // 프로젝트 열기
      const openProject = async (templateId:string,projectId:number, projectName:string) => {

        localStorage.setItem('projectId', projectId.toString());
        localStorage.setItem('projectName', projectName);

        if(templateId==="whiteboard"){
          navigate("/board", {state : {projectId : projectId}})
        }
        else if(templateId==="bubbleChat"){
          navigate("/board/template1", {state : {projectId : projectId}})
        }
        else if(templateId==="sixhat"){
          navigate("/board/template2", {state : {projectId : projectId}})
        }
        else if(templateId==="7check"){
          navigate("/board/template3", {state : {projectId : projectId}})
        }
      
      };


      // 프로젝트 불러오기

      useEffect(() => {
        if (location.state && location.state.folderName) {
          const newFolderName = location.state.folderName as string; // location.state.folderName의 타입을 string으로 명시적 형변환
          setFolderName(newFolderName);
          fetchProjects(newFolderName); // 상태 업데이트 직후 API 호출
        }
      }, [location.state]);

      const fetchProjects = async (currentFolderName: string) => {
        setIsLoading(true);
        try {
          const response = await api.get(`/api/project/folder?folderName=${currentFolderName}`);
          setProjects(response.data);
          setIsSelected(response.data.map((project: { bookmark: boolean; }) => project.bookmark));
          setDropdownsOpen(new Array(response.data.length).fill(false));
        } catch (error) {
          console.error('Error fetching data: ', error);
        } finally {
          setIsLoading(false);
        }
      };

      
      const bookmark = (projectId : number) =>{
        const bookmarking = async () => {
          try {
            const response = await api.put(`api/location/bookmark`,{
              "projectId" : projectId
            });

          } catch (error) {
            console.error('Error fetching data: ', error);
          }
        };
    
        bookmarking();
      }
    
      const deleteProject = (projectId : number) =>{
        const deleting = async () => {
          try {
            const response = await api.delete(`/api/project/delete/${projectId}`);

          } catch (error) {
            console.error('Error fetching data: ', error);
          }
        };
    
        deleting();
      }

      if (isLoading) {
        return <div>Loading...</div>; // 로딩 중인 경우 로딩 인디케이터를 표시
      }


      const openModal = (projectId:number) => {
        setIsOpen(false);
        setProjectId(projectId);
        setIsModalOpen(true);
      }
      const closeModal = () => setIsModalOpen(false);

    return (
      <div className="flex  min-h-screen  flex-col bg-gray-100">
        <ProjectModal isOpen={isModalOpen} closeModal={closeModal} projectId={projectId??0} ></ProjectModal>

        <Topbar/>
        <div className="flex  relative  ml-28">

          {/* 폴더 삭제버튼 */}
          <div className="flex relative">
        
          </div>  
        </div>
        

          <div ref={containerRef} className='flex flex-row mt-10 ml-28 font-Nanum rotate-[-0.03deg] font-semibold text-xl'>
              {/* 폴더 이름 */}
            {folderName}
            <svg onClick={DeleteAlert} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-[800px] hover:text-blue cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>

          </div>

          <div className=' flex flex-row flex-wrap gap-16 ml-32 mt-12'>

            {/* 새 프로젝트 생성 */}
            <Link to="/templateSelect" state={{folderName : folderName}} className='flex flex-col group justify-center items-center cursor-pointer duration-500 w-64 h-[300px] bg-[#B8D8DC] rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px] '>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 place-self-center mt-16 text-gray">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

                <span className='self-center mt-16 font-Nanum text-xl text-gray font-semibold rotate-[-0.03deg]'>새 프로젝트</span>
            </Link>

            {/* 작업 프로젝트 */}
            <>
            {
              Array.isArray(projects) && projects.map((item,index)=>(
                <div className='flex flex-col group  w-64 h-[300px] bg-white cursor-pointer  hover:bg-line_gray duration-700  rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_4px_15px_0px] '>
            
                  <div className='flex flex-row w-full'>
                      <svg onClick={()=>select(index, item.projectId)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={isSelected[index]?"w-6 h-6 ml-3 mt-3 self-start fill-main cursor-pointer text-main"
                          :"w-6 h-6 ml-3 mt-3 self-start invisible group-hover:visible hover:text-main cursor-pointer text-gray"}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                      </svg>

                    <svg  onClick={() => menuDropdown(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-44 mt-2 invisible group-hover:visible hover:text-main cursor-pointer  text-gray">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    {dropdownsOpen[index] && (
                    <div className="absolute ml-52  w-28 px-2 text-black mt-10 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" ref={dropdownRef}>
                      <div className="py-1">
                        <div onClick={()=>openModal(item.projectId)} className=" px-4 py-2 flex flex-row text-sm text-gray-700 hover:bg-gray-100 rotate-[-0.03deg]">
                          수정</div>
                        {/* <a href="/" className="flex flex-row px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rotate-[-0.03deg]">
                          이동</a> */}
                        <div onClick={()=>DeleteProjectAlert(item.projectId)}  className=" flex flex-row cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rotate-[-0.03deg]">
                          삭제</div>
                      </div>
                    </div>
                    )}
                  </div>

                  <img src={item.thumbnail} alt="" onClick={()=>openProject(item.templateId,item.projectId,item.projectName)} className='w-60 h-44 self-center object-scale-down roup-hover:text-gray' />
                  <span className='self-center mt-5 font-Nanum text-xl font-semibold rotate-[-0.03deg]'>{item.projectName}</span>
                  <span className='self-center mt-1 font-Nanum text-sm font-regular text-gray invisible group-hover:visible rotate-[-0.03deg]'>{moment(item.lastUpdateTime).format('YYYY.MM.DD HH:mm 수정')}</span>
                </div>
              ))
            }</>

              
            {/* 아래 빈 공간 */}
            <div className='w-full h-10'></div>
              
          </div>
        </div>
    );
  };

  export default Folder;
