import { useContext } from "react";
import { StateContext } from "../context/features/states";

interface propsIFace {
  text: string;
  textBold: string;
  deleteFunction?: () => void;
  delSuccess?: boolean;
  delLoading?: boolean;
}

const DeleteModal: React.FC<propsIFace> = ({
  text,
  textBold,
  delLoading,
  delSuccess,
  deleteFunction,
}) => {
  const { setShowDeleteModal } = useContext(StateContext);

  return (
    <div className="del-warning-bg" onClick={() => setShowDeleteModal(false)}>
      <div
        className="del-warning-container"
        onClick={(e) => e.stopPropagation()}
      >
        <p id="warn-text">
          {text} <b>{textBold}</b>
        </p>
        <div className="btns">
          <button id="yes">Yes</button>
          <button id="no" onClick={() => setShowDeleteModal(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
