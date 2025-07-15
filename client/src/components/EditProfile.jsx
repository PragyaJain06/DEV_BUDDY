import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import Toast from "./Toast";
import { Calendar, Check, Edit3, Image, User, Users } from "lucide-react";
import { useState } from "react";

function EditProfile({ user }) {
  const [userInfo, setUserInfo] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    about: user?.about || "",
    gender: user?.gender || "",
    photoUrl: user?.photoUrl || "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const dispatch = useDispatch();
  const handleEditProfile = async () => {
    const payload = Object.fromEntries(
      Object.entries(userInfo).filter(
        ([, value]) => value?.toString().trim() !== ""
      )
    );

    setLoading(true);
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.data));
      setToast({ msg: res?.data?.message, status: "sus" });

      setTimeout(() => {
        setToast(null);
      }, 3000);
    } catch (err) {
      setToast({ msg: err?.response?.data?.message, status: "err" });

      setTimeout(() => {
        setToast(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      key: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      icon: <User className="w-5 h-5" />,
    },
    {
      key: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
      icon: <User className="w-5 h-5" />,
    },
    {
      key: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter your age",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      key: "photoUrl",
      label: "Photo URL",
      type: "url",
      placeholder: "Enter photo URL",
      icon: <Image className="w-5 h-5" />,
    },
  ];

  return (
    <>
      <div className="relative">
        {/* Animated background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-slate-300 via-gray-300 to-stone-300 rounded-3xl opacity-15 blur-xl"></div>

        <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-br from-slate-700 via-gray-600 to-stone-600 px-8 py-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/8 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/8 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  Edit Profile
                </h2>
                <p className="text-white/85 text-sm">
                  Update your information to get better matches
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="space-y-8">
              {/* Input Fields */}
              {inputFields.map((field) => (
                <div key={field.key} className="group">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-slate-600 transition-colors duration-200">
                      {field.icon}
                    </div>
                    <input
                      type={field.type}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg"
                      placeholder={field.placeholder}
                      value={userInfo[field.key]}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          [field.key]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ))}

              {/* Gender Selection */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Gender
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-slate-600 transition-colors duration-200">
                    <Users className="w-5 h-5" />
                  </div>
                  <select
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg appearance-none cursor-pointer"
                    value={userInfo.gender}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, gender: e.target.value })
                    }
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* About Section */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  About Me
                </label>
                <div className="relative">
                  <textarea
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg resize-none"
                    placeholder="Tell us about yourself..."
                    rows="5"
                    value={userInfo.about}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, about: e.target.value })
                    }
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-lg">
                    {userInfo.about.length}/500
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6">
                <button
                  className="w-full relative px-8 py-4 bg-gradient-to-r from-slate-600 to-gray-600 text-white font-semibold rounded-2xl hover:from-slate-700 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                  onClick={handleEditProfile}
                  disabled={loading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3 cursor-pointer">
                      <Check className="w-5 h-5" />
                      <span>Save Profile</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast msg={toast.msg} status={toast.status} />}
    </>
  );
}
export default EditProfile;
