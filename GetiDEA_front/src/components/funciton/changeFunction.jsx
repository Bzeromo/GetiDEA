const changeFunction = (    selectedId,
    shapes,
    setShapes,
    setDraggable,
    draggable,
    setStartWrite,
    startWrite,
    setSelectStroke,
    setCurrentColor,
    setSelectedId) => {

const changeSelectedShapeColor = (color) => {
    if (!selectedId) return; // 선택된 도형이 없으면 함수 종료

    // 선택된 도형 찾기
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === selectedId) {
        return { ...shape, fill: color }; // 색상 변경
      }
      return shape;
    });

    setShapes(updatedShapes);
  };

  const handleImageClick = (id) => {
    setSelectedId(id);
  };

  const changeSelectedStrokeColor = (color) => {
    if (!selectedId) return; // 선택된 도형이 없으면 함수 종료

    // 선택된 도형 찾기
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === selectedId) {
        return { ...shape, stroke: color }; // 색상 변경
      }
      return shape;
    });

    setShapes(updatedShapes);
  };

  const changedraggable = () => {
    setDraggable(false);
    setStartWrite(false)
  };

  const changeWrite = () => {
    setStartWrite(true);
    setDraggable(true)
  };

  const changeStrokeColor = (color) => {
    setSelectStroke(color);
  };

  const renderColor = (color) => {
    setCurrentColor(color);
  };

  return{
    changeSelectedShapeColor,
    changeSelectedStrokeColor,
    changedraggable,
    changeWrite,
    changeStrokeColor,
    renderColor
  }
}
export default changeFunction;