import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import ProfileCard from "./ProfileCard";
import { Image, Check, Heart } from "lucide-react";
function Profile() {
  const user = useSelector((store) => store?.user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-stone-50/30 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-slate-200/20 to-gray-200/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-gray-200/20 to-stone-200/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>

      {/* Enhanced Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-700 to-gray-700 bg-clip-text text-transparent mb-4">
            My Profile
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your profile information and preferences to connect with
            amazing people
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Edit Profile Form */}
          <div className="order-2 lg:order-1">
            <EditProfile user={user} />
          </div>

          {/* Profile Preview */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Profile Preview
                </h3>
                <p className="text-gray-600">
                  This is how other users will see your profile
                </p>
              </div>
              <ProfileCard userData={user} />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Profile Tips */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 border border-gray-100 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Profile Tips for Success
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-500 to-gray-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Image className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Great Photo</h4>
              <p className="text-sm text-gray-600">
                Use a clear, recent photo where you're smiling naturally
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-stone-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Be Authentic</h4>
              <p className="text-sm text-gray-600">
                Write genuinely about your interests and personality
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-stone-500 to-slate-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Complete Info</h4>
              <p className="text-sm text-gray-600">
                Fill out all fields to get better matches and connections
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
