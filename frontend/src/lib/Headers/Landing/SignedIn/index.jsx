import React, { useState } from "react";
import api from "../../../../services/api";
import LoadingScreen from "react-loading-screen";

import "./styles.css";

function SignedInHeader() {
  return (
    <LoadingScreen
      loading={true}
      bgColor="#f1f1f1"
      spinnerColor="#9ee5f8"
      textColor="#676767"
      logoSrc="/assets/img/logo.png"
      text="Signed In"
    />
  );
}

export default SignedInHeader;
