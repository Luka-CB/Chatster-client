import { useContext, useEffect, useState } from "react";
import DummyGroupPic from "../../assets/images/dummy-group-pic.png";
import { GroupContext } from "../../context/features/group";
import { useNavigate } from "react-router-dom";
import Group from "./Group";
import { SocketContext } from "../../context/features/socket";
import { StateContext } from "../../context/features/states";
import CreateGroupName from "./CreateGroupName";
import SearchGroup from "./SearchGroup";
import { AuthContext } from "../../context/features/auth";
import { UnreadGroupMsgContext } from "../../context/features/unreadGroupMsg";
import Spinner from "../Spinner";

interface propsIFace {
  isActive: boolean;
}

const Groups: React.FC<propsIFace> = ({ isActive }) => {
  const { groups, groupCount, getGroupsLoading, searchGroups } =
    useContext(GroupContext);

  const { groupsOnline, unreadGroupMsgs, setUnreadGroupMsgs } =
    useContext(SocketContext);

  const { removeUnreadGroupMsgs } = useContext(UnreadGroupMsgContext);

  const { showGroup, setShowGroup, setScroll, setShowChatWindow } =
    useContext(StateContext);
  const { user } = useContext(AuthContext);

  const [query, setQuery] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      setShowSearchResult(true);
    }

    const timeOut = setTimeout(() => {
      if (query) {
        searchGroups(query);
      }
    }, 300);

    return () => clearTimeout(timeOut);
  }, [query]);

  const openGroupWindowHandler = (groupId: string) => {
    const filteredUnreadGroupMsgs = unreadGroupMsgs.filter(
      (msg) => msg.groupId !== groupId && msg?.recieverIds?.includes(user.id)
    );
    setUnreadGroupMsgs(filteredUnreadGroupMsgs);

    removeUnreadGroupMsgs(groupId);

    setScroll(false);

    navigate({
      pathname: "/chat",
      search: `?groupId=${groupId}`,
    });

    setShowGroup(true);

    setShowChatWindow(true);
  };

  const getLatestMsgPreview = (groupId: string) => {
    const msgArr = unreadGroupMsgs?.filter((msg) => msg.groupId === groupId);

    return msgArr[msgArr.length - 1].message;
  };

  return (
    <div
      className="groups-container"
      onClick={() => {
        setShowSearchResult(false);
        setQuery("");
      }}
    >
      <CreateGroupName isActive={isActive} />
      <div className="groups-section">
        <div id="gr-count">Groups: {groupCount}</div>
        <div className="groups-wrapper">
          <SearchGroup
            showSearchResult={showSearchResult}
            query={query}
            setQuery={setQuery}
          />
          <div className="groups">
            {getGroupsLoading && <Spinner />}
            {groups?.length === 0 && !getGroupsLoading && (
              <p id="no-groups">No Groups!</p>
            )}
            {groups?.map((group) => {
              const isGroupOnline = groupsOnline?.some(
                (groupOnline) => groupOnline.id === group._id
              );

              return (
                <div
                  key={group._id}
                  className="group"
                  onClick={() => openGroupWindowHandler(group._id)}
                >
                  <div className="info">
                    <h5 id="group-name">{group.name}</h5>
                    <h6 id="members">Members: {group.members?.length}</h6>
                  </div>
                  <div className="image">
                    {group.image ? (
                      <img src={group.image} alt={group.name} />
                    ) : (
                      <img src={DummyGroupPic} alt="Dummy Group Picture" />
                    )}
                    {isGroupOnline ? (
                      <div id="online"></div>
                    ) : (
                      <div id="offline"></div>
                    )}

                    {unreadGroupMsgs?.length > 0 &&
                      unreadGroupMsgs.some(
                        (msg) => msg.groupId === group._id
                      ) && (
                        <div
                          className="badge"
                          title={getLatestMsgPreview(group._id)}
                        >
                          <span>
                            {
                              unreadGroupMsgs.filter(
                                (msg) => msg.groupId === group._id
                              ).length
                            }
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showGroup && <Group />}
    </div>
  );
};

export default Groups;
