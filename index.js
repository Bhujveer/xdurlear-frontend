import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Map,
  Car,
  Tag,
  ChevronRight,
  ChevronDown,
  CreditCard ,
} from "lucide-react";
import VendorHeader from "./VendorHeader";
import DashboardContent from "./DashboardContent";
import LocationContent from "./LocationContent";
import CarsContent from "./CarsContent";
import BookingsContent from "./BookingsContent";
import SubscriptionContent from "./SubscriptionContent";
import WalletHistoryContent from "./WalletHistoryContent";


export default function VendorDashboard() {
  const [sidebarExpanded, setSidebarExpanded] = useState({});
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [activeTimeframe, setActiveTimeframe] = useState("6 Months");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = (section) => {
    setSidebarExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const [profileData, setProfileData] = useState({
    name: "Vendor",
    email: "vendor@gmail.com",
    phone: "+8801715914997",
    image: "/profile-avatar.png",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const sidebarItems = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "Location", icon: Map },
    { name: "Cars", icon: Car },
    { name: "Bookings", icon: CalendarCheck },
    { name: "Subscriptions", icon: Tag  },
    { name: "Wallet", icon: CreditCard  },
  ];

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isVendor");
      router.push("/vendor/login");
    }
  };

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isVendor = localStorage.getItem("isvendor");
      if (isVendor !== "true") {
        router.push("/vendor/login");
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Hamburger button for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Header */}
      <VendorHeader
        profileData={profileData}
        handleLogout={handleLogout}
        onUpdateProfile={setProfileData}
      />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-sm border-r border-gray-200 w-64 flex-shrink-0 flex flex-col z-30 transform transition-transform duration-200 ease-in-out
          ${isMobileSidebarOpen ? "fixed inset-y-0 left-0 translate-x-0" : "fixed inset-y-0 left-0 -translate-x-full"}
          lg:relative lg:translate-x-0`}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600">Dashboard</span>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              {sidebarItems.map((item, index) => (
                <div key={index}>
                  {item.category && (
                    <div className="px-3 py-2 text-xs font-semibold text-green-600 uppercase tracking-wider">
                      {item.category}
                    </div>
                  )}
                  <div
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      selectedMenu === item.name
                        ? "bg-orange-50 text-green-700 border-r-2 border-green-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => {
                      if (!item.hasSubmenu) {
                        setSelectedMenu(item.name);
                        setIsMobileSidebarOpen(false);
                      } else {
                        toggleSidebar(item.key);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.hasSubmenu &&
                      (sidebarExpanded[item.key] ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      ))}
                  </div>

                  {item.hasSubmenu && sidebarExpanded[item.key] && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.submenu?.map((subItem, subIndex) => (
                        <div
                          key={subIndex}
                          className="flex items-center space-x-3 px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                          <span className="text-sm">{subItem.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </aside>

        {/* Content area */}
        <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {selectedMenu === "Dashboard" && (
              <DashboardContent
                activeTimeframe={activeTimeframe}
                setActiveTimeframe={setActiveTimeframe}
              />
            )}
            {selectedMenu === "Location" && <LocationContent />}
            {selectedMenu === "Cars" && <CarsContent />}
            {selectedMenu === "Bookings" && <BookingsContent />}
            {selectedMenu === "Subscriptions" && <SubscriptionContent />}
            {selectedMenu === "Wallet" && <WalletHistoryContent />}
          </div>
        </main>
      </div>
    </div>
  );
}