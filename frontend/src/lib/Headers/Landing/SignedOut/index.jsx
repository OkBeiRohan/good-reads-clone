import React, { useState } from "react";
import "./styles.css";

function SignedOutHeader() {
  const [disable, setDisable] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("all");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(
      "Email: " +
        email +
        " and Password: " +
        password +
        ". Huhu you got hecked!"
    );
  };

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
              {state === "all" ? (
                <>
                  <h2>Discover &amp; read more</h2>
                  <div>
                    <div id="signInUsingContent">
                      <div
                        className={
                          disable
                            ? "signupbutton fbloginbutton signup-disabled"
                            : "signupbutton fbloginbutton"
                        }
                        style={{ marginBottom: "14px" }}
                        onClick={() => {
                          setDisable(true);
                          setTimeout(() => {
                            setDisable(false);
                          }, [3000]);
                        }}
                      >
                        <i
                          className="gr-button--facebook__icon"
                          style={{
                            backgroundImage:
                              "url(/assets/img/icons/icon_facebook.svg)",
                          }}
                        ></i>
                        Continue with Facebook
                      </div>
                      <div
                        className={
                          disable
                            ? "signupbutton amazonLoginButton signup-disabled"
                            : "signupbutton amazonLoginButton"
                        }
                        style={{ marginBottom: "14px" }}
                        onClick={() => {
                          setDisable(true);
                          setTimeout(() => {
                            setDisable(false);
                          }, [3000]);
                        }}
                      >
                        <i
                          className="gr-button--amazon__icon"
                          style={{
                            backgroundImage:
                              "url(/assets/img/icons/icon-amazon-a.svg)",
                          }}
                        ></i>
                        Continue with Amazon
                      </div>
                      <div
                        className={
                          disable
                            ? "signupbutton appleLoginButton signup-disabled"
                            : "signupbutton appleLoginButton"
                        }
                        style={{ marginBottom: "14px" }}
                        onClick={() => {
                          setDisable(true);
                          setTimeout(() => {
                            setDisable(false);
                          }, [3000]);
                        }}
                      >
                        <i
                          className="gr-button--apple__icon"
                          style={{
                            backgroundImage:
                              "url(/assets/img/icons/share_apple_circle.svg)",
                          }}
                        ></i>
                        Continue with Apple
                      </div>
                      <div
                        className="signupbutton emailSignUpButton"
                        onClick={() => {
                          setState("signup");
                        }}
                      >
                        Sign up with email
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          color: "red",
                          padding: "2px",
                          paddingBottom: "20px",
                        }}
                      >
                        {disable
                          ? "Partner signups are disabled temporarily. Try using email signup"
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div id="legal">
                    <div className="legalMessage">
                      By creating an account, you agree to the Reader Giant's{" "}
                      <a
                        target="_blank"
                        className="gr-hyperlink"
                        rel="noopener noreferrer"
                        href="/about/terms"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        target="_blank"
                        className="gr-hyperlink"
                        rel="noopener noreferrer"
                        href="/about/privacy"
                      >
                        Privacy Policy
                      </a>
                      .
                    </div>
                  </div>
                  <div id="signIn">
                    <div className="u-topGrayBorder">
                      <div className="authSwitchFlow u-marginTopLarge">
                        Already a member?{" "}
                        <a
                          className="gr-hyperlink"
                          onClick={() => {
                            setState("login");
                          }}
                          href="##"
                        >
                          <b>Sign In</b>
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              ) : state === "login" ? (
                <div className="accountActions">
                  <h2>Log In</h2>
                  <div>
                    <div id="signInUsingContent">
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          className="login-input"
                          placeholder="Enter Your Email ID"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          required
                        />
                        <input
                          type="password"
                          className="login-input"
                          placeholder="Enter Your Password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          required
                        />
                        <button
                          type="submit"
                          className="signupbutton appleLoginButton"
                          style={{ fontWeight: "700" }}
                        >
                          Sign In
                        </button>
                      </form>
                      <div
                        style={{
                          textAlign: "center",
                          color: "red",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                        }}
                      >
                        {message}
                      </div>
                    </div>
                    <div id="signIn" style={{ paddingTop: "0px" }}>
                      <div className="u-topGrayBorder">
                        <div className="authSwitchFlow u-marginTopLarge">
                          Want to create an account?{" "}
                          <a
                            className="gr-hyperlink"
                            onClick={() => {
                              setState("signup");
                              setMessage("");
                              setEmail("");
                              setPassword("");
                            }}
                            href="##"
                          >
                            <b>Sign Up</b>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="accountActions">
                  <h2>Create an Account</h2>
                  <div>
                    <div id="signInUsingContent">
                      <div
                        className="signupbutton appleLoginButton"
                        style={{ fontWeight: "700" }}
                      >
                        Sign Up
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          color: "red",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                        }}
                      >
                        {message}
                      </div>
                    </div>
                  </div>
                  <div id="signIn" style={{ paddingTop: "0px" }}>
                    <div className="u-topGrayBorder">
                      <div className="authSwitchFlow u-marginTopLarge">
                        Already a member?{" "}
                        <a
                          className="gr-hyperlink"
                          onClick={() => {
                            setState("login");
                            setMessage("");
                            setEmail("");
                            setPassword("");
                          }}
                          href="##"
                        >
                          <b>Sign In</b>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <a href="/">
            <div className="promoHeader__promoMastheadLink"></div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignedOutHeader;
