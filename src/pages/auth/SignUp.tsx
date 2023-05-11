import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authPageImg from "../../assets/images/simple-chat-pic-2.png";
import Logo from "../../assets/images/chatster-logo.png";
import { AuthContext } from "../../context/features/auth";
import { StateContext } from "../../context/features/states";
import Spinner from "../../components/Spinner";

const SignUp = () => {
  const { regError, regLoading, regSuccess, register } =
    useContext(AuthContext);
  const { redirectRoute, setRedirectRoute } = useContext(StateContext);
  const [errMsg, setErrMsg] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (regSuccess) {
      if (redirectRoute) {
        navigate(redirectRoute);
        setRedirectRoute("");
        localStorage.removeItem("redirectRoute");
      } else {
        navigate("/");
      }
    }
  }, [regSuccess, redirectRoute]);

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword)
      return setErrMsg("Passwords Does Not Match!");

    const userData = {
      username,
      email,
      password,
    };

    register(userData);
  };

  return (
    <div className="auth-container">
      <div className="logo">
        <Link to={"/"}>
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="image">
        <img src={authPageImg} alt="Auth page Image" />
      </div>
      <div className="auth">
        {regLoading ? (
          <div className="spinner-wrapper">
            <Spinner />
          </div>
        ) : null}
        <div className="custom_auth">
          {regError && <p>{regError}</p>}
          {errMsg && <p>{errMsg}</p>}
          {regLoading && <p>Loading...</p>}
          <h5>
            Sign up with <span>Simple-Chat</span>
          </h5>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
          <div className="info">
            <h4>Already Have an Account?</h4>
            <Link to={"/signin"}>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
