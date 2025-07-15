import {
  Camera,
  Heart,
  Info,
  MessageCircle,
  Star,
  User,
  Users,
  Check,
} from "lucide-react";
import { useState } from "react";

function ProfileCard({ userData }) {
  const user = userData || {};
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="relative">
      {/* Enhanced background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-slate-300 via-gray-300 to-stone-300 rounded-3xl opacity-20 blur-xl"></div>

      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-br from-slate-700 via-gray-600 to-stone-600 h-40 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/8 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/8 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-8 h-8 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Star className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Profile Image */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-slate-500 to-gray-500 rounded-full opacity-60 blur-md group-hover:opacity-80 transition-opacity duration-300"></div>
              <img
                src={user?.photoUrl}
                alt={`${user?.firstName} ${user?.lastName}`}
                className="relative h-32 w-32 object-cover rounded-full border-4 border-white shadow-xl bg-gray-100 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-slate-500 to-gray-500 text-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer">
                <Camera className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-8 pt-20">
          {/* Name and Info */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {user?.firstName} {user?.lastName}
            </h2>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                <User className="w-4 h-4" />
                {user?.age} years old
              </span>
              <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                <Users className="w-4 h-4" />
                {user?.gender}
              </span>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5" />
              About Me
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed bg-gradient-to-r from-gray-50 to-stone-50 p-4 rounded-2xl border border-gray-100">
              {user?.about ||
                "No description available. Tell us about yourself!"}
            </p>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow duration-300">
              <div className="text-2xl font-bold text-slate-600">100%</div>
              <div className="text-xs text-gray-600">Complete</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-stone-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="text-2xl font-bold text-gray-600">Active</div>
              <div className="text-xs text-gray-600">Status</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 hover:shadow-lg transition-shadow duration-300">
              <div className="text-2xl font-bold text-emerald-600">
                Verified
              </div>
              <div className="text-xs text-gray-600">Profile</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex-1 py-3 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                isLiked
                  ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Heart
                className={`w-5 h-5 mx-auto ${isLiked ? "fill-current" : ""}`}
              />
            </button>
            <button className="flex-1 py-3 px-6 bg-gradient-to-r from-slate-600 to-gray-600 text-white rounded-2xl font-semibold hover:from-slate-700 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              <MessageCircle className="w-5 h-5 mx-auto" />
            </button>
          </div>

          {/* Profile Completion */}
          <div className="bg-gradient-to-r from-slate-50 via-gray-50 to-stone-50 p-6 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-gray-500 rounded-2xl flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">
                  Profile Looking Amazing!
                </h4>
                <p className="text-sm text-gray-600">
                  Your profile is complete and ready to make great connections
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Main Profile Component

export default ProfileCard;
