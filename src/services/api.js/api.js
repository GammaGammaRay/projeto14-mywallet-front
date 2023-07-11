import axios from "axios";
axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;
// export default

function tokenProvider(auth) {
  return {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
}

function signIn(data, success, failure) {
  axios
    .post("/sign-in", data)
    .then((res) => {
      success(res.data);
    })
    .catch((err) => {
      alert(err.response.data);
      failure();
    });
}

function signUp(data, success, failure) {
  axios
    .post("/sign-up", data)
    .then((res) => {
      success(res.data);
    })
    .catch((err) => {
      alert(err.response.data);
      failure();
    });
}

function signOut(data, success, failure) {
  axios
    .post("/sign-out", data)
    .then((res) => {
      success(res.data);
    })
    .catch((err) => {
      alert(err.response.data);
      failure();
    });
}


function listTransactions(auth, success, failure) {
    axios
      .get("/transactions", tokenProvider(auth))
      .then((res) => {
        success(res.data);
      })
      .catch((error) => {
        alert(error.response.data);
        failure();
      });
  }
  
  function addTransaction(obj, auth, success, failure) {
    axios
      .post(`/addTransaction/`, obj, tokenProvider(auth))
      .then(() => {
        success();
      })
      .catch((error) => {
        alert(error.response.data);
        failure();
      });
  }

export { 
    signIn,
    signUp,
    signOut,
    listTransactions,
    addTransaction
};
