import React, { useState } from "react";
import api from "../../../../services/api";
import LoadingScreen from "react-loading-screen";

import "./styles.css";
import { Redirect, useLocation } from "react-router";

function SignedOutHeaderLanding() {
  const [disable, setDisable] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passValid, setPassValid] = useState(true);
  const [state2, setState] = useState("all");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { state } = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    setEmailValid(true);
    setPassValid(true);
    var pattern = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    if (!pattern.test(email)) {
      setLoading(false);
      setEmailValid(false);
      setMessage("Enter a valid email address.");
    } else if (state2 === "login") {
      try {
        const res = await api.post("/api/login", {
          username: email,
          password,
        });
        if (res.data)
          if (res.data.status) {
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            if (localStorage.getItem("currentUser") == null) {
              console.log("Save Error!");
            }
            if (state?.from) return <Redirect to={state.from} />;
            else window.location.reload();
          } else {
            setLoading(false);
            if (res.data.type === "username") {
              setEmailValid(false);
              setPassValid(false);
              setMessage("User doesn't exist. Try creating an account!");
            } else if (res.data.type === "password") {
              setPassValid(false);
              setMessage("Password is not matching with the user. Try again");
            } else setMessage("Unknown Error Occurred!");
          }
        else {
          setLoading(false);
          setMessage("Error receiving response from server!");
        }
      } catch (e) {
        setLoading(false);
        setMessage("" + e);
      }
    } else {
      if (password !== password2) {
        setLoading(false);
        setPassValid(false);
        setMessage("Passwords Doesn't Match");
      } else {
        try {
          const res = await api.post("/api/register", {
            username: email,
            password,
            name,
            number,
            sex,
          });
          if (res.data)
            if (res.data.status) {
              setMessage("Registration Success. You can log in now");
              setState("login");
              setLoading(false);
            } else {
              setLoading(false);
              if (res.data.type === "username") {
                setEmailValid(false);
                setPassValid(false);
                setMessage("User already exists. Try Logging In!");
              } else if (res.data.type === "number")
                setMessage("Mobile number already registered. Try logging in!");
              else setMessage("Unknown Error Occurred!");
            }
          else {
            setLoading(false);
            setMessage("Error receiving response from server!");
          }
        } catch (e) {
          setLoading(false);
          setMessage("" + e);
        }
      }
    }
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
              <LoadingScreen
                loading={loading}
                bgColor="#f1f1f1"
                spinnerColor="#9ee5f8"
                textColor="#676767"
                logoSrc="/assets/img/logo.png"
                text=""
              />
              {state2 === "all" ? (
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
                      <a
                        className="signupbutton appleLoginButton"
                        href="/discover"
                      >
                        Continue without signing in
                      </a>
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
              ) : state2 === "login" ? (
                <div className="accountActions">
                  <h2>Log In</h2>
                  <div>
                    <div id="signInUsingContent">
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          className={
                            emailValid
                              ? "login-input"
                              : "login-input inputerror"
                          }
                          placeholder="Enter Your Email ID"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          required
                        />
                        <input
                          type="password"
                          className={
                            passValid ? "login-input" : "login-input inputerror"
                          }
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
                              setPassword2("");
                              setName("");
                              setNumber("");
                              setEmailValid(true);
                              setPassValid(true);
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
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          className="login-input"
                          placeholder="Enter Your Name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          required
                        />
                        <input
                          type="text"
                          className="login-input"
                          placeholder="Enter Your Mobile Number"
                          value={number}
                          onChange={(e) => {
                            setNumber(e.target.value);
                          }}
                          required
                        />
                        <select
                          className="login-input"
                          onChange={(e) => setSex(e.target.value)}
                          defaultValue="false"
                          style={{ cursor: "pointer" }}
                        >
                          <option value="false" disabled>
                            Select Your Gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="NA">Prefer Not To Say</option>
                        </select>
                        <input
                          type="email"
                          className={
                            emailValid
                              ? "login-input"
                              : "login-input inputerror"
                          }
                          placeholder="Enter Your Email ID"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          required
                        />
                        <input
                          type="password"
                          className={
                            passValid ? "login-input" : "login-input inputerror"
                          }
                          placeholder="Enter Your Password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          required
                        />
                        <input
                          type="password"
                          className={
                            passValid ? "login-input" : "login-input inputerror"
                          }
                          placeholder="Re-Enter Your Password"
                          value={password2}
                          onChange={(e) => {
                            setPassword2(e.target.value);
                          }}
                          required
                        />
                        <button
                          type="submit"
                          className="signupbutton appleLoginButton"
                          style={{ fontWeight: "700" }}
                        >
                          Register
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
                            setEmailValid(true);
                            setPassValid(true);
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

export default SignedOutHeaderLanding;
