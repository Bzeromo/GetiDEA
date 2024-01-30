const LayerFunction = (selectedId, layerRef) => {
  const moveToTop = () => {
    if (layerRef.current) {
      const shape = layerRef.current.findOne("#" + selectedId);
      if (shape) {
        shape.moveToTop();
        layerRef.current.batchDraw();
      }
    } else if(!layerRef.current) {
      console.log("moveToTop");
      console.log("Selected ID:", selectedId);
      console.log("LayerRef Current:", layerRef.current);
    }else{
      return
    }
  };

  const moveUp = () => {
    if (layerRef.current) {
      const shape = layerRef.current.findOne("#" + selectedId);
      if (shape) {
        shape.moveUp();
        layerRef.current.batchDraw();
      }
    } else {
      console.log("moveUp");
    }
  };

  const moveDown = () => {
    if (layerRef.current) {
      const shape = layerRef.current.findOne("#" + selectedId);
      if (shape) {
        shape.moveDown();
        layerRef.current.batchDraw();
      }
    } else {
      console.log("moveDown");
    }
  };

  const moveToBottom = () => {
    if (layerRef.current) {
      const shape = layerRef.current.findOne("#" + selectedId);
      if (shape) {
        shape.moveToBottom();
        layerRef.current.batchDraw();
      }
    } else {
      console.log("moveToBottom");
    }
  };

  return { moveDown, moveToBottom, moveUp, moveToTop };
};
export default LayerFunction;
