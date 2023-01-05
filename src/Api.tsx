const Api = (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify("hello"),
    };
    // fetch("http://localhost:3000/api", options)
    //   .then((response) => response.json())
    //   .then((response) => console.log(response));
  } catch (e) {
    console.log(e);
  }
};
export default Api;
