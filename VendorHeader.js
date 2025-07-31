import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Bell, Globe } from "lucide-react";
import ProfileModal from "./ProfileModal";
import ChangePasswordModal from "./ChangePasswordModal"; // import the new modal
import Link from "next/link";

export default function VendorHeader({ profileData, handleLogout, onUpdateProfile }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePasswordChangeSuccess = () => {
    setChangePasswordModalOpen(false);
    setDropdownOpen(false);
    // Log out user or force login refresh
    handleLogout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-end justify-between">
        <div className="flex items-center space-x-4 ml-auto relative" ref={dropdownRef}>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          <Link
            href="/"
            passHref
            className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm">Live Site</span>
          </Link>

          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2 focus:outline-none"
          >
            <span className="text-sm font-medium text-gray-700">{profileData?.name || "Admin"}</span>
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src={profileData?.image || "/profile-avatar.png"}
                alt="Profile"
                width={28}
                height={28}
                className="rounded-full"
                priority={true}
              />
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setProfileModalOpen(true);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setChangePasswordModalOpen(true);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {profileModalOpen && (
        <ProfileModal
          onClose={() => setProfileModalOpen(false)}
          profileData={profileData}
          onUpdate={onUpdateProfile}
        />
      )}

      {changePasswordModalOpen && (
        <ChangePasswordModal
          onClose={() => setChangePasswordModalOpen(false)}
          onChangePassword={handlePasswordChangeSuccess}
        />
      )}
    </header>
  );
}

VendorHeader.defaultProps = {
  profileData: {
    name: "Admin",
    image: "/profile-avatar.png",
  },
};
