import React, { useEffect } from "react";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { addFeed } from "../Utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (!feedData) return;
  return <div>{feedData?.length > 0 && <UserCard feedData={feedData} />}</div>;
}

export default Feed;
