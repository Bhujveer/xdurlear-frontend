import React from "react";
import { X } from "lucide-react";

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

export default SubscriptionSelectModal;