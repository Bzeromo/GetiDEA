import axios from "axios";

const postData = (projectId, userEmail) => {
  const PostSave = () => {
    console.log(projectId)
    axios
      .post(`http://192.168.31.172:8080/api/project/${projectId}`)
      .then((response) => {
        console.log(response);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const PostText = (e) => {
    if (!e || !e.target) {
      console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
      return;
    }
    const postData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: e.target.attrs.id,
      preData: {},
      newData: {
        id: e.target.attrs.id,
        text: e.target.attrs.text,
        x: e.target.attrs.x,
        y: e.target.attrs.y,
        ty: e.target.attrs.ty,
        fontSize: e.target.attrs.fontSize,
        draggable: e.target.attrs.draggable,
        fill: e.target.attrs.fill,
        rotation: e.target.attrs.rotation,
        scaleX: e.target.attrs.scaleX,
        scaleY: e.target.attrs.scaleY,
        offsetX: e.target.attrs.offsetX,
        offsetY: e.target.attrs.offsetY,
        skewX: e.target.attrs.skewX,
        skewY: e.target.attrs.skewY,
      },
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

  const PostRect = (e) => {
    if (!e || !e.target) {
      console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
      return;
    }
    const postData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: e.target.attrs.id,
      preData: {},
      newData: {
        id: e.target.attrs.id,
        type: e.target.attrs.type,
        stroke: e.target.attrs.stroke,
        x: e.target.attrs.x,
        y: e.target.attrs.y,
        side: e.target.attrs.side,
        radius: e.target.attrs.radius,
        fill: e.target.attrs.fill,
        ty: e.target.attrs.ty,
        draggable: e.target.attrs.draggable,
        rotation: e.target.attrs.rotation,
        scaleX: e.target.attrs.scaleX,
        scaleY: e.target.attrs.scaleY,
        offsetX: e.target.attrs.offsetX,
        offsetY: e.target.attrs.offsetY,
        skewX: e.target.attrs.skewX,
        skewY: e.target.attrs.skewY,
      },
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

  const PostCircle = (e) => {
    if (!e || !e.target) {
      console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
      return;
    }
    const postData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: e.target.attrs.id,
      preData: {},
      newData: {
        id: e.target.attrs.id,
        type: e.target.attrs.type,
        stroke: e.target.attrs.stroke,
        x: e.target.attrs.x,
        y: e.target.attrs.y,
        radius: e.target.attrs.radius,
        fill: e.target.attrs.fill,
        ty: e.target.attrs.ty,
        draggable: e.target.attrs.draggable,
        rotation: e.target.attrs.rotation,
        scaleX: e.target.attrs.scaleX,
        scaleY: e.target.attrs.scaleY,
        offsetX: e.target.attrs.offsetX,
        offsetY: e.target.attrs.offsetY,
        skewX: e.target.attrs.skewX,
        skewY: e.target.attrs.skewY,
      },
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

  const PostTriangle = (e) => {
    if (!e || !e.target) {
      console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
      return;
    }
    const postData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: e.target.attrs.id,
      preData: {},
      newData: {
        id: e.target.attrs.id,
        x: e.target.attrs.x,
        y: e.target.attrs.y,
        type: e.target.attrs.type,
        stroke: e.target.attrs.stroke,
        side: e.target.attrs.side,
        fill: e.target.attrs.fill,
        ty: e.target.attrs.ty,
        draggable: e.target.attrs.draggable,
        rotation: e.target.attrs.rotation,
        scaleX: e.target.attrs.scaleX,
        scaleY: e.target.attrs.scaleY,
        offsetX: e.target.attrs.offsetX,
        offsetY: e.target.attrs.offsetY,
        skewX: e.target.attrs.skewX,
        skewY: e.target.attrs.skewY,
      },
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

  const PostLine = (e) => {
    if (!e || !e.target) {
      console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
      return;
    }
    const postData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: e.target.attrs.id,
      preData: {},
      newData: {
        id: e.target.attrs.id,
        points: e.target.attrs.points,
        stroke: e.target.attrs.stroke,
        strokeWidth: e.target.attrs.strokeWidth,
        rotation: e.target.attrs.rotation,
        lineCap: e.target.attrs.lineCap,
        lineJoin: e.target.attrs.lineJoin,
        fill: e.target.attrs.fill,
        ty: e.target.attrs.ty,
        x: e.target.attrs.x,
        y: e.target.attrs.y,
        draggable: e.target.attrs.draggable,
        scaleX: e.target.attrs.scaleX,
        scaleY: e.target.attrs.scaleY,
        offsetX: e.target.attrs.offsetX,
        offsetY: e.target.attrs.offsetY,
        skewX: e.target.attrs.skewX,
        skewY: e.target.attrs.skewY,
      },
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
  const PostDot = (e) => {
    if (!e || !e.target) {
      console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
      return;
    }
    const postData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: e.target.attrs.id,
      preData: {},
      newData: {
        dash: e.target.attrs.dash,
        id: e.target.attrs.id,
        points: e.target.attrs.points,
        stroke: e.target.attrs.stroke,
        strokeWidth: e.target.attrs.strokeWidth,
        rotation: e.target.attrs.rotation,
        lineCap: e.target.attrs.lineCap,
        lineJoin: e.target.attrs.lineJoin,
        fill: e.target.attrs.fill,
        ty: e.target.attrs.ty,
        x: e.target.attrs.x,
        y: e.target.attrs.y,
        draggable: e.target.attrs.draggable,
        scaleX: e.target.attrs.scaleX,
        scaleY: e.target.attrs.scaleY,
        offsetX: e.target.attrs.offsetX,
        offsetY: e.target.attrs.offsetY,
        skewX: e.target.attrs.skewX,
        skewY: e.target.attrs.skewY,
      },
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
  const PostArrow = (e) => {
    if (!e || !e.target) {
      console.error("이벤트 또는 대상 요소가 정의되지 않았습니다.");
      return;
    }
    const postData = {
      projectId: projectId,
      userEmail: userEmail,
      propId: e.target.attrs.id,
      preData: {},
      newData: {
        id: e.target.attrs.id,
        points: e.target.attrs.points,
        pointerLength: e.target.attrs.pointerLength,
        stroke: e.target.attrs.stroke,
        strokeWidth: e.target.attrs.strokeWidth,
        rotation: e.target.attrs.rotation,
        lineCap: e.target.attrs.lineCap,
        lineJoin: e.target.attrs.lineJoin,
        fill: e.target.attrs.fill,
        ty: e.target.attrs.ty,
        x: e.target.attrs.x,
        y: e.target.attrs.y,
        draggable: e.target.attrs.draggable,
        scaleX: e.target.attrs.scaleX,
        scaleY: e.target.attrs.scaleY,
        offsetX: e.target.attrs.offsetX,
        offsetY: e.target.attrs.offsetY,
        skewX: e.target.attrs.skewX,
        skewY: e.target.attrs.skewY,
      },
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

  return {
    PostRect,
    PostCircle,
    PostTriangle,
    PostLine,
    PostDot,
    PostArrow,
    PostText,
    PostSave,
  };
};

export default postData;
