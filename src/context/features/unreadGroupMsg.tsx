import { createContext, ReactNode, useState } from "react";
import axios from "axios";

interface childrenIFace {
  children: ReactNode;
}

interface unreadGroupMsgsIFace {
  message: string;
  senderId: string;
  recieverIds: string[];
  groupId: string;
}

interface unreadGroupMsgContextIFace {
  dataBaseUnreadGroupMsgs: unreadGroupMsgsIFace[];
  createUnreadGroupMsg: (msgData: unreadGroupMsgsIFace) => void;
  fetchUnreadGroupMsgs: () => void;
  removeUnreadGroupMsgs: (groupId: string) => void;
  crUnreadGroupMsgSuccess: boolean;
}

export const UnreadGroupMsgContext = createContext(
  {} as unreadGroupMsgContextIFace
);

const UnreadGroupMsgProvider = ({ children }: childrenIFace) => {
  const [dataBaseUnreadGroupMsgs, setDataBaseUnreadGroupMsgs] = useState<
    unreadGroupMsgsIFace[]
  >([]);
  const [crUnreadGroupMsgSuccess, setCrUnreadGroupMsgSuccess] = useState(false);

  const createUnreadGroupMsg = async (msgData: unreadGroupMsgsIFace) => {
    setCrUnreadGroupMsgSuccess(false);

    try {
      const { data } = await axios.post(
        "/api/unread-group-msgs/create",
        msgData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (data) setCrUnreadGroupMsgSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUnreadGroupMsgs = async () => {
    try {
      const { data } = await axios.get(`/api/unread-group-msgs/fetch`, {
        withCredentials: true,
      });

      if (data) setDataBaseUnreadGroupMsgs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeUnreadGroupMsgs = async (groupId: string) => {
    try {
      await axios.delete(`/api/unread-group-msgs/remove/${groupId}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const contextData = {
    dataBaseUnreadGroupMsgs,
    createUnreadGroupMsg,
    fetchUnreadGroupMsgs,
    crUnreadGroupMsgSuccess,
    removeUnreadGroupMsgs,
  };

  return (
    <UnreadGroupMsgContext.Provider value={contextData}>
      {children}
    </UnreadGroupMsgContext.Provider>
  );
};

export default UnreadGroupMsgProvider;
