const changeFunction = (
    selectedId: string,
    shapes: any[],
    setShapes: React.Dispatch<React.SetStateAction<any[]>>,
    setDraggable: React.Dispatch<React.SetStateAction<boolean>>,
    draggable: boolean,
    setStartWrite: React.Dispatch<React.SetStateAction<boolean>>,
    startWrite: boolean,
    setSelectStroke: React.Dispatch<React.SetStateAction<string>>,
    setCurrentColor: React.Dispatch<React.SetStateAction<string>>,
    setSelectedId: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const changeSelectedShapeColor = (color: string) => {
      if (!selectedId) return;
  
      const updatedShapes = shapes.map((shape) => {
        if (shape.id === selectedId) {
          return { ...shape, fill: color };
        }
        return shape;
      });
  
      setShapes(updatedShapes);
    };
  
    const handleImageClick = (id: string) => {
      setSelectedId(id);
    };
  
    const changeSelectedStrokeColor = (color: string) => {
      if (!selectedId) return;
  
      const updatedShapes = shapes.map((shape) => {
        if (shape.id === selectedId) {
          return { ...shape, stroke: color };
        }
        return shape;
      });
  
      setShapes(updatedShapes);
    };
  
    const changedraggable = () => {
      setDraggable(false);
      setStartWrite(false);
    };
  
    const changeWrite = () => {
      setStartWrite(true);
      setDraggable(true);
    };
  
    const changeStrokeColor = (color: string) => {
      setSelectStroke(color);
    };
  
    const renderColor = (color: string) => {
      setCurrentColor(color);
    };
  
    return {
      changeSelectedShapeColor,
      changeSelectedStrokeColor,
      changedraggable,
      changeWrite,
      changeStrokeColor,
      renderColor,
    };
  };
  
  export default changeFunction;
  