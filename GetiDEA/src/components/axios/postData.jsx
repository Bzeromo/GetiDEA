import React, { useState, useRef, useEffect, useCallback } from "react";
import api from "../../api";

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
  checkPost,
  drawingList,
  deleteSelected,
  count,
  setCount,
  layerRef,
) => {
  const PostSave = () => {
    api
      .patch(`/api/project/merge?projectId=${projectId}`)
      .then((response) => {
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
    api
      .post("/api/project/change", postData)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PostDrawing = () => {
    const postData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: selectedId,
      preData: {},
      newData: drawingList,
    }
  };

  const PostPaste = (e) => {
    const postData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: selectedId,
      preData: {},
      newData: e.target.attrs,
    };
    api
    .post("/api/project/change", postData)
    .then((response) => {
    })
    .catce((error) =>{
    })
  }

  const PostDelete = () => {
    const filteredPreData = preData.find((item) => item.id === selectedId);

    const postData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: selectedId,
      preData: filteredPreData,
      newData: {},
    };

    api
      .post("/api/project/change", postData)
      .then((response) => {
        // 삭제가 성공적으로 반영되었을 때 상태 업데이트
        setPreData((prevData) => {
          const newData = prevData.filter((item) => item.id !== selectedId);
          return newData; // 필터링된 새 데이터로 상태를 업데이트
        });

      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
      });
  };

  return {
    PostData,
    PostSave,
    PostDelete,
    PostDrawing,
  };
};

export default postData;
