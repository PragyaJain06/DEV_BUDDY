import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../Utils/constants";
import { addConnection } from "../Utils/connectionSlice";
import { rejectRequest } from "../Utils/requestSlice";
import { Check, X, User } from "lucide-react";
import Toast from "./Toast"; // import your toast component

export default function PendingRequestCard({ user, connectionId }) {
  const dispatch = useDispatch();
  const [toast, setToast] = useState(null);

  const handleReview = async (status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${connectionId}`,
        {},
        { withCredentials: true }
      );
      if (status === "accepted") {
        dispatch(addConnection(res?.data?.data));
      }
      dispatch(rejectRequest(connectionId));
      setToast({ msg: res?.data?.message, status: "sus" });
      setTimeout(() => setToast(null), 1200);
    } catch (err) {
      setToast({ msg: err?.response?.data, status: "err" });
      setTimeout(() => setToast(null), 1200);
    }
  };
  const renderCard = (user, index) => (
    <div
      key={index}
      className="group relative max-w-4xl w-full mx-auto rounded-2xl border border-gray-200 shadow-md hover:shadow-lg bg-white backdrop-blur-sm transition-all duration-300 overflow-hidden"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-300 via-sky-300 to-blue-300 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-500 z-0"></div>

      {/* Horizontal Layout */}
      <div className="relative z-10 flex flex-row items-start p-5 gap-6">
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          {user?.photoUrl ? (
            <img
              src={user?.photoUrl}
              alt={`${user?.firstName} ${user?.lastName}`}
              className="h-20 w-20 object-cover rounded-full border-4 border-white shadow-sm bg-gray-100 ring-2 ring-indigo-100"
            />
          ) : (
            <div className="h-20 w-20 flex items-center justify-center bg-gray-100 rounded-full border-4 border-white shadow-sm ring-2 ring-indigo-100">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col w-full">
          {/* Name */}
          <div className="bg-indigo-50 px-4 py-2 rounded-xl w-full mb-2">
            <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
              {user?.firstName} {user?.lastName}
            </h3>
          </div>

          {/* About + Details + Buttons in Flex */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
            <div className="text-sm text-gray-600 leading-relaxed line-clamp-2 max-w-3xl">
              {user?.about || "No description provided."}
              <div className="flex gap-4 text-xs text-gray-500 mt-2">
                <div>
                  <span className="font-medium text-gray-700">Age:</span>{" "}
                  {user?.age || "N/A"}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Gender:</span>{" "}
                  {user?.gender || "N/A"}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Skills:</span>{" "}
                  {user?.skills?.join(", ") || "N/A"}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex-shrink-0 flex gap-2 mt-3 sm:mt-0 self-end sm:self-auto">
              <button
                onClick={() => handleReview("rejected", user.id)}
                className="cursor-pointer flex items-center gap-1 px-4 py-1.5 bg-red-100 text-red-700 border border-red-200 rounded-full text-sm font-medium hover:bg-red-200 hover:text-red-800 transition"
              >
                <X className="w-4 h-4" />
                Reject
              </button>
              <button
                onClick={() => handleReview("accepted", user.id)}
                className="cursor-pointer flex items-center gap-1 px-4 py-1.5 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-full text-sm font-medium hover:bg-emerald-200 hover:text-emerald-800 transition"
              >
                <Check className="w-4 h-4" />
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* {mockUsers.map((user) => renderCard(user))} */}
          {renderCard(user)}
        </div>
      </div>
      {toast && <Toast msg={toast.msg} status={toast.status} />}
    </>
  );
}
