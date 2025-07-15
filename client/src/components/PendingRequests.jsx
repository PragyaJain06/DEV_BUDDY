import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest } from "../Utils/requestSlice";
import { BASE_URL } from "../Utils/constants";
import PendingRequestCard from "./PendingRequestCard";

function PendingRequests() {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store?.request);
  const getRequests = async () => {
    try {
      const res = await axios(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(acceptRequest(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);
  if (!connection || connection.length === 0) {
    return (
      <h1 className="flex items-center justify-center min-h-screen text-3xl">
        No pending request found!
      </h1>
    );
  }

  const pendingRequest = connection?.map((item) => ({
    ...item.fromUser,
    connectionId: item._id,
  }));
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Pending Requests</h1>
      <div className="flex flex-col justify-center gap-8">
        {pendingRequest.map((user, idx) => (
          <PendingRequestCard
            key={user.connectionId || idx}
            user={user}
            connectionId={user.connectionId}
          />
        ))}
      </div>
    </div>
  );
}

export default PendingRequests;
