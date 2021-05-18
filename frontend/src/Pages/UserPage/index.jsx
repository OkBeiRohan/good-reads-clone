import React, { useEffect, useState } from "react";
import api from "../../services/api";
import SignedInHeader from "../../lib/Headers/Landing/SignedIn";
import SignedOutHeader from "../../lib/Headers/Landing/SignedOut";

function UserPage({
  match: {
    params: { id, user },
  },
}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await api.post("/api/user", {
          id,
          name: user,
        });
        if (res.data) {
          console.log(res.data);
          setData(res.data);
        } else setData({ status: false, type: "nodata" });
      } catch (e) {
        setData({ status: false, type: "error", error: "" + e });
      }
    }
    getUser();
  }, [id, user]);

  return (
    <>
      <h1>
        User : {user}
        <br />
        ID: {id}
      </h1>
      <br />
      <br />
      {data !== null ? (
        <>
          {data.status ? (
            <>
              <h1>Name: {data.data.name}</h1>
              <h1>Sex: {data.data.sex}</h1>
              <h1>Email: {data.data.username}</h1>
            </>
          ) : data.type === "empty" ? (
            "User Doesn't Exists"
          ) : data.type === "db" ? (
            "Connection Error!"
          ) : (
            data.error
          )}
        </>
      ) : (
        "Please Wait!"
      )}
    </>
  );
}

export default UserPage;
