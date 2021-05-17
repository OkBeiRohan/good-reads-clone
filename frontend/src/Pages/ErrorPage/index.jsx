import React from "react";

function ErrorPage() {
  document.title = "Uh oh! That's an error - 404";
  return (
    <div
      className="headerSignedOut"
      style={{
        backgroundImage:
          "url(/assets/img/banners/HomepageMasthead_Desktop.png)",
      }}
    >
      <div className="headerNavSO">
        <div className="headerContainerSO">
          <div className="navBarSO">
            <div id="logo">
              <a href="/">
                <img
                  alt="Reader Giant: Book reviews, recommendations, and discussion"
                  src="/assets/img/logo.png"
                />
              </a>
            </div>
          </div>
          <div className="headerSOContent">
            <div id="createAccount">
              <h2>Uh oh! That's an error - 404</h2>
              <div>
                <div id="signInUsingContent">
                  <a
                    href="/"
                    className="signupbutton appleLoginButton"
                    style={{ fontWeight: "700" }}
                  >
                    Go to Home Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="/">
          <div className="promoHeader__promoMastheadLink"></div>
        </a>
      </div>
    </div>
  );
}

export default ErrorPage;
