import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainPageImg from "../assets/images/simple-chat-pic-1.png";
import Header from "../components/Header";
import { AuthContext } from "../context/features/auth";

const Home = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const navigationHandler = () => {
    if (user?.id) {
      navigate("/chat");
      localStorage.setItem("activeNavItem", JSON.stringify("Profile"));
    } else {
      navigate("/signin");
      localStorage.setItem("redirectRoute", JSON.stringify("/chat"));
    }
  };

  return (
    <div className="home-container">
      <Header />
      <div className="wrapper">
        <div className="col_1">
          <div className="hero">
            <h1>Connect with the World!</h1>
            <div className="image">
              <img src={MainPageImg} alt="Main Page Image" />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
              mollitia non numquam temporibus debitis. Nihil quo autem nisi,
              deleniti nesciunt porro dolorem! Veritatis natus pariatur
              distinctio, magni architecto aliquam officia cumque aperiam in
              similique sed omnis quae rerum qui voluptate, repudiandae
              consectetur eaque perferendis fugit nulla. Incidunt praesentium
              dolore nulla.
            </p>
            <button onClick={navigationHandler}>Start Chat Now</button>
          </div>
        </div>
        <div className="col_2">
          <div className="image">
            <img src={MainPageImg} alt="Main Page Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
