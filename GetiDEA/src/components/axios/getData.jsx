import api from "../../api";

const getData = (
  projectId,
  setTexts,
  setShapes,
  setLines,
  setImages,
  setWholeData
) => {
  const getProjectData = () => {
    api
      .get(`/api/project/open?projectId=${projectId}`)
      .then((response) => {
        if (response.data && response.data.data) {
          const dataItems = response.data.data;

          Object.keys(dataItems).forEach((key) => {
            const item = dataItems[key];

            switch (item.ty) {
              case "Text":
                setTexts((prevTexts) => updateArray(prevTexts, item, key));
                setWholeData((prevDatas) => updateArray(prevDatas, item, key));
                break;
              case "Rect":
                setShapes((prevShapes) => updateArray(prevShapes, item, key));
                setWholeData((prevDatas) => updateArray(prevDatas, item, key));
                break;
              case "Circle":
                setShapes((prevShapes) => updateArray(prevShapes, item, key));
                setWholeData((prevDatas) => updateArray(prevDatas, item, key));
                break;
              case "RegularPolygon":
                setShapes((prevShapes) => updateArray(prevShapes, item, key));
                setWholeData((prevDatas) => updateArray(prevDatas, item, key));
                break;
              case "Line":
                setLines((prevLines) => updateArray(prevLines, item, key));
                setWholeData((prevDatas) => updateArray(prevDatas, item, key));
                break;
              case "Dot":
                setLines((prevLines) => updateArray(prevLines, item, key));
                setWholeData((prevDatas) => updateArray(prevDatas, item, key));
                break;
              case "Arrow":
                setLines((prevLines) => updateArray(prevLines, item, key));
                setWholeData((prevDatas) => updateArray(prevDatas, item, key));
                break;
              case "Image":
                setImages((prevImage) => updateArray(prevImage, item, key));
                setWholeData((prevDatas) => updateArray(prevDatas, item, key));
                break;
              default:
                setWholeData((prevDatas) => updateArray(prevDatas, item, key));
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
