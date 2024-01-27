const LayerFunction = (selectedId, layerRef) => {

  const moveToTop = () => {
    const shape = layerRef.current.findOne("#" + selectedId);
    if (shape) {
      shape.moveToTop();
      layerRef.current.batchDraw();
    }
  };

  const moveUp = () => {
    const shape = layerRef.current.findOne("#" + selectedId);
    if (shape) {
      shape.moveUp();
      layerRef.current.batchDraw();
    }
  };

  const moveDown = () => {
    const shape = layerRef.current.findOne("#" + selectedId);
    if (shape) {
      shape.moveDown();
      layerRef.current.batchDraw();
    }
  };

  const moveToBottom = () => {
    const shape = layerRef.current.findOne("#" + selectedId);
    if (shape) {
      shape.moveToBottom();
      layerRef.current.batchDraw();
    }
  };

  return { moveDown, moveToBottom, moveUp, moveToTop };
};
export default LayerFunction;
