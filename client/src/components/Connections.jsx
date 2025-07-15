// import axios from "axios";
// import React, { useEffect } from "react";
// import { BASE_URL } from "../Utils/constants";
// import { addConnection } from "../Utils/connectionSlice";
// import { useDispatch, useSelector } from "react-redux";
// import UserCard from "./UserCard";

// function Connections() {
//   const dispatch = useDispatch();
//   const connection = useSelector((store) => store?.connections);
//   const getConnection = async () => {
//     try {
//       const res = await axios(BASE_URL + "/user/connections", {
//         withCredentials: true,
//       });
//       dispatch(addConnection(res?.data?.data));
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     getConnection();
//   }, []);
//   if (!connection) return;
//   if (connection.length === 0)
//     return (
//       <h1 className="flex items-center justify-center min-h-screen text-3xl">
//         No connections found!
//       </h1>
//     );
//   return (
//     <div className="flex flex-col items-center justify-center m-3">
//       <h1>Here are your connections:</h1>
//       <UserCard
//         feedData={connection}
//         hideBtn={true}
//         className={"flex flex-col justify-center gap-6 m-10"}
//       />
//     </div>
//   );
// }

// export default Connections;

import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../Utils/constants";
import { addConnection } from "../Utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import ConnectionCard from "./ConnectionCard";

function Connections() {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store?.connections);

  const getConnection = async () => {
    try {
      const res = await axios(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnection();
  }, []);

  if (!connection) return;

  if (connection.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No connections yet!
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Start exploring profiles to make meaningful connections. Your
              journey to finding amazing people starts here!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Connections
            </h1>
            <p className="text-gray-600">
              You have {connection.length} amazing{" "}
              {connection.length === 1 ? "connection" : "connections"}
            </p>
          </div>
        </div>
      </div>

      {/* Connections grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ConnectionCard connectionData={connection} />
      </div>
    </div>
  );
}

export default Connections;
