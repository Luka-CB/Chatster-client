interface propsIFace {
  small?: boolean;
}

const Spinner: React.FC<propsIFace> = ({ small = false }) => {
  return (
    <div className="spinner-container">
      {small ? (
        <span className="loader"></span>
      ) : (
        <div className="lds-default ">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Spinner;
