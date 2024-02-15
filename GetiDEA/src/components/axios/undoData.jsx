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
        console.log(response);
        console.log(response.data);
        if (response.data) {
          const dataItems = response.data;

          console.log(response.data);

          Object.keys(dataItems).forEach((key) => {
            const item = dataItems[key];
            if (item) {
              switch (item.ty) {
                case "Text":
                  setTexts((prevTexts) => updateArray(prevTexts, item));
                  console.log(`text item: `, JSON.stringify(item, key));

                  break;
                case "Rect":
                  setShapes((prevShapes) => updateArray(prevShapes, item));
                  console.log(JSON.stringify(item, key) + "Rect?");
                  break;
                case "Circle":
                  setShapes((prevShapes) => updateArray(prevShapes, item));
                  console.log(JSON.stringify(item, key) + "Circle?");
                  break;
                case "RegularPolygon":
                  setShapes((prevShapes) => updateArray(prevShapes, item));
                  console.log(
                    `RegularPolygon item with defaults: `,
                    JSON.stringify(item)
                  );
                  break;
                case "Line":
                  setLines((prevLines) => updateArray(prevLines, item));
                  console.log(`Line item: `, JSON.stringify(item, key));
                  break;
                case "Dot":
                  setLines((prevLines) => updateArray(prevLines, item));
                  console.log(`dot item: `, JSON.stringify(item, key));
                  break;
                case "Arrow":
                  setLines((prevLines) => updateArray(prevLines, item));
                  console.log(`arrow item: `, JSON.stringify(item, key));
                  break;
                case "Image":
                  setImages((prevImage) => updateArray(prevImage, item));
                  console.log(`img item: `, JSON.stringify(item, key));
                  break;
                default:
                  // 기타 타입 처리
                  break;
              }
            } else {
              console.log("item이 없어요");
            }
          });
          console.log(dragEnded);
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
