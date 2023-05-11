import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GroupContext } from "../../context/features/group";
import DummyProfilePic from "../../assets/images/dummy-profile-pic.png";
import { AuthContext } from "../../context/features/auth";
import { SocketContext } from "../../context/features/socket";
import { StateContext } from "../../context/features/states";

const GroupMembers = () => {
  const [removeIndex, setRemoveIndex] = useState<number | null>(null);
  const [disableBtn, setDisableBtn] = useState(false);

  const { user } = useContext(AuthContext);
  const { usersOnline } = useContext(SocketContext);
  const {
    group,
    groupMembers,
    leaveGroup,
    leaveGroupLoading,
    removeMember,
    getGroup,
    removeMemberSuccess,
    leaveGroupSuccess,
  } = useContext(GroupContext);
  const { setShowGroup } = useContext(StateContext);

  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");

  const navigate = useNavigate();

  useEffect(() => {
    if (groupId) getGroup(groupId);

    if (removeMemberSuccess) {
      setRemoveIndex(null);
      setDisableBtn(false);
    }

    if (!groupId) {
      setShowGroup(false);
    }
  }, [groupId, removeMemberSuccess]);

  useEffect(() => {
    if (leaveGroupSuccess) {
      navigate("/chat");
      setShowGroup(false);
    }
  }, [leaveGroupSuccess]);

  const removeMemberHandler = (userId: string, i: number) => {
    setRemoveIndex(i);
    setDisableBtn(true);
    if (groupId) removeMember(groupId, userId);
  };

  const membersFormated = groupMembers?.filter(
    (member) => member._id !== group?.admin?._id
  );
  return (
    <div className="col-two">
      <div className="members-wrapper">
        <div id="member-count">Members: {groupMembers?.length}</div>
        <div className="members">
          {membersFormated?.map((member, i) => {
            const isUserOnline = usersOnline?.some(
              (user) => user.userId === member._id
            );

            return (
              <div className="member" key={member._id}>
                <div className="avatar">
                  <div className="image">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.username} />
                    ) : (
                      <img src={DummyProfilePic} alt="dummy pic" />
                    )}
                    {isUserOnline ? (
                      <div id="online"></div>
                    ) : (
                      <div id="offline"></div>
                    )}
                  </div>
                  <h5 id="user-name">{member.username}</h5>
                </div>
                {member._id === user?.id && (
                  <button
                    onClick={() => groupId && leaveGroup(groupId)}
                    id="leave-btn"
                  >
                    {leaveGroupLoading ? "...." : "Leave Group"}
                  </button>
                )}
                {group?.admin?._id === user?.id && (
                  <button
                    onClick={() => removeMemberHandler(member._id, i)}
                    id="remove-btn"
                    disabled={disableBtn}
                  >
                    {removeIndex === i ? "...." : "Remove"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GroupMembers;
