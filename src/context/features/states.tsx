import { createContext, ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface childrenIFace {
  children: ReactNode;
}

interface stateContextIFace {
  showGroupHandler: (value: boolean) => void;
  showUploadImageHandler: (value: boolean) => void;
  showUpdateGroupNameHandler: (value: boolean) => void;
  showDeleteModalHandler: (value: boolean) => void;
  showChatWindowHandler: (value: boolean) => void;
  showGroup: boolean;
  showUploadImage: boolean;
  showUpdateGroupName: boolean;
  showDeleteModal: boolean;
  showChatWindow: boolean;
  showGroupRequests: boolean;
  setShowGroupRequests: any;
  showAddFriend: boolean;
  setShowAddFriend: any;
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

  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");

  useEffect(() => {
    if (groupId) setShowGroup(true);
  }, [groupId]);

  const showChatWindowHandler = (value: boolean) => {
    setShowChatWindow(value);
  };

  const showGroupHandler = (value: boolean) => setShowGroup(value);

  const showUploadImageHandler = (value: boolean) => setShowUploadImage(value);

  const showUpdateGroupNameHandler = (value: boolean) =>
    setShowUpdateGroupName(value);

  const showDeleteModalHandler = (value: boolean) => setShowDeleteModal(value);

  const contextData = {
    showGroupHandler,
    showGroup,
    showUploadImageHandler,
    showUploadImage,
    showUpdateGroupNameHandler,
    showUpdateGroupName,
    showDeleteModalHandler,
    showDeleteModal,
    showChatWindowHandler,
    showChatWindow,
    showGroupRequests,
    setShowGroupRequests,
    showAddFriend,
    setShowAddFriend,
  };

  return (
    <StateContext.Provider value={contextData}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
