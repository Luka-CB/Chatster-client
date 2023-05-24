import { useContext, useEffect } from "react";
import DummyProfPic from "../assets/images/dummy-profile-pic.png";
import Logo from "../assets/images/chatster-logo-var-2-with-shadow.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/features/auth";

const url: any = import.meta.env.VITE_APP_API_URL;
const urlLocal: any = import.meta.env.VITE_APP_API_URL_LOCAL;

const Header = () => {
  const { user, logout, logoutSuccess } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (logoutSuccess) {
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [logoutSuccess]);

  const logoutOauth = () => {
    window.open(`${url}/api/auth/logout`, "_self");
    localStorage.removeItem("userInfo");
  };

  const navigationHandler = () => {
    navigate("/signin");
    localStorage.removeItem("redirectRoute");
  };

  return (
    <div className="header">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      {user?.id ? (
        <div className="loggedin">
          <p onClick={user?.providerId ? logoutOauth : () => logout()}>
            sign out
          </p>
          <div className="profile_pic">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.username} />
            ) : (
              <img src={DummyProfPic} alt="Dummy Profile Picture" />
            )}
          </div>
        </div>
      ) : (
        <div className="loggedout" onClick={navigationHandler}>
          <p>Sign In</p>
        </div>
      )}
    </div>
  );
};

export default Header;
