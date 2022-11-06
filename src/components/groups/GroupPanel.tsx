import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { GroupContext } from "../../context/features/group";
import DummyGroupPic from "../../assets/images/dummy-group-pic.png";
import { SocketContext } from "../../context/features/socket";

const GroupPanel = () => {
  const { groupsOnline } = useContext(SocketContext);
  const { groups } = useContext(GroupContext);

  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");

  const navigate = useNavigate();

  const groupsFormated = groups?.filter((group) => group._id !== groupId);

  return (
    <div
      className={groupsFormated.length === 0 ? "col-one-empty" : "col-one"}
      style={{
        borderTopRightRadius: groupsFormated?.length < 6 ? "20px" : "unset",
      }}
    >
      <div
        className="groups-wrapper"
        style={{
          overflowY: groupsFormated?.length > 6 ? "scroll" : "initial",
        }}
      >
        {groupsFormated?.map((group) => {
          const isGroupOnline = groupsOnline?.some(
            (groupOnline) => groupOnline.id === group._id
          );

          return (
            <div className="group" key={group._id}>
              <h5
                onClick={() =>
                  navigate({
                    pathname: "/chat",
                    search: `?groupId=${group._id}`,
                  })
                }
                id="group-name"
                title={group.name}
              >
                {group.name.substring(0, 12)}...
              </h5>
              <div id="image">
                {group.image ? (
                  <img src={group.image} alt={group.name} />
                ) : (
                  <img src={DummyGroupPic} alt="dimmy pic" />
                )}
                {isGroupOnline ? (
                  <div id="online"></div>
                ) : (
                  <div id="offline"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupPanel;
