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

  // const moveToTemplate = (layerRef, id) => {
  //   if (layerRef.current) {
  //     const shapes = layerRef.current.find(node => node.id() === id);
  //     if (shapes.length > 0) {
  //       shapes.forEach(shape => {
  //         shape.moveToBottom();
  //       });
  //       layerRef.current.batchDraw();
  //       console.log("살려주세용");
  //     } else {
  //       console.log("해당 id에 해당하는 도형을 찾을 수 없습니다.");
  //     }
  //   } else {
  //     console.log("layerRef가 null입니다.");
  //   }
  // };
  
  
  


  return { moveDown, moveToBottom, moveUp, moveToTop, };
};
export default LayerFunction;
