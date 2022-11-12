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
  showDeleteModal: boolean;
  setShowDeleteModal: any;
  showChatWindow: boolean;
  setShowChatWindow: any;
  showGroupRequests: boolean;
  setShowGroupRequests: any;
  showAddFriend: boolean;
  setShowAddFriend: any;
  scroll: boolean;
  setScroll: any;
}

export const StateContext = createContext({} as stateContextIFace);

const StateProvider = ({ children }: childrenIFace) => {
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [showGroup, setShowGroup] = useState(false);
  const [showUploadImage, setShowUploadImage] = useState(false);
  const [showUpdateGroupName, setShowUpdateGroupName] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showGroupRequests, setShowGroupRequests] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [scroll, setScroll] = useState(true);

  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");

  useEffect(() => {
    if (groupId) setShowGroup(true);
  }, [groupId]);

  useEffect(() => {
    if (showGroup) {
      document.body.style.overflow = "hidden";
      setScroll(false);
    } else {
      document.body.style.overflow = "unset";
      setScroll(true);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showGroup]);

  const contextData = {
    setShowGroup,
    showGroup,
    setShowUploadImage,
    showUploadImage,
    setShowUpdateGroupName,
    showUpdateGroupName,
    setShowDeleteModal,
    showDeleteModal,
    setShowChatWindow,
    showChatWindow,
    showGroupRequests,
    setShowGroupRequests,
    showAddFriend,
    setShowAddFriend,
    scroll,
    setScroll,
  };

  return (
    <StateContext.Provider value={contextData}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
