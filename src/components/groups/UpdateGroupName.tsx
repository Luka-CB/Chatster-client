import { useContext, useEffect, useState } from "react";
import { GroupContext } from "../../context/features/group";
import { StateContext } from "../../context/features/states";

interface propsIFace {
  groupName: string;
  groupId: string;
}

const UpdateGroupName: React.FC<propsIFace> = ({ groupName, groupId }) => {
  const [name, setName] = useState("");

  const { setShowUpdateGroupName } = useContext(StateContext);
  const {
    getGroup,
    updateGroupName,
    updGroupNameLoading,
    updGroupNameSuccess,
  } = useContext(GroupContext);

  useEffect(() => {
    if (groupName) {
      setName(groupName);
    }
  }, [groupName]);

  useEffect(() => {
    if (updGroupNameSuccess) {
      setShowUpdateGroupName(false);
      groupId && getGroup(groupId);
    }
  }, [updGroupNameSuccess, groupId]);

  const updateGroupNameHandler = () => {
    if (name && groupId) {
      updateGroupName(groupId, name);
    }
  };

  return (
    <div
      className="upd-group-name-bg"
      onClick={() => setShowUpdateGroupName(false)}
    >
      <div
        className="upd-group-name-container"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          placeholder="Update group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="btns">
          <button id="update" onClick={updateGroupNameHandler}>
            {updGroupNameLoading ? "Updating..." : "Update"}
          </button>
          <button id="cancel" onClick={() => setShowUpdateGroupName(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateGroupName;
