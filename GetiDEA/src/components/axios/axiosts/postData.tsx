import api from "../../../api";

interface EventTargetAttrs {
  id: string;
  text?: string;
  x: number;
  y: number;
  ty: string;
  fontSize?: number;
  draggable: boolean;
  fill: string;
  rotation: number;
  scaleX: number;
  scaleY: number;
  offsetX: number;
  offsetY: number;
  skewX: number;
  skewY: number;
  type?: string;
  stroke?: string;
  side?: number;
  radius?: number;
  points?: number[];
  strokeWidth?: number;
  lineCap?: string;
  lineJoin?: string;
  pointerLength?: number;
  dash?: number[];
}

interface PostData {
  projectId: number;
  userEmail: string;
  propId: string;
  preData: {};
  newData: EventTargetAttrs;
}

const postData = (projectId: number, userEmail: string) => {
  const PostSave = () => {
    api
      .patch(`/api/project/merge?projectId=${projectId}`)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PostData = (e: { target: { attrs: EventTargetAttrs } }) => {
    if (!e || !e.target) {
      console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
      return;
    }
    const postData: PostData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: e.target.attrs.id,
      preData: {},
      newData: e.target.attrs,
    };
    api
      .post("/api/project/changes", postData)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {

    PostData,
    PostSave,
  };
};

export default postData;
