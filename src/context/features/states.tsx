import { createContext, ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface childrenIFace {
  children: ReactNode;
}

interface stateContextIFace {
  showGroup: boolean;
  setShowGroup: any;
  showUploadImage: boolean;
  setShowUploadImage: any;
  showUpdateGroupName: boolean;
  setShowUpdateGroupName: any;
  setShowUpdateProfile: any;
  showUpdateProfile: boolean;
  showDeleteModal: boolean;
  setShowDeleteModal: any;
  showDeleteGroupModal: boolean;
  setShowDeleteGroupModal: any;
  showChatWindow: boolean;
  setShowChatWindow: any;
  showGroupRequests: boolean;
  setShowGroupRequests: any;
  showAddFriend: boolean;
  setShowAddFriend: any;
  showMobileNav: boolean;
  setShowMobileNav: any;
  scroll: boolean;
  setScroll: any;
  redirectRoute: string;
  setRedirectRoute: any;
}

export const StateContext = createContext({} as stateContextIFace);

const StateProvider = ({ children }: childrenIFace) => {
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [showGroup, setShowGroup] = useState(false);
  const [showUploadImage, setShowUploadImage] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [showUpdateGroupName, setShowUpdateGroupName] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [showGroupRequests, setShowGroupRequests] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [scroll, setScroll] = useState(true);
  const [redirectRoute, setRedirectRoute] = useState(
    localStorage.getItem("redirectRoute")
      ? JSON.parse(localStorage.getItem("redirectRoute") || "")
      : ""
  );

  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");

  useEffect(() => {
    if (groupId) setShowGroup(true);
  }, [groupId]);

  useEffect(() => {
    if (showGroup || showUpdateProfile || showUploadImage) {
      document.body.style.overflow = "hidden";
      setScroll(false);
    } else {
      document.body.style.overflow = "unset";
      setScroll(true);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showGroup, showUpdateProfile, showUploadImage]);

  const contextData = {
    setShowGroup,
    showGroup,
    setShowUploadImage,
    showUploadImage,
    setShowUpdateGroupName,
    showUpdateGroupName,
    setShowUpdateProfile,
    showUpdateProfile,
    setShowDeleteModal,
    showDeleteModal,
    setShowDeleteGroupModal,
    showDeleteGroupModal,
    setShowChatWindow,
    showChatWindow,
    showGroupRequests,
    setShowGroupRequests,
    showAddFriend,
    setShowAddFriend,
    showMobileNav,
    setShowMobileNav,
    scroll,
    setScroll,
    redirectRoute,
    setRedirectRoute,
  };

  return (
    <StateContext.Provider value={contextData}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
