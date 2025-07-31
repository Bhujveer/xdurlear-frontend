import React, { useState } from "react";
import { Search, Eye, X } from "lucide-react";
import Image from "next/image";

// Subscription Select Modal Component
const SubscriptionSelectModal = ({ isOpen, onClose, onSelectPlan }) => {
  if (!isOpen) return null;

  const subscriptionPlans = [
    {
      id: 1,
      name: "Basic",
      amount: "$19",
      duration: "15 Days",
      carLimit: 2,
      isHighlighted: true,
      color: "bg-green-500"
    },
    {
      id: 2,
      name: "Standard",
      amount: "$29",
      duration: "30 Days",
      carLimit: 5,
      isHighlighted: false,
      color: "bg-gray-100"
    },
    {
      id: 3,
      name: "Premium",
      amount: "$49",
      duration: "60 Days",
      carLimit: 12,
      isHighlighted: false,
      color: "bg-gray-100"
    }
  ];

  const handlePlanClick = (plan) => {
    onSelectPlan(plan);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        
        <h3 className="text-xl font-semibold mb-6 text-gray-800">
          Select Subscription
        </h3>
        
        <div className="space-y-4">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => handlePlanClick(plan)}
              className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-md border ${
                plan.isHighlighted
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Plan Name:</span>
                    <span className="text-sm font-semibold">{plan.name}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Amount:</span>
                    <span className="text-sm font-semibold">{plan.amount}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Duration:</span>
                    <span className="text-sm font-semibold">{plan.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Car Limit:</span>
                    <span className="text-sm font-semibold">{plan.carLimit}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function SubscriptionList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEntries, setShowEntries] = useState(10);

  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      date: "02 Jul 2025",
      name: "Basic",
      amount: "$19",
      duration: "15 Days",
      paymentStatus: "Pending",
      active: "Inactive",
      user: {
        name: "Mr Vendor",
        email: "vendor@gmail.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        subscriptionName: "Basic",
        startDate: "02 Jul 2025",
        endDate: "17 Jul 2025",
        days: 16
      }
    },
    {
      id: 2,
      date: "17 Jun 2025",
      name: "Standard",
      amount: "$29",
      duration: "30 Days",
      paymentStatus: "Paid",
      active: "Active",
      user: {
        name: "John Smith",
        email: "john.smith@gmail.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        subscriptionName: "Standard",
        startDate: "17 Jun 2025",
        endDate: "17 Jul 2025",
        days: 30
      }
    },
    {
      id: 3,
      date: "17 Jun 2025",
      name: "Basic",
      amount: "$19",
      duration: "15 Days",
      paymentStatus: "Pending",
      active: "Inactive",
      user: {
        name: "Sarah Johnson",
        email: "sarah.johnson@gmail.com",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
        subscriptionName: "Basic",
        startDate: "17 Jun 2025",
        endDate: "02 Jul 2025",
        days: 15
      }
    },
    {
      id: 4,
      date: "17 Jun 2025",
      name: "Basic",
      amount: "$19",
      duration: "15 Days",
      paymentStatus: "Pending",
      active: "Inactive",
      user: {
        name: "Michael Brown",
        email: "michael.brown@gmail.com",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        subscriptionName: "Basic",
        startDate: "17 Jun 2025",
        endDate: "02 Jul 2025",
        days: 15
      }
    },
  ]);

  // Modal states
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // Filter subscriptions by search term
  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Limit subscriptions shown
  const displaySubscriptions = filteredSubscriptions.slice(0, showEntries);

  // Open details modal
  const openDetailsModal = (subscription) => {
    setSelectedSubscription(subscription);
    setDetailsModalOpen(true);
  };

  // Open subscription select modal
  const openSelectModal = () => {
    setSelectModalOpen(true);
  };

  // Handle plan selection
  const handlePlanSelect = (plan) => {
    setSelectModalOpen(false);
    // Here you would typically open a payment modal
    console.log("Selected plan:", plan);
    // TODO: Open payment modal with selected plan
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Subscriptions List</h2>
        <button 
          onClick={openSelectModal}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Buy Subscription
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase">DATE</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase">NAME</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase">AMOUNT</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase">DURATION</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase">PAYMENT STATUS</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase">ACTIVE</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {displaySubscriptions.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <p className="text-lg font-medium text-gray-500">No Data</p>
                  </div>
                </td>
              </tr>
            ) : (
              displaySubscriptions.map((subscription) => (
                <tr
                  key={subscription.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-gray-700">{subscription.date}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 font-medium">{subscription.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{subscription.amount}</td>
                  <td className="py-4 px-4 text-sm text-gray-700">{subscription.duration}</td>
                  <td className="py-4 px-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        subscription.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {subscription.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        subscription.active === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {subscription.active}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => openDetailsModal(subscription)}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors border border-green-300"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Info */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <div>
          {displaySubscriptions.length === 0
            ? "Showing 0 to 0 of 0 entries"
            : `Showing 1 to ${displaySubscriptions.length} of ${filteredSubscriptions.length} entries`}
        </div>
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            value={showEntries}
            onChange={(e) => setShowEntries(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>entries</span>
        </div>
      </div>

      {/* Subscription Select Modal */}
      <SubscriptionSelectModal
        isOpen={selectModalOpen}
        onClose={() => setSelectModalOpen(false)}
        onSelectPlan={handlePlanSelect}
      />

      {/* Details Modal */}
      {detailsModalOpen && selectedSubscription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setDetailsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Subscription Details
            </h3>
            
            <div className="space-y-4">
              {/* User Avatar */}
              <div className="flex justify-center mb-6">
                <Image
                  src={selectedSubscription.user.avatar}
                  alt={selectedSubscription.user.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
              </div>
              
              {/* User Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Name</span>
                  <span className="text-sm text-gray-800">{selectedSubscription.user.name}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Email</span>
                  <span className="text-sm text-gray-800">{selectedSubscription.user.email}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Subscription Name</span>
                  <span className="text-sm text-gray-800">{selectedSubscription.user.subscriptionName}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Amount</span>
                  <span className="text-sm text-gray-800">{selectedSubscription.amount}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Start Date</span>
                  <span className="text-sm text-gray-800">{selectedSubscription.user.startDate}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">End Date</span>
                  <span className="text-sm text-gray-800">{selectedSubscription.user.endDate}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Days</span>
                  <span className="text-sm text-gray-800">{selectedSubscription.user.days}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Payment Status</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedSubscription.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {selectedSubscription.paymentStatus}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Status</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedSubscription.active === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedSubscription.active}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}