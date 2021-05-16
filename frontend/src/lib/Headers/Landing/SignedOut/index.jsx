import React from "react";
import "./styles.css";

function SignedOutHeader() {
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
              <h2>Discover &amp; read more</h2>
              <div>
                <div id="signInUsingContent">
                  <a
                    class="signupbutton fbloginbutton"
                    style={{ marginBottom: "14px" }}
                    href="/"
                  >
                    <i
                      class="gr-button--facebook__icon"
                      style={{
                        backgroundImage:
                          "url(/assets/img/icons/icon_facebook.svg)",
                      }}
                    ></i>
                    Continue with Facebook
                  </a>
                  <a
                    class="signupbutton amazonLoginButton"
                    style={{ marginBottom: "14px" }}
                    href="/"
                  >
                    <i
                      class="gr-button--amazon__icon"
                      style={{
                        backgroundImage:
                          "url(/assets/img/icons/icon-amazon-a.svg)",
                      }}
                    ></i>
                    Continue with Amazon
                  </a>
                  <a
                    class="signupbutton appleLoginButton"
                    style={{ marginBottom: "14px" }}
                    href="/"
                  >
                    <i
                      class="gr-button--apple__icon"
                      style={{
                        backgroundImage:
                          "url(/assets/img/icons/share_apple_circle.svg)",
                      }}
                    ></i>
                    Continue with Apple
                  </a>
                  <a
                    class="signupbutton emailSignUpButton"
                    href="/user/sign_up?email_signup=true"
                  >
                    Sign up with email
                  </a>
                </div>
              </div>
              <div id="legal">
                <div class="legalMessage">
                  By creating an account, you agree to the Goodreads{" "}
                  <a
                    target="_blank"
                    class="gr-hyperlink"
                    rel="noopener noreferrer"
                    href="/about/terms"
                  >
                    Terms of Service
                  </a>{" "}
                  and
                  <a
                    target="_blank"
                    class="gr-hyperlink"
                    rel="noopener noreferrer"
                    href="/about/privacy"
                  >
                    {" "}
                    Privacy Policy
                  </a>
                  .
                </div>
              </div>
              <div id="signIn">
                <div class="u-topGrayBorder">
                  <div class="authSwitchFlow u-marginTopLarge">
                    Already a member?{" "}
                    <a class="gr-hyperlink" href="/user/sign_in">
                      <b>Sign In</b>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="/">
            <div class="promoHeader__promoMastheadLink"></div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignedOutHeader;
