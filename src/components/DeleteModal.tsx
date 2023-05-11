import { useContext } from "react";
import { StateContext } from "../context/features/states";
import Spinner from "./Spinner";

interface propsIFace {
  text: string;
  textBold: string;
  deleteFunction?: () => void;
  delLoading?: boolean;
}

const DeleteModal: React.FC<propsIFace> = ({
  text,
  textBold,
  delLoading,
  deleteFunction,
}) => {
  const { setShowDeleteModal } = useContext(StateContext);

  return (
    <div className="del-warning-bg" onClick={() => setShowDeleteModal(false)}>
      <div
        className="del-warning-container"
        onClick={(e) => e.stopPropagation()}
      >
        {delLoading ? (
          <div className="spinner-wrapper">
            <Spinner small={true} />
          </div>
        ) : null}
        <p id="warn-text">
          {text} <b>{textBold}</b>
        </p>
        <div className="btns">
          <button id="yes" onClick={deleteFunction}>
            Yes
          </button>
          <button id="no" onClick={() => setShowDeleteModal(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
