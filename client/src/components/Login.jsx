import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/constants";
import Toast from "./Toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/feed");
    } catch (err) {
      console.log("error while logging in:", err);
      setToast({ msg: err?.response?.data, status: "err" });
    } finally {
      setTimeout(() => {
        setToast(null);
      }, 1000);
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setToast({
        msg: "User signed up successfully. Please login to continue",
        status: "sus",
      });
      setTimeout(() => {
        setToast(null);
      }, 2000);
      setIsLogin((prev) => !prev);
      navigate("/login");
    } catch (err) {
      console.log("error while logging in:", err);
      setToast({ msg: err?.response?.data, status: "err" });
    }
  };
  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-100 py-12">
        <div
          className="card w-96 shadow-2xl border border-purple-100 bg-white/80 backdrop-blur-xl"
          style={{
            borderRadius: "2rem",
            background:
              "linear-gradient(135deg, rgba(255,78,138,0.10) 0%, rgba(143,92,255,0.08) 100%)",
            boxShadow: "0 8px 32px 0 rgba(143,92,255,0.12)",
          }}
        >
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-bold text-pink-500 mb-2">
              {isLogin ? "Sign up" : "Please Login to Continue"}
            </h2>
            <div className="w-full space-y-4">
              {isLogin && (
                <>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-purple-500 font-semibold">
                      First Name
                    </legend>
                    <input
                      type="text"
                      className="input text-black bg-pink-50 focus:ring-2 focus:ring-pink-300"
                      placeholder="Enter first name"
                      value={userInfo.firstName}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, firstName: e.target.value })
                      }
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-purple-500 font-semibold">
                      Last Name
                    </legend>
                    <input
                      type="text"
                      className="input text-black bg-pink-50 focus:ring-2 focus:ring-pink-300"
                      placeholder="Enter last name"
                      value={userInfo.lastName}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, lastName: e.target.value })
                      }
                    />
                  </fieldset>
                </>
              )}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-purple-500 font-semibold">
                  What is your Email Address
                </legend>
                <input
                  type="text"
                  className="input text-black bg-purple-50 focus:ring-2 focus:ring-purple-300"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-purple-500 font-semibold">
                  Password
                </legend>
                <input
                  type="password"
                  className="input text-black bg-purple-50 focus:ring-2 focus:ring-purple-300"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="card-actions justify-end mt-6">
              <button
                className="btn btn-primary w-full py-3 text-lg shadow-pink-100 hover:scale-105"
                onClick={isLogin ? handleSignup : handleLogin}
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </div>
          </div>
          <p
            className="m-auto mt-2 cursor-pointer text-purple-500 hover:text-pink-500 transition-colors"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "Exisiting User? Login Here" : "New User? Signup here"}
          </p>
        </div>
      </div>
      {toast && <Toast msg={toast.msg} status={toast.status} />}
    </>
  );
}

export default Login;
