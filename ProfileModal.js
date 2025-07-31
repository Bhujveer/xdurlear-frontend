import Image from "next/image";
import React, { useState, useEffect } from "react";

// Edit Profile Form Component
function EditProfileForm({ profile, onUpdate }) {
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    image: profile.image,
  });
  const [previewImage, setPreviewImage] = useState(profile.image);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(formData);
    }
  };

  useEffect(() => {
    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      image: profile.image,
    });
    setPreviewImage(profile.image);
  }, [profile]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <label
          htmlFor="profileImage"
          className="cursor-pointer w-20 h-20 rounded-full border-4 border-green-200 overflow-hidden bg-gray-100 flex items-center justify-center"
          title="Change profile picture"
        >
          {previewImage ? (
            <Image
              src={previewImage}
              alt="Profile Preview"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-green-200 flex items-center justify-center text-green-700 font-bold">
              ?
            </div>
          )}
        </label>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
            placeholder="+880 1715 914997"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Update
        </button>
      </form>
    </div>
  );
}

const defaultProfileData = {
  name: "Admin",
  email: "admin@gmail.com",
  phone: "+91 9215914997",
  image: "/profile-avatar.png",
};

export default function ProfileModal({ onClose, profileData, onUpdate }) {
  const [activeTab, setActiveTab] = useState("My Profile");
  const [profile, setProfile] = useState({
    ...defaultProfileData,
    ...profileData,
  });

  useEffect(() => {
    setProfile({ ...defaultProfileData, ...profileData });
  }, [profileData]);

  const handleUpdate = (updatedData) => {
    if (updatedData.image && updatedData.image instanceof File) {
      const uploadedImageUrl = URL.createObjectURL(updatedData.image);
      updatedData = {
        ...updatedData,
        image: uploadedImageUrl,
      };
    }

    setProfile(updatedData);
    if (onUpdate) onUpdate(updatedData);
    setActiveTab("My Profile");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-96 relative shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">My Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          {["My Profile", "Edit Profile"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 text-center cursor-pointer font-medium ${
                activeTab === tab
                  ? "border-b-4 border-green-400 text-green-600"
                  : "text-gray-600 hover:text-green-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "My Profile" ? (
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-green-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                {profile.image ? (
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.src = "/profile-avatar.png";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-green-200 flex items-center justify-center text-green-700 font-bold">
                    ?
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">{profile.name}</p>
                <p className="text-sm text-gray-500">{profile.email}</p>
                <p className="text-sm text-gray-500">{profile.phone}</p>
              </div>
            </div>
          ) : (
            <EditProfileForm profile={profile} onUpdate={handleUpdate} />
          )}
        </div>
      </div>
    </div>
  );
}