import { useContext, useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import DummyProfilePic from "../../assets/images/dummy-profile-pic.png";
import { FriendContext } from "../../context/features/friend";
import { GroupContext, groupMembersIFace } from "../../context/features/group";
import { ReqContext } from "../../context/features/request";

interface groupPropsIFace {
  showModal: boolean;
  hideModal: () => void;
  groupId: string | null;
}

const AddGroupFriends: React.FC<groupPropsIFace> = ({
  showModal,
  hideModal,
  groupId,
}) => {
  const { getFriends, friends } = useContext(FriendContext);
  const { groupRequests, getGroupRequests } = useContext(ReqContext);
  const { addMember, addMemberSuccess, getGroup, groupMembers } =
    useContext(GroupContext);

  const [addIndex, setAddIndex] = useState<number | null>(null);
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    if (showModal) {
      getFriends();
      if (groupId) getGroupRequests(groupId);
      if (groupId) getGroup(groupId);
    }

    if (addMemberSuccess) {
      setAddIndex(null);
      setDisableBtn(false);
    }
  }, [showModal, addMemberSuccess, groupId]);

  const members = groupMembers?.map((member) => member._id);
  const requesters = groupRequests?.map((req) => req.from._id);
  const friendsToAdd = friends?.filter(
    (friend) =>
      !members.includes(friend._id) && !requesters.includes(friend._id)
  );

  const addMemberHandler = (userId: string, i: number) => {
    setAddIndex(i);
    setDisableBtn(true);
    if (groupId) addMember(groupId, userId);
  };

  return (
    <div className="add-group-friends-bg" onClick={hideModal}>
      <div
        className="add-group-friends-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header">
          <h3 id="title">Add Friend</h3>
          <AiOutlineCloseCircle id="close-icon" onClick={hideModal} />
        </div>
        <div className="friends-wrapper">
          {friendsToAdd?.length === 0 && (
            <p id="no-friends">No Friends to Add!</p>
          )}
          {friendsToAdd?.map((friend, i) => (
            <div className="friend" key={friend._id}>
              <div className="fr-col-one">
                <div className="image">
                  {friend.avatar ? (
                    <img src={friend.avatar} alt={friend.username} />
                  ) : (
                    <img src={DummyProfilePic} alt="dummy pic" />
                  )}
                </div>
                <h5 id="name">
                  {friend.username?.length > 17
                    ? friend.username.substring(0, 17) + "..."
                    : friend.username}
                </h5>
              </div>
              <div className="fr-col-two">
                <button
                  onClick={() => addMemberHandler(friend._id, i)}
                  id="add"
                  disabled={disableBtn}
                >
                  {addIndex === i ? "...." : "Add to Group"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddGroupFriends;
