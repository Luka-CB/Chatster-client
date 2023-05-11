import { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/chatster-logo.png";
import { SocketContext } from "../../context/features/socket";
import { StateContext } from "../../context/features/states";
import { FaTimesCircle } from "react-icons/fa";
import { useWindowSize } from "../../hooks";

interface propsIFace {
  navItems: string[];
  activeNavItem: string;
  navigationHandler: (item: string) => void;
}

const MobileNav: React.FC<propsIFace> = ({
  navItems,
  activeNavItem,
  navigationHandler,
}) => {
  const windowSize = useWindowSize();

  const { unreadGroupMsgs, unreadMsgs } = useContext(SocketContext);
  const { setShowMobileNav } = useContext(StateContext);

  const handleLink = (navItem: string) => {
    navigationHandler(navItem);
    setShowMobileNav(false);
  };

  return (
    <div
      className="mobile-navigation-bg"
      onClick={() => setShowMobileNav(false)}
    >
      <div className="mobile-navigation" onClick={(e) => e.stopPropagation()}>
        {windowSize <= 400 && window.innerWidth <= 400 ? (
          <FaTimesCircle
            id="close-icon"
            onClick={() => setShowMobileNav(false)}
          />
        ) : null}
        <div className="mob-nav-logo">
          <Link to={"/"}>
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <nav className="nav">
          {navItems.map((navItem) => (
            <h3
              key={navItem}
              className={
                navItem === activeNavItem ? "nav-item-active" : "nav-item"
              }
              onClick={() => handleLink(navItem)}
            >
              {navItem}
              {navItem !== activeNavItem && navItem !== "Profile" && (
                <>
                  {navItem === "Friends" && unreadMsgs?.length > 0 && (
                    <div className="badge">
                      <span>{unreadMsgs?.length}</span>
                    </div>
                  )}
                  {navItem === "Groups" && unreadGroupMsgs?.length > 0 && (
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
    </div>
  );
};

export default MobileNav;
