import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GroupContext } from "../../context/features/group";
import GroupRequests from "./GroupRequests";
import AddGroupFriends from "./AddGroupFriends";
import { StateContext } from "../../context/features/states";
import UploadImage from "../UploadImage";
import UpdateGroupName from "./UpdateGroupName";
import DeleteGroupModal from "./DeleteGroupModal";
import GroupProfile from "./GroupProfile";
import GroupPanel from "./GroupPanel";
import GroupMembers from "./GroupMembers";
import { useWindowSize } from "../../hooks";

const Group = () => {
  const windowSize = useWindowSize();

  const { getGroup, group } = useContext(GroupContext);
  const {
    showGroupRequests,
    setShowGroupRequests,
    showAddFriend,
    setShowAddFriend,
    showUploadImage,
    showUpdateGroupName,
    showDeleteGroupModal,
    setShowUploadImage,
    showChatWindow,
    setShowChatWindow,
  } = useContext(StateContext);

  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");

  useEffect(() => {
    if (!groupId) {
      setShowUploadImage(false);
    }
  }, [groupId]);

  return (
    <div className="group-container">
      <GroupProfile />
      <hr />
      {!showChatWindow && (
        <div className="chat-btn" onClick={() => setShowChatWindow(true)}>
          <button id="btn">Open Chat</button>
        </div>
      )}
      <div className="section-two">
        {windowSize <= 500 && window.innerWidth <= 500 ? null : <GroupPanel />}
        <GroupMembers />
      </div>

      {showGroupRequests && (
        <GroupRequests
          showModal={showGroupRequests}
          hideModal={() => {
            setShowGroupRequests(false);
            if (groupId) getGroup(groupId);
          }}
          groupId={groupId}
        />
      )}

      {showAddFriend && (
        <AddGroupFriends
          showModal={showAddFriend}
          hideModal={() => {
            setShowAddFriend(false);
          }}
          groupId={groupId}
        />
      )}

      {showUploadImage && (
        <UploadImage avatar={group?.image} id={group._id} route="groups" />
      )}

      {showUpdateGroupName && (
        <UpdateGroupName groupName={group.name} groupId={group._id} />
      )}

      {showDeleteGroupModal && (
        <DeleteGroupModal textBold={group.name} groupId={groupId || ""} />
      )}
    </div>
  );
};

export default Group;
