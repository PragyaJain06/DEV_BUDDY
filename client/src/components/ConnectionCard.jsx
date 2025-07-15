import React from "react";

function ConnectionCard({ connectionData, className }) {
  return (
    <div
      className={
        className
          ? className
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6"
      }
    >
      {(Array.isArray(connectionData) ? connectionData : [connectionData])?.map(
        (connection, index) => (
          <div key={index} className="group relative">
            {/* Subtle glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>

            {/* Main card */}
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100/50 backdrop-blur-sm">
              {/* Header with profile image */}
              <div className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-6 pb-8">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-rose-200/20 to-pink-200/20 rounded-full translate-y-8 -translate-x-8"></div>

                {/* Profile image */}
                <div className="relative flex justify-center">
                  <div className="relative">
                    <img
                      src={connection?.photoUrl}
                      alt={`${connection?.firstName} ${connection?.lastName}`}
                      className="h-24 w-24 object-cover rounded-full border-4 border-white shadow-lg bg-gray-100 ring-2 ring-pink-100/60"
                    />
                    {/* Connection badge */}
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full p-1.5 shadow-lg">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-5 -mt-4 relative z-10">
                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2 tracking-tight">
                  {connection?.firstName} {connection?.lastName}
                </h3>

                {/* About */}
                <p className="text-gray-600 text-center text-sm mb-4 leading-relaxed min-h-[2.5rem] line-clamp-2">
                  {connection?.about || "Connected user"}
                </p>

                {/* Info row */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">Age:</span>
                    <span className="text-sm font-medium text-gray-700">
                      {connection?.age}
                    </span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">Gender:</span>
                    <span className="text-sm font-medium text-gray-700">
                      {connection?.gender}
                    </span>
                  </div>
                </div>

                {/* Connected status */}
                <div className="flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200/50">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">
                    Connected
                  </span>
                </div>
              </div>

              {/* Hover overlay for interaction */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default ConnectionCard;
