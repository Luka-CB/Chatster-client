import { createContext, ReactNode, useContext, useState } from "react";
import axios from "../../utils";
import { AuthContext } from "./auth";
import { formatDistanceToNow } from "date-fns";

interface childrenIFace {
  children: ReactNode;
}

export interface userIFace {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  friends: string[];
  friendRequests: string[];
  mySentRequests: string[];
  hasRequest: boolean;
  hasSentRequest: boolean;
  isFriend: boolean;
  createdAt: string;
  password: string;
  providerId: string;
}

interface updUserData {
  username: string;
  email: string;
  password: string;
}

interface userContextIFace {
  searchResult: userIFace[];
  searchResCount: number;
  profileInfo: userIFace;
  getSearchUsers: (q: string) => void;
  getProfile: () => void;
  updateProfile: (userData: updUserData) => void;
  deleteUser: () => void;
  searchLoading: boolean;
  updLoading: boolean;
  updSuccess: boolean;
  setUpdSuccess: any;
  updError: string | null;
  delLoading: boolean;
  delSuccess: boolean;
  setDelSuccess: any;
}

export const UserContext = createContext({} as userContextIFace);

const UserProvider = ({ children }: childrenIFace) => {
  const { user } = useContext(AuthContext);

  const [profileInfo, setProfileInfo] = useState({} as userIFace);

  const [updLoading, setUpdLoading] = useState(false);
  const [updSuccess, setUpdSuccess] = useState(false);
  const [updError, setUpdError] = useState(null);

  const [searchResult, setSearchResult] = useState<userIFace[]>([]);
  const [searchResCount, setSearchResCount] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);

  const [delLoading, setDelLoading] = useState(false);
  const [delSuccess, setDelSuccess] = useState(false);

  const getProfile = async () => {
    try {
      const { data } = await axios.get(`/api/users/profile`);

      if (data) {
        const createdAt = formatDistanceToNow(new Date(data.createdAt));
        const userData = {
          ...data,
          createdAt,
        };

        setProfileInfo(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (userData: updUserData) => {
    setUpdLoading(true);

    try {
      const { data } = await axios.put(`/api/users/profile/update`, userData);

      if (data) {
        setUpdLoading(false);
        setUpdSuccess(true);
      }
    } catch (error: any) {
      setUpdLoading(false);
      error.response && error.response.data.message
        ? setUpdError(error.response.data.message)
        : setUpdError(error.message);
    }
  };

  const getSearchUsers = async (q: string) => {
    try {
      setSearchLoading(true);

      const { data } = await axios.get(`/api/users/search?q=${q}`);

      if (data) {
        const newData = data.users.map((userData: userIFace) => {
          const requestSenderIds = userData.friendRequests.map(
            (fr: any) => fr.from
          );

          const requestSentToIds = userData.mySentRequests.map(
            (msr: any) => msr.to
          );

          const friendIds = userData.friends.map((friend: any) => friend);

          let hasRequest;
          let hasSentRequest;
          let isFriend;

          if (requestSenderIds.includes(user.id)) {
            hasRequest = true;
          } else {
            hasRequest = false;
          }

          if (requestSentToIds.includes(user.id)) {
            hasSentRequest = true;
          } else {
            hasSentRequest = false;
          }

          if (friendIds.includes(user.id)) {
            isFriend = true;
          } else {
            isFriend = false;
          }

          return { ...userData, hasRequest, hasSentRequest, isFriend };
        });

        setSearchLoading(false);
        setSearchResult(newData);
        setSearchResCount(data.count);
      }
    } catch (error) {
      setSearchLoading(false);
      console.log(error);
    }
  };

  const deleteUser = async () => {
    setDelLoading(true);
    setDelSuccess(false);

    try {
      const { data } = await axios.delete("/api/users/delete");

      if (data) {
        setDelLoading(false);
        setDelSuccess(true);
      }
    } catch (error) {
      setDelLoading(false);
      console.log(error);
    }
  };

  const contextData = {
    searchResult,
    getSearchUsers,
    searchLoading,
    searchResCount,
    getProfile,
    profileInfo,
    updateProfile,
    updLoading,
    updSuccess,
    setUpdSuccess,
    updError,
    delLoading,
    delSuccess,
    setDelSuccess,
    deleteUser,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
