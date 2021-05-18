import React, { useState } from "react";
import api from "../../../../services/api";

import "./styles.css";

function SignedInHeader() {
  return (
    <div id="signedInHeader">
      <div className="HeaderLogo">
        <img src="/assets/img/logo.png" alt="Reader Giants" />
      </div>
      <div className="NavMenu">
        <div className="NavButton">
          <div className="NavButtonText">Home</div>
        </div>
        <div className="NavButton">
          <div className="NavButtonText">My Books</div>
        </div>
        <div className="NavButton">
          <div className="NavButtonText">Browse</div>
          <div className="NavContent"></div>
        </div>
      </div>
    </div>
  );
}

export default SignedInHeader;
