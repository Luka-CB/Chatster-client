import { useContext } from "react";
import { GroupContext } from "../../context/features/group";
import DummyGroupPic from "../../assets/images/dummy-group-pic.png";
import {
  AiOutlineEdit,
  AiOutlineCloseCircle,
  AiOutlineUserAdd,
  AiOutlineDelete,
} from "react-icons/ai";
import { AuthContext } from "../../context/features/auth";
import { StateContext } from "../../context/features/states";

const GroupProfile = () => {
  const { user } = useContext(AuthContext);
  const { group, setUpdGroupNameSuccess } = useContext(GroupContext);
  const {
    setShowUploadImage,
    setShowUpdateGroupName,
    setShowDeleteModal,
    setShowGroup,
    setShowGroupRequests,
    setShowAddFriend,
    setScroll,
  } = useContext(StateContext);

  const isGroupAdmin = group?.admin?._id === user?.id;

  return (
    <div className="group-profile">
      <AiOutlineCloseCircle
        id="close-icon"
        onClick={() => {
          setShowGroup(false);
        }}
      />
      <div className="image-wrapper">
        <div className="image">
          {group?.image ? (
            <img src={group.image} alt={group.name} />
          ) : (
            <img src={DummyGroupPic} alt="Dummy Group Picture" />
          )}
        </div>
        {isGroupAdmin && (
          <span id="upload-link" onClick={() => setShowUploadImage(true)}>
            {group.image ? "Update Image" : "Upload image"}
          </span>
        )}
      </div>
      <section>
        <div className="info">
          <div id="name">
            <h3>
              {group.name?.length > 26
                ? group.name?.substring(0, 26) + "..."
                : group.name}
            </h3>
            {isGroupAdmin && (
              <AiOutlineEdit
                id="edit-icon"
                onClick={() => {
                  setUpdGroupNameSuccess(false);
                  setShowUpdateGroupName(true);
                }}
              />
            )}
          </div>
          <p id="date">Created {group.createdAt} ago</p>
          <h6 id="admin">
            Admin: <span>{group.admin?.username}</span>
          </h6>
        </div>
        {isGroupAdmin && (
          <div className="activity">
            <div
              className="requests"
              onClick={() => setShowGroupRequests(true)}
            >
              <span>Requests</span>
              <div id="pill">{group.requests?.length}</div>
            </div>

            <div className="add-friend" onClick={() => setShowAddFriend(true)}>
              <AiOutlineUserAdd id="add-icon" />
              <span>Add Friend</span>
            </div>

            <div className="del-group" onClick={() => setShowDeleteModal(true)}>
              <AiOutlineDelete id="del-icon" />
              <span>Delete Group</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default GroupProfile;
