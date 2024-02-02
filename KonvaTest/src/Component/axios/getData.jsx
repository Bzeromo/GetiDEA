const getData = () => {
    axios
      .get("http://192.168.31.172:8080/data/test/1")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
  }, []);
};


export default getData;