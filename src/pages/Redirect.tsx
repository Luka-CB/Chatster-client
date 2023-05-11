import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/features/auth";
import { StateContext } from "../context/features/states";

const Redirect = () => {
  const { redirectRoute, setRedirectRoute } = useContext(StateContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      if (redirectRoute) {
        navigate(redirectRoute);
        setRedirectRoute("");
        localStorage.setItem("redirectRoute", JSON.stringify(""));
      } else {
        navigate("/");
      }
    }
  }, [user, redirectRoute]);

  return (
    <div className="redirect-container">
      <Spinner />
      <div className="spinner-text">
        <h3>redirecting</h3>
      </div>
    </div>
  );
};

export default Redirect;
