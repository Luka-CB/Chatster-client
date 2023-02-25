import { useContext } from "react";
import { Link } from "react-router-dom";
import { SocketContext } from "../../context/features/socket";

interface propsIFace {
  navItems: string[];
  activeNavItem: string;
  navigationHandler: (item: string) => void;
}

const RegularNav: React.FC<propsIFace> = ({
  navItems,
  activeNavItem,
  navigationHandler,
}) => {
  const { unreadGroupMsgs, unreadMsgs } = useContext(SocketContext);

  return (
    <div className="navigation">
      <div className="logo">
        <Link to={"/"}>
          <h1>LOGO</h1>
        </Link>
      </div>
      <nav>
        {navItems.map((item) => (
          <h3
            key={item}
            className={item === activeNavItem ? "nav-item-active" : "nav-item"}
            onClick={() => {
              navigationHandler(item);
            }}
          >
            {item}
            {item !== activeNavItem && item !== "Profile" && (
              <>
                {item === "Friends" && unreadMsgs?.length > 0 && (
                  <div className="badge">
                    <span>{unreadMsgs?.length}</span>
                  </div>
                )}
                {item === "Groups" && unreadGroupMsgs?.length > 0 && (
                  <div className="badge">
                    <span>{unreadGroupMsgs?.length}</span>
                  </div>
                )}
              </>
            )}
          </h3>
        ))}
      </nav>
    </div>
  );
};

export default RegularNav;
