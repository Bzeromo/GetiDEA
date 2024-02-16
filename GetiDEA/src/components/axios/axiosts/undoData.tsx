import api from "../../../api";

const undoData = (projectId: number, userEmail: string): () => void => {
  const undoEvent = (): void => {
    api
      .get(`/api/project/${projectId}/${userEmail}`)
      .then((response) => {
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return undoEvent;
};

export default undoData;
