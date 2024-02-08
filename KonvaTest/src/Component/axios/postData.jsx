import axios from "axios";

const postData = (
  projectId,
  userEmail,
  preData,
  selectedId,
  setPreData,
  sendInfoToServer,
  wholeData,
  setWholeData,
  checkDelete,
  setCheckDelete,
  checkPost
) => {
  const PostSave = () => {
    console.log(projectId);
    axios
      .patch(
        `http://192.168.31.172:8080/api/project/merge?projectId=${projectId}`
      )
      .then((response) => {
        console.log(response);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PostData = (e) => {
    if (!e || !e.target) {
      console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
      return;
    }
    // console.log(JSON.stringify(preData) + "이건 post 내에서 확인용");
    const filteredPreData = preData.find(
      (item) => item.id === e.target.attrs.id
    );

    const postData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: e.target.attrs.id,
      preData: filteredPreData,
      newData: e.target.attrs,
    };
    axios
      .post("http://192.168.31.172:8080/api/project/change", postData)
      .then((response) => {
        // console.log(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PostDelete = () => {
    const filteredPreData = preData.find((item) => item.id === selectedId);

    const postData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: selectedId,
      preData: filteredPreData,
      newData: {},
    };

    axios.post("http://192.168.31.172:8080/api/project/change", postData)
    .then((response) => {
      // 삭제가 성공적으로 반영되었을 때 상태 업데이트
      console.log(response);
      setPreData((prevData) => {
        const newData = prevData.filter((item) => item.id !== selectedId);
        console.log("Updated data:", newData);
        return newData; // 필터링된 새 데이터로 상태를 업데이트
      });
      checkPost();
      console.log(checkDelete)
    })
    .catch((error) => {
      console.log(error);
      // 오류 발생 시 실행할 코드
    })
    .finally(() => {
      console.log(checkDelete); // 이 로그는 상태가 비동기적으로 업데이트되므로, 업데이트 이전의 값을 출력할 수 있습니다.
    });
    
  };

  return {
    PostData,
    PostSave,
    PostDelete,
  };
};

export default postData;
