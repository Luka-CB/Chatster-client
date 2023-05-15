import { useContext, useEffect, useState } from "react";
import { FaTimesCircle, FaTrashAlt, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/features/auth";
import { StateContext } from "../context/features/states";
import { UserContext, userIFace } from "../context/features/users";
import { useWindowSize } from "../hooks";
import DeleteModal from "./DeleteModal";
import Spinner from "./Spinner";

interface propsIFace {
  showUpdProfile: boolean;
  hideUpdProfile: () => void;
  profileInfo: userIFace;
}

const UpdateProfile: React.FC<propsIFace> = ({
  showUpdProfile,
  hideUpdProfile,
  profileInfo,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const windowSize = useWindowSize();
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);
  const { showDeleteModal, setShowDeleteModal } = useContext(StateContext);
  const {
    updLoading,
    updSuccess,
    setUpdSuccess,
    updError,
    updateProfile,
    getProfile,
    delLoading,
    delSuccess,
    deleteUser,
  } = useContext(UserContext);

  useEffect(() => {
    if (profileInfo) {
      setUsername(profileInfo.username);
      setEmail(profileInfo.email);
      setPassword(profileInfo.password);
    }
  }, [profileInfo]);

  useEffect(() => {
    if (updSuccess) {
      hideUpdProfile();
      getProfile();
      setUpdSuccess(false);
    }
  }, [updSuccess]);

  useEffect(() => {
    if (delSuccess) {
      logout();
      localStorage.removeItem("userInfo");
      navigate("/");
      window.location.reload();
    }
  }, [delSuccess]);

  const submitHandler = (e: any) => {
    e.preventDefault();

    updateProfile({
      username,
      email,
      password,
    });
  };

  return (
    <>
      {showUpdProfile && (
        <div className="update-profile-container">
          <div onClick={hideUpdProfile} className="close-icon">
            <FaTimesCircle />
          </div>
          {updLoading ? (
            <div className="spinner">
              <Spinner />
            </div>
          ) : null}
          {updError && <p>{updError}</p>}
          <div className="wrapper">
            <div className="del-account">
              <h3 id="del-text">Delete Account</h3>
              <span id="middle">
                {windowSize <= 500 && window.innerWidth <= 500 ? (
                  <FaCaretDown />
                ) : (
                  ">>>>>>"
                )}
              </span>
              <div onClick={() => setShowDeleteModal(true)} className="del-btn">
                <FaTrashAlt id="del-icon" />
                <span id="btn-text">Delete</span>
              </div>
            </div>
            <hr />
            <div className="upd-account">
              <h2 id="upd-text">Update Profile</h2>
              <form onSubmit={submitHandler}>
                <div className="input-box">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Update Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Update Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Update Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button id="upd-btn">Update</button>
              </form>
            </div>
          </div>

          {showDeleteModal && (
            <DeleteModal
              text={"Are you sure? You are deleting your"}
              textBold={"account!"}
              delLoading={delLoading}
              deleteFunction={() => deleteUser()}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
