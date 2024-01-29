const redoUndoFunction = (
  setRedoHistory,
  setHistory,
  setShapes,
  redoHistory,
  history
) => {
  const undo = () => {
    if (history.length === 0) return; // 되돌릴 내용이 없는 경우

    const previous = history[history.length - 2]; // 마지막 변경 사항 전의 상태
    const current = history[history.length - 1];

    setRedoHistory((redoHistory) => [...redoHistory, current]);
    setHistory(history.slice(0, -1)); // 마지막 변경 사항 제거
    setShapes(previous); // 이전 상태로 도형 설정
  };

  const redo = () => {
    if (redoHistory.length === 0) return; // 앞으로 돌릴 내용이 없는 경우

    const next = redoHistory[redoHistory.length - 1]; // 마지막으로 제거된 상태

    setHistory((history) => [...history, next]); // 되돌리기 기록에 다음 상태 추가
    setRedoHistory(redoHistory.slice(0, -1)); // 마지막 앞으로 돌리기 상태 제거
    setShapes(next); // 다음 상태로 도형 설정
  };

  return {
    redo,
    undo,
  };
};

export default redoUndoFunction;
