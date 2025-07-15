import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/constants";
import Toast from "./Toast";
import { removeUser } from "../Utils/userSlice";

function Navbar() {
  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections);
  const request = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      setToast({ msg: res.data.message || "Logged out", status: "sus" });
      dispatch(removeUser());
      navigate("/login");
      setTimeout(() => {
        setToast(null);
      }, 1000);
    } catch (err) {
      setToast({
        msg: err?.response?.data?.message || "Logout failed",
        status: "err",
      });
    }
  };
  return (
    <>
      <div
  className="navbar shadow-lg px-6 py-2 sticky top-0 z-50"
  style={{
    background:
      'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: '2px solid #f3e8ff',
    boxShadow: '0 4px 24px 0 rgba(143,92,255,0.08)',
  }}
>
  <div className="flex-1">
    <Link
      to={"/feed"}
      className="btn btn-ghost text-2xl font-extrabold tracking-tight text-pink-500 hover:text-purple-500 transition-colors"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      <span className="inline-block align-middle mr-2">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#ff4e8a"/><path d="M7 13c1.5 2 5.5 2 7 0" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="10" r="1" fill="#fff"/><circle cx="15" cy="10" r="1" fill="#fff"/></svg>
      </span>
      Dev Buddy
    </Link>
  </div>
  {user && (
    <div className="flex gap-3 items-center">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered w-32 md:w-48 bg-white/80 border-pink-200 focus:ring-2 focus:ring-pink-300"
        style={{ borderRadius: '999px', fontFamily: 'Poppins, sans-serif' }}
      />
      <p className="hidden md:block font-medium text-purple-500">
        Welcome, {user?.firstName + ' ' + user?.lastName}
      </p>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform"
        >
          <div className="w-12 h-12 rounded-full border-4 border-pink-200 shadow-lg overflow-hidden">
            <img
              alt="User Avatar"
              src={user?.photoUrl}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-white/95 backdrop-blur-lg rounded-2xl z-10 mt-3 w-56 p-3 shadow-lg border border-purple-100"
        >
          <li>
            <Link to={"/profile"} className="flex justify-between items-center text-purple-500 font-semibold">
              <span>Profile</span>
              <span className="badge bg-pink-200 text-pink-700">New</span>
            </Link>
          </li>
          <li>
            <Link
              to="/connections"
              className="flex justify-between gap-2 text-purple-500 font-semibold"
            >
              Connections
              {connections?.length > 0 && (
                <span className="badge badge-circle bg-pink-500 text-white">
                  {connections.length > 99 ? '99+' : connections.length}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link
              to={"/pending/requests"}
              className="flex justify-between gap-2 text-purple-500 font-semibold"
            >
              Pending Requests
              {request?.length > 0 && (
                <span className="badge badge-circle bg-purple-500 text-white">
                  {request.length > 99 ? '99+' : request.length}
                </span>
              )}
            </Link>
          </li>
          <li>
            <a className="text-pink-500 font-bold hover:text-purple-500" onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  )}
</div>
      {toast && <Toast msg={toast.msg} status={toast.status} />}
    </>
  );
}

export default Navbar;
