import axios from "axios";

const undoData = (
  projectId,
  userEmail,
  setTexts,
  setShapes,
  setLines,
  setImages,
  dragEnded,
  sendInfoToServer,
) => {
  const undoEvent = () => {
    axios
      .get(
        `http://localhost:8080/api/project/rollback?projectId=${projectId}&userEmail=${userEmail}`
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        if (response.data) {
          const dataItems = response.data;

          console.log(response.data);

          Object.keys(dataItems).forEach((key) => {
            const item = dataItems[key];

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
          });

          // dragEnded = true;
          // sendInfoToServer();
          console.log(dragEnded)
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
      return [...array, ...item];
    }
  }

  return { undoEvent, updateArray };
};

export default undoData;
