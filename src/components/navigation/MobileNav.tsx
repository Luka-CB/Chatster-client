import { useContext } from "react";
import { Link } from "react-router-dom";
import { SocketContext } from "../../context/features/socket";
import { StateContext } from "../../context/features/states";

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
        <div className="mob-nav-logo">
          <Link to={"/"}>
            <h1>LOGO</h1>
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
