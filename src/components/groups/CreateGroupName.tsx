import React, { useContext, useEffect, useState } from "react";
import { GroupContext } from "../../context/features/group";

interface propsIFace {
  isActive: boolean;
}

const CreateGroupName: React.FC<propsIFace> = ({ isActive }) => {
  const [groupName, setGroupName] = useState("");

  const { crGroupLoading, createGroup, crGroupSuccess, getGroups } =
    useContext(GroupContext);

  useEffect(() => {
    if (crGroupSuccess || isActive) {
      setGroupName("");
      getGroups();
    }
  }, [crGroupSuccess, isActive]);

  const createGroupHandler = () => {
    if (groupName) {
      createGroup(groupName);
    }
  };

  return (
    <div className="create-group">
      <input
        type="text"
        placeholder="Enter Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && createGroupHandler()}
      />
      <button
        onClick={createGroupHandler}
        id={groupName ? "cr-btn" : "cr-btn-disabled"}
      >
        {crGroupLoading ? "Creating..." : "Create"}
      </button>
    </div>
  );
};

export default CreateGroupName;
