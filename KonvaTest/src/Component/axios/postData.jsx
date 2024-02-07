import axios from "axios";

const postData = (projectId, userEmail) => {
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
    const postData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: e.target.attrs.id,
      preData: {},
      newData: e.target.attrs,
    };
    axios
      .post("http://192.168.31.172:8080/api/project/changes", postData)
      .then((response) => {
        // console.log(response);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const PostText = (e) => {
  //   if (!e || !e.target) {
  //     console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
  //     return;
  //   }
  //   const postData = {
  //     projectId: projectId,
  //     userEmail: userEmail,
  //     propId: e.target.attrs.id,
  //     preData: {},
  //     newData: e.target.attrs,
  //   };
  //   axios
  //     .post("http://192.168.31.172:8080/api/project/changes", postData)
  //     .then((response) => {
  //       // console.log(response);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const PostRect = (e) => {
  //   if (!e || !e.target) {
  //     console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
  //     return;
  //   }
  //   console.log(projectId + "프로젝트 아이디야");
  //   console.log(userEmail + "이메일 확인 중이에요");
  //   const postData = {
  //     projectId: projectId,
  //     userEmail: userEmail,
  //     propId: e.target.attrs.id,
  //     preData: {},
  //     newData: e.target.attrs,
  //   };
  //   axios
  //     .post("http://192.168.31.172:8080/api/project/changes", postData)

  //     .then((response) => {
  //       console.log(response.data + "check");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const PostCircle = (e) => {
  //   if (!e || !e.target) {
  //     console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
  //     return;
  //   }
  //   const postData = {
  //     projectId: projectId,
  //     userEmail: userEmail,
  //     propId: e.target.attrs.id,
  //     preData: {},
  //     newData: e.target.attrs,
  //   };
  //   axios
  //     .post("http://192.168.31.172:8080/api/project/changes", postData)

  //     .then((response) => {
  //       // console.log(response);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const PostTriangle = (e) => {
  //   if (!e || !e.target) {
  //     console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
  //     return;
  //   }
  //   const postData = {
  //     projectId: projectId,
  //     userEmail: userEmail,
  //     propId: e.target.attrs.id,
  //     preData: {},
  //     newData: e.target.attrs,
  //   };
  //   axios
  //     .post("http://192.168.31.172:8080/api/project/changes", postData)

  //     .then((response) => {
  //       console.log(response);
  //       console.log(response.config.data + "test 해볼래요 x, y 받아오기");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const PostLine = (e) => {
  //   if (!e || !e.target) {
  //     console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
  //     return;
  //   }
  //   const postData = {
  //     projectId: projectId,
  //     userEmail: userEmail,
  //     propId: e.target.attrs.id,
  //     preData: {},
  //     newData: e.target.attrs,
  //   };
  //   axios
  //     .post("http://192.168.31.172:8080/api/project/changes", postData)

  //     .then((response) => {
  //       // console.log(response);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // const PostDot = (e) => {
  //   if (!e || !e.target) {
  //     console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
  //     return;
  //   }
  //   const postData = {
  //     projectId: projectId,
  //     userEmail: userEmail,
  //     propId: e.target.attrs.id,
  //     preData: {},
  //     newData: e.target.attrs,
  //   };
  //   axios
  //     .post("http://192.168.31.172:8080/api/project/changes", postData)

  //     .then((response) => {
  //       // console.log(response);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // const PostArrow = (e) => {
  //   if (!e || !e.target) {
  //     console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
  //     return;
  //   }
  //   const postData = {
  //     projectId: projectId,
  //     userEmail: userEmail,
  //     propId: e.target.attrs.id,
  //     preData: {},
  //     newData: e.target.attrs,
  //   };
  //   axios
  //     .post("http://192.168.31.172:8080/api/project/changes", postData)

  //     .then((response) => {
  //       // console.log(response);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return {
    PostData,
    PostSave,
  };
};

export default postData;
