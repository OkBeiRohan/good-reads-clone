import api from "../../services/api";

async function checkAuth(jwt) {
  try {
    const res = await api.post(
      "/user/auth",
      {},
      {
        headers: { Authorization: `Bearer ${jwt.token}` },
      }
    );
    if (res.data.auth_status) {
      setTimeout(() => {
        return { loading: false, signedIn: true };
      }, [1000]);
    } else {
      localStorage.removeItem("currentUser");
      return { loading: false, signedIn: false };
    }
  } catch (e) {
    localStorage.removeItem("currentUser");
    setTimeout(() => {
      return { loading: false, signedIn: false };
    }, [500]);
  }
}
if (localStorage.getItem("currentUser") !== null) {
  const obj = localStorage.getItem("currentUser");
  const jwt = JSON.parse(obj);
  checkAuth(jwt);
  // localStorage.removeItem("currentUser");
} else {
  setTimeout(() => {
    return { loading: false, signedIn: false };
  }, [500]);
}

export default checkAuth;
