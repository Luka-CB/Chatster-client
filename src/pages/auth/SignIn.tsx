import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authPageImg from "../../assets/images/simple-chat-pic-2.png";
import Logo from "../../assets/images/chatster-logo.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { AuthContext } from "../../context/features/auth";
import { StateContext } from "../../context/features/states";
import Spinner from "../../components/Spinner";

const url: any = import.meta.env.VITE_APP_API_URL;
const urlLocal: any = import.meta.env.VITE_APP_API_URL_LOCAL;

const SignIn = () => {
  const { login, loginSuccess, loginError, loginLoading } =
    useContext(AuthContext);
  const { redirectRoute, setRedirectRoute } = useContext(StateContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) {
      if (redirectRoute) {
        navigate(redirectRoute);
        setRedirectRoute("");
        localStorage.removeItem("redirectRoute");
      } else {
        navigate("/");
      }
    }
  }, [loginSuccess, redirectRoute]);

  const google = () => {
    window.open(`${url}/api/auth/google`, "_self");
  };

  const facebook = () => {
    window.open(`${url}/api/auth/facebook`, "_self");
  };

  const submitHandler = (e: any) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    login(userData);
  };

  return (
    <div className="auth-container">
      <div className="logo">
        <Link to={"/"}>
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="image">
        <img src={authPageImg} alt="Auth Page Image" />
      </div>
      <div className="auth">
        {loginLoading ? (
          <div className="spinner-wrapper">
            <Spinner />
          </div>
        ) : null}
        <div className="oauth">
          <div onClick={google} className="oauth_btn">
            <div className="icon">
              <FcGoogle />
            </div>
            <p>Sign in with Google</p>
          </div>
          <div onClick={facebook} className="oauth_btn">
            <div className="icon">
              <FaFacebook className="icon_fc" />
            </div>
            <p>Sign in with Facebook</p>
          </div>
        </div>
        <div className="or">
          <strong>OR</strong>
        </div>
        <div className="custom_auth">
          <h5>
            Sign in with <span>Simple-Chat</span>
          </h5>
          {loginLoading && <p>Loading...</p>}
          {loginError && <p id="login-error">{loginError}</p>}
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>
          </form>
          <div className="info">
            <h4>Don't Have an Account?</h4>
            <Link to={"/signup"}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
