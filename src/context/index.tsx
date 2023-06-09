import StateProvider from "./features/states";
import AuthProvider from "./features/auth";
import UserProvider from "./features/users";
import RequestProvider from "./features/request";
import FriendProvider from "./features/friend";
import SocketProvider from "./features/socket";
import ChatProvider from "./features/chat";
import MessageProvider from "./features/message";
import GroupProvider from "./features/group";
import UnreadMsgProvider from "./features/unreadMsg";
import UnreadGroupMsgProvider from "./features/unreadGroupMsg";
import UploadImageProvider from "./features/image";

const ContextProvider = ({ children }: any) => {
  return (
    <StateProvider>
      <AuthProvider>
        <UserProvider>
          <RequestProvider>
            <SocketProvider>
              <FriendProvider>
                <GroupProvider>
                  <ChatProvider>
                    <MessageProvider>
                      <UnreadMsgProvider>
                        <UnreadGroupMsgProvider>
                          <UploadImageProvider>{children}</UploadImageProvider>
                        </UnreadGroupMsgProvider>
                      </UnreadMsgProvider>
                    </MessageProvider>
                  </ChatProvider>
                </GroupProvider>
              </FriendProvider>
            </SocketProvider>
          </RequestProvider>
        </UserProvider>
      </AuthProvider>
    </StateProvider>
  );
};

export default ContextProvider;
