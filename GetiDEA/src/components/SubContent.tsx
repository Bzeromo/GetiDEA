import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../api';

interface project {
  projectId: number;
  templateId: string;
  projectName: string;
  thumbnail: string;
  lastUpdateTime: Date;
}

const SubContent: React.FC = () => {

    const navigate = useNavigate();

    const [projects, setProjects] = useState<project[]>([]);


    useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(`/api/project/recent?limit=2`);
        setProjects(response.data); // userName 필드만 추출
        } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchProjects();
  }, []);

  const openProject = async (templateId:string,projectId:number,projectName:string) => {

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

  return (
    
    <div className="ml-24 mt-10 flex w-" style={{ width: '100%', height: '300px' }}>
     
        <div>
        <span className='inline-block font-Nanum text-xl font-semibold rotate-[-0.03deg]'>나의 최근 작업</span>
        {/* <a className='inline-block  ml-[540px] font-Nanum text-xl font-semibold text-main rotate-[-0.03deg]' href='/recent'>더보기</a> */}
        <div className='flex flex-row mt-5'>

        {/* 새 프로젝트 생성 */}
          <Link to="/templateSelect" state={{folderName : ""}} className='hover:scale-105 duration-500 w-56 h-56 mr-8 bg-[#B8D8DC]  opacity-60 drop-shadow-lg flex justify-center flex-col items-center' >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 absolute top-20">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
            <span className='inline-block font-Nanum text-xl font-semibold rotate-[-0.03deg] mt-32 '>새 프로젝트</span>
          </Link>

        {/* 최근 프로젝트 2개 */}
        <>
  {projects.length > 0 ? (
    projects.map((item) => (
      <div className='cursor-pointer hover:scale-105 duration-500 w-56 h-56 mr-8 bg-white drop-shadow-lg flex justify-center flex-col items-center'
            onClick={()=>openProject(item.templateId,item.projectId,item.projectName)} >
        <img src={item.thumbnail} alt="" className='w-48 h-32 object-scale-down' />
        <span className='inline-block fixed bottom-2 font-Nanum text-lg font-semibold rotate-[-0.03deg]'>{item.projectName}</span>
      </div>
    ))
  ) : (
    <div></div>
  )}
</>
      </div>
      </div>
      
    
  </div>
  
  );
};

export default SubContent;
