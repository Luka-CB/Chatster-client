import React, { useContext, useEffect, useState } from "react";
import { HiSearchCircle } from "react-icons/hi";
import { AiOutlineUsergroupAdd, AiOutlineCheck } from "react-icons/ai";
import { GroupContext } from "../../context/features/group";
import { AuthContext } from "../../context/features/auth";
import DummyGroupPic from "../../assets/images/dummy-group-pic.png";
import { ReqContext } from "../../context/features/request";
import Spinner from "../Spinner";

export interface propsIFace {
  showSearchResult: boolean;
  query: string;
  setQuery: any;
}

const SearchGroup: React.FC<propsIFace> = ({
  showSearchResult,
  query,
  setQuery,
}) => {
  const [reqIndex, setReqIndex] = useState<number | null>(null);

  const { user } = useContext(AuthContext);
  const { sendGroupRequest, sendReqSuccess } = useContext(ReqContext);

  const { searchLoading, searchedGroups, searchedGroupsCount, searchGroups } =
    useContext(GroupContext);

  const sendRequestHandler = (groupId: string, i: number) => {
    setReqIndex(i);
    sendGroupRequest(groupId);
  };

  useEffect(() => {
    if (sendReqSuccess) {
      setReqIndex(null);
      searchGroups(query);
    }
  }, [sendReqSuccess]);

  return (
    <div className="search-group" onClick={(e) => e.stopPropagation()}>
      <HiSearchCircle id="search-icon" />
      <input
        type="text"
        placeholder="search for groups"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {showSearchResult && (
        <div className="search-res">
          <div className="result-wrapper">
            <p id="result-count">
              Result: <span>{searchedGroupsCount}</span>
            </p>
            {searchLoading && <Spinner small={true} />}
            {searchedGroupsCount === 0 && <p id="no-match">No Match!</p>}
            {searchedGroups?.map((group, i) => {
              const isReqSent = group.requests?.some(
                (req) => req.from === user.id
              );

              return (
                <div className="result" key={group._id}>
                  <div className="image">
                    {group.image ? (
                      <img src={group.image} alt="group pic" />
                    ) : (
                      <img src={DummyGroupPic} alt="dummy pic" />
                    )}
                  </div>
                  <div className="info">
                    <h6 id="name" title={group.name}>
                      {group.name.length > 17
                        ? group.name.substring(0, 17) + "..."
                        : group.name}
                    </h6>
                    <h6 id="count">members: {group.members?.length}</h6>
                    <button
                      id={isReqSent ? "sent-btn" : "join-btn"}
                      onClick={() => sendRequestHandler(group._id, i)}
                    >
                      {reqIndex === i ? (
                        <span>....</span>
                      ) : isReqSent ? (
                        <>
                          <AiOutlineCheck id="check-icon" />
                          <span>Unsend</span>
                        </>
                      ) : (
                        <>
                          <AiOutlineUsergroupAdd id="join-icon" />
                          <span>Join</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchGroup;
