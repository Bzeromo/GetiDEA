import axios from "axios";

interface Item {
  ty: string;
  [key: string]: any; // `Item` 객체의 나머지 프로퍼티들은 동적으로 처리됩니다.
}

interface DataItems {
  [key: string]: Item;
}

type SetStateAction<T> = React.Dispatch<React.SetStateAction<T>>;

const getData = (
  projectId: number,
  setTexts: SetStateAction<Item[]>,
  setShapes: SetStateAction<Item[]>,
  setLines: SetStateAction<Item[]>,
  setImages: SetStateAction<Item[]>
) => {
  const getProjectData = () => {
    axios
      .get(`http://192.168.31.172:8080/api/project/data?projectId=${projectId}`)
      .then((response) => {
        const data = response.data;
        if (data && data.data) {
          const dataItems: DataItems = data.data;

          console.log(data.data);

          Object.keys(dataItems).forEach((key) => {
            const item = dataItems[key];

            console.log(key);
            console.log(item.ty + "item 보기");

            switch (item.ty) {
              case "Text":
                console.log(
                  `Text item: `,
                  JSON.stringify(item, (key, value) => {
                    return value;
                  })
                );
                setTexts((prevTexts) => updateArray(prevTexts, item, key));
                break;
              case "Rect":
              case "Circle":
              case "RegularPolygon":
                console.log(
                  `${item.ty} item: `,
                  JSON.stringify(item, (key, value) => {
                    return value;
                  })
                );
                setShapes((prevShapes) => updateArray(prevShapes, item, key));
                break;
              case "Line":
              case "Dot":
              case "Arrow":
                console.log(
                  `${item.ty} item: `,
                  JSON.stringify(item, (key, value) => {
                    return value;
                  })
                );
                setLines((prevLines) => updateArray(prevLines, item, key));
                break;
              case "Image":
                console.log(
                  `img item: `,
                  JSON.stringify(item, (key, value) => {
                    return value;
                  })
                );
                setImages((prevImages) => updateArray(prevImages, item, key));
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

  function updateArray(array: Item[], item: Item, key: string): Item[] {
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
