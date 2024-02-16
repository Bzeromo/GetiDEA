import api from "../../api";

const undoData = (
  projectId,
  userEmail,
  setTexts,
  setShapes,
  setLines,
  setImages,
  dragEnded,
  sendInfoToServer
) => {
  const undoEvent = () => {
    api
      .get(
        `/api/project/rollback?projectId=${projectId}&userEmail=${userEmail}`
      )
      .then((response) => {
        if (response.data) {
          const dataItems = response.data;

          Object.keys(dataItems).forEach((key) => {
            const item = dataItems[key];
            if (item) {
              switch (item.ty) {
                case "Text":
                  setTexts((prevTexts) => updateArray(prevTexts, item));
                  break;
                case "Rect":
                  setShapes((prevShapes) => updateArray(prevShapes, item));
                  break;
                case "Circle":
                  setShapes((prevShapes) => updateArray(prevShapes, item));
                  break;
                case "RegularPolygon":
                  setShapes((prevShapes) => updateArray(prevShapes, item));
                  break;
                case "Line":
                  setLines((prevLines) => updateArray(prevLines, item));
                  break;
                case "Dot":
                  setLines((prevLines) => updateArray(prevLines, item));
                  break;
                case "Arrow":
                  setLines((prevLines) => updateArray(prevLines, item));
                  break;
                case "Image":
                  setImages((prevImage) => updateArray(prevImage, item));
                  break;
                default:
                  // 기타 타입 처리
                  break;
              }
            } else {
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      }, []);
  };

  function updateArray(array, item) {
    const index = array.findIndex((element) => element.id === item.id);

    if (index >= 0) {
      // 기존 항목 업데이트
      return array.map((element, i) =>
        i === index ? { ...element, ...item } : element
      );
    } else {
      // 새 항목 추가
      return [...array, item]; // 수정됨: 객체를 배열에 직접 추가
    }
  }
  return { undoEvent, updateArray };
};

export default undoData;
