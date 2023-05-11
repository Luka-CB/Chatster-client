import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/features/states";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import Friends from "./Friends";
import Groups from "./groups/Groups";
import Logo from "../assets/images/chatster-logo-var-2-with-shadow.png";
import MobileNav from "./navigation/MobileNav";
import RegularNav from "./navigation/RegularNav";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { SocketContext } from "../context/features/socket";
import { UnreadGroupMsgContext } from "../context/features/unreadGroupMsg";
import { UnreadMsgContext } from "../context/features/unreadMsg";
import { useWindowSize } from "../hooks";

const navItems = ["Profile", "Friends", "Groups"];

const ChatActivities = () => {
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isFriendsActive, setIsFriendsActive] = useState(false);
  const [isGroupsActive, setIsGroupsActive] = useState(false);

  const windowSize = useWindowSize();

  const [activeNavItem, setActiveNavItem] = useState(
    JSON.parse(localStorage.getItem("activeNavItem") || "Profile")
  );

  const { scroll, showMobileNav, setShowMobileNav } = useContext(StateContext);
  const { unreadGroupMsgs, unreadMsgs, setUnreadMsgs, setUnreadGroupMsgs } =
    useContext(SocketContext);
  const { fetchUnreadGroupMsgs, dataBaseUnreadGroupMsgs } = useContext(
    UnreadGroupMsgContext
  );
  const { fetchUnreadMsgs, dataBaseUnreadMsgs } = useContext(UnreadMsgContext);

  const navigationHandler = (item: string) => {
    item === "Profile"
      ? (setIsProfileActive(true),
        localStorage.setItem("activeNavItem", JSON.stringify(item)))
      : setIsProfileActive(false);
    item === "Friends"
      ? (setIsFriendsActive(true),
        localStorage.setItem("activeNavItem", JSON.stringify(item)))
      : setIsFriendsActive(false);
    item === "Groups"
      ? (setIsGroupsActive(true),
        localStorage.setItem("activeNavItem", JSON.stringify(item)))
      : setIsGroupsActive(false);
  };

  useEffect(() => {
    setActiveNavItem(
      JSON.parse(localStorage.getItem("activeNavItem") || "Profile")
    );
  }, [navigationHandler]);

  useEffect(() => {
    activeNavItem === "Profile"
      ? setIsProfileActive(true)
      : setIsProfileActive(false);
    activeNavItem === "Friends"
      ? setIsFriendsActive(true)
      : setIsFriendsActive(false);
    activeNavItem === "Groups"
      ? setIsGroupsActive(true)
      : setIsGroupsActive(false);
  });

  useEffect(() => {
    fetchUnreadGroupMsgs();
    fetchUnreadMsgs();
  }, []);

  useEffect(() => {
    if (dataBaseUnreadMsgs) {
      setUnreadMsgs(dataBaseUnreadMsgs);
    }
  }, [dataBaseUnreadMsgs]);

  useEffect(() => {
    if (dataBaseUnreadGroupMsgs) setUnreadGroupMsgs(dataBaseUnreadGroupMsgs);
  }, [dataBaseUnreadGroupMsgs]);

  return (
    <div className={scroll ? "chat-activities c-a-scroll" : "chat-activities"}>
      {windowSize < 600 && window.innerWidth < 600 ? (
        <div className="mob-nav">
          <div className="mob-nav-logo">
            <Link to={"/"}>
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <button
            className="menu"
            onClick={() => {
              setShowMobileNav(true);
            }}
          >
            <BsFillMenuButtonWideFill id="menuIcon" />
            {unreadGroupMsgs.length + unreadMsgs.length > 0 &&
              !showMobileNav && (
                <div className="badge">
                  <span>
                    {unreadGroupMsgs.length + unreadMsgs.length > 9
                      ? "9+"
                      : unreadGroupMsgs.length + unreadMsgs.length}
                  </span>
                </div>
              )}
          </button>
        </div>
      ) : (
        <RegularNav
          navItems={navItems}
          activeNavItem={activeNavItem}
          navigationHandler={navigationHandler}
        />
      )}
      {isFriendsActive && <Friends isActive={isFriendsActive} />}
      {isProfileActive && <Profile />}
      {isGroupsActive && <Groups isActive={isGroupsActive} />}
      {showMobileNav && (
        <MobileNav
          navItems={navItems}
          activeNavItem={activeNavItem}
          navigationHandler={navigationHandler}
        />
      )}
    </div>
  );
};

export default ChatActivities;
