import React, { useState } from "react";
// import api from "../../../../services/api";

import "./styles.css";

function SignedOutHeader() {
  const [search, setSearch] = useState("");

  return (
    <div id="signedInHeader">
      <div className="HeaderLogo">
        <img src="/assets/img/logo.png" alt="Reader Giants" />
      </div>
      <div className="NavButton">
        <a href="/">Home</a>
      </div>
      <div className="NavButton">My Books</div>
      <div className="NavButton DropDownMenu">
        Browse
        <div className="NavContent">
          <a href="/genres/fiction">Fiction</a>
          <a href="/genres/action">Action</a>
        </div>
      </div>
      <form action={"/search/" + search} method="post" className="SearchBar">
        <input
          className="SearchBarInput"
          type="text"
          placeholder="Search your favorite books"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          minLength="3"
          required
        />
        <button
          type="submit"
          className="SearchBarIcon"
          style={{
            background: "url(/assets/img/icons/icn_nav_search.svg)",
          }}
        ></button>
      </form>

      <div className="NavButton" style={{ width: "250px" }}>
        <a href="/">Sign In | Create an Account</a>
      </div>
    </div>
  );
}

export default SignedOutHeader;
