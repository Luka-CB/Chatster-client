import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GroupContext } from "../../context/features/group";
import { StateContext } from "../../context/features/states";
import Spinner from "../Spinner";

interface propsIFace {
  textBold: string;
  groupId: string | "";
}

const DeleteModal: React.FC<propsIFace> = ({ textBold, groupId }) => {
  const navigate = useNavigate();

  const { setShowDeleteGroupModal, setShowGroup, setShowChatWindow } =
    useContext(StateContext);
  const { delGroupLoading, delGroupSuccess, deleteGroup, getGroups } =
    useContext(GroupContext);

  useEffect(() => {
    if (delGroupSuccess) {
      setShowGroup(false);
      setShowChatWindow(false);
      navigate({
        pathname: "/chat",
        search: ``,
      });
      getGroups();
    }
  }, [delGroupSuccess]);

  return (
    <div
      className="del-warning-bg"
      onClick={() => setShowDeleteGroupModal(false)}
    >
      {delGroupLoading && <Spinner small={true} />}
      <div
        className="del-warning-container"
        onClick={(e) => e.stopPropagation()}
      >
        <p id="warn-text">
          Are you sure? You are deleting <b>{textBold}</b>
        </p>
        <div className="btns">
          <button id="yes" onClick={() => deleteGroup(groupId)}>
            Yes
          </button>
          <button id="no" onClick={() => setShowDeleteGroupModal(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
