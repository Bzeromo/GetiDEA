import axios from "axios";

const getData = (projectId, setTexts, setShapes, setLines, setImages) => {
  const getProjectData = () => {
    axios
      .get(`http://192.168.31.172:8080/api/project/data/${projectId}`)
      .then((response) => {
        if (response.data && response.data.data) {
          const dataItems = response.data.data;

          console.log(response.data.data);

          Object.keys(dataItems).forEach((key) => {
            const item = dataItems[key];

            if (item.type === "Shape") {
              console.log(`Shape item: `, JSON.stringify(item));
            } else if (item.type === "Line") {
              console.log(`Line item: `, JSON.stringify(item));
            } else if (item.type === "Text") {
              console.log(`Text item: `, JSON.stringify(item));
            } else if (item.type === "img") {
              console.log(`img item: `, JSON.stringify(item));
            }

            console.log(item.type + "item 보기")

            // const itemWithDefaults = {
            //   ...item,
            //   x: item.x ?? 0, // 기본값 0으로 설정
            //   y: item.y ?? 0, // 기본값 0으로 설정
            //   // 필요한 다른 속성에 대해서도 기본값을 설정할 수 있습니다.
            // };
            switch (item.type) {
              case "Text":
                setTexts((prevTexts) => updateArray(prevTexts, item, key));
                break;
              case "Shape":
                console.log(JSON.stringify(item) + "짜잔?");
                setShapes((prevShapes) => updateArray(prevShapes, item, key));
                break;
              case "Line":
                setLines((prevLines) => updateArray(prevLines, item, key));
                break;
              case "Image":
                setImages((prevImage) => updateArray(prevImage, item, key));
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
