import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import Toast from "./Toast";
import { addConnection } from "../Utils/connectionSlice";
import { rejectRequest } from "../Utils/requestSlice";
import { removeFeed } from "../Utils/feedSlice";

function UserCard({ feedData, hideBtn, changeBtn, className }) {
  const dispatch = useDispatch();
  const [toast, setToast] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = (id, isLoading) => {
    setLoadingStates((prev) => ({ ...prev, [id]: isLoading }));
  };

  const handleReview = async (status, id) => {
    setLoading(id, true);
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      if (status === "accepted") {
        dispatch(addConnection(res?.data?.data));
      }
      dispatch(rejectRequest(id));
      setTimeout(() => {
        setToast({ msg: res?.data?.message, status: "sus" });
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        setToast({ msg: err?.response?.data, status: "err" });
      }, 1000);
      console.log(err);
    } finally {
      setLoading(id, false);
    }
  };

  const handleRequest = async (status, id) => {
    setLoading(id, true);
    try {
      const res = await axios.post(
        BASE_URL + `/request/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(res?.data?.data);
      dispatch(removeFeed(id));
      setToast({ msg: res?.data?.message, status: "sus" });
      setTimeout(() => {
        setToast(null);
      }, 1000);
    } catch (err) {
      setToast({ msg: err?.response?.data, status: "err" });
      setTimeout(() => {
        setToast(null);
      }, 1000);
      console.log(err);
    } finally {
      setLoading(id, false);
    }
  };

  return (
    <>
      <div
        className={
          className ? className : "flex flex-wrap justify-center gap-8 m-10"
        }
      >
        {(Array.isArray(feedData) ? feedData : [feedData])?.map(
          (item, index) => (
            <div key={index} className="group relative">
              {/* Background glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>

              {/* Main card */}
              <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-80 overflow-hidden border border-gray-100">
                {/* Header with gradient background */}
                <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-6 pt-8 pb-16">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200/20 to-blue-200/20 rounded-full translate-y-12 -translate-x-12"></div>

                  {/* Profile image */}
                  <div className="relative flex justify-center">
                    <div className="relative">
                      <img
                        src={item?.photoUrl}
                        alt="User profile"
                        className="h-28 w-28 object-cover rounded-full border-4 border-white shadow-lg bg-gray-100 ring-4 ring-blue-100/50"
                      />
                      {/* Online indicator */}
                      <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-3 border-white shadow-lg"></div>
                    </div>
                  </div>
                </div>

                {/* Card content */}
                <div className="px-6 py-6 -mt-8 relative z-10">
                  {/* Name */}
                  <h2 className="text-xl font-bold text-gray-900 text-center mb-2 tracking-tight">
                    {item?.firstName} {item?.lastName}
                  </h2>

                  {/* About */}
                  <p className="text-gray-600 text-center text-sm mb-4 leading-relaxed min-h-[2.5rem] line-clamp-2">
                    {item?.about || "No description available"}
                  </p>

                  {/* Info badges */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      {item?.gender}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                      {item?.age} years
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

                  {/* Action buttons */}
                  {!hideBtn && !changeBtn && (
                    <div className="flex gap-3 justify-center">
                      <button
                        className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        onClick={() => handleRequest("ignored", item?._id)}
                        disabled={loadingStates[item?._id]}
                      >
                        {loadingStates[item?._id] ? (
                          <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : (
                          "Ignore"
                        )}
                      </button>
                      <button
                        className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        onClick={() => handleRequest("interested", item?._id)}
                        disabled={loadingStates[item?._id]}
                      >
                        {loadingStates[item?._id] ? (
                          <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : (
                          "Interested"
                        )}
                      </button>
                    </div>
                  )}

                  {changeBtn && (
                    <div className="flex gap-3 justify-center">
                      <button
                        className="flex-1 px-4 py-2.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        onClick={() =>
                          handleReview("rejected", item?.connectionId)
                        }
                        disabled={loadingStates[item?.connectionId]}
                      >
                        {loadingStates[item?.connectionId] ? (
                          <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : (
                          "Reject"
                        )}
                      </button>
                      <button
                        className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        onClick={() =>
                          handleReview("accepted", item?.connectionId)
                        }
                        disabled={loadingStates[item?.connectionId]}
                      >
                        {loadingStates[item?.connectionId] ? (
                          <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        ) : (
                          "Accept"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {toast && <Toast msg={toast.msg} status={toast.status} />}
    </>
  );
}

export default UserCard;
