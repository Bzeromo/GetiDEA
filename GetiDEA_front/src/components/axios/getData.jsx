import axios from "axios";

const getData = (projectId, setTexts, setShapes, setLines, setImages) => {
  const getProjectData = () => {
    axios
      .get(`http://192.168.31.172:8080/api/project/open?projectId=${projectId}`)
      .then((response) => {
        if (response.data && response.data.data) {
          const dataItems = response.data.data;

          console.log(response.data.data);

          Object.keys(dataItems).forEach((key) => {
            const item = dataItems[key];

            console.log(key)
            console.log(item.ty + "item 보기")

            switch (item.ty) {
              case "Text":
                console.log(`text item: `, JSON.stringify(item, key));
                setTexts((prevTexts) => updateArray(prevTexts, item, key));

                break;
              case "Rect":
                console.log(JSON.stringify(item, key) + "Rect?");
                setShapes((prevShapes) => updateArray(prevShapes, item, key));
                break;
              case "Circle":
                console.log(JSON.stringify(item, key) + "Circle?");
                setShapes((prevShapes) => updateArray(prevShapes, item, key));
                break;
              case "RegularPolygon":
                console.log(
                  `RegularPolygon item with defaults: `,
                  JSON.stringify(item)
                );
                setShapes((prevShapes) =>
                  updateArray(prevShapes, item, key)
                );
                break;
              case "Line":
                console.log(`Line item: `, JSON.stringify(item, key));
                setLines((prevLines) => updateArray(prevLines, item, key));
                break;
              case "Dot":
                console.log(`dot item: `, JSON.stringify(item, key));
                setLines((prevLines) => updateArray(prevLines, item, key));
                break;
              case "Arrow":
                console.log(`arrow item: `, JSON.stringify(item, key));
                setLines((prevLines) => updateArray(prevLines, item, key));
                break;
              case "Image":
                setImages((prevImage) => updateArray(prevImage, item, key));
                console.log(`img item: `, JSON.stringify(item, key));

                break;
              default:
                // 기타 타입 처리
                break;
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function updateArray(array, item, key) {
    const index = array.findIndex((element) => element.id === key);

    if (index >= 0) {
      // 기존 항목 업데이트
      return array.map((element, i) =>
        i === index ? { ...element, ...item } : element
      );
    } else {
      // 새 항목 추가
      return [...array, { id: key, ...item }];
    }
  }
  return {
    getProjectData,
    updateArray,
  };
};

export default getData;
