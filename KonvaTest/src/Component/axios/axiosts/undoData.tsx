import axios from "axios";

const undoData = (projectId: number, userEmail: string): () => void => {
  const undoEvent = (): void => {
    axios
      .get(`http://192.168.31.172:8080/api/project/${projectId}/${userEmail}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return undoEvent;
};

export default undoData;
