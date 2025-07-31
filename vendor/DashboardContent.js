// components/admin/DashboardContent.js
import React from "react";
import { DollarSign, Car, Calendar } from "lucide-react";

export default function DashboardContent({ activeTimeframe, setActiveTimeframe }) {
  const statsData = [
    {
      title: "Total Revenue",
      value: "$0",
      icon: <DollarSign className="w-6 h-6" />,
      bgColor: "bg-green-600",
    },
    {
      title: "Total Cars",
      value: "5",
      icon: <Car className="w-6 h-6" />,
      bgColor: "bg-green-600",
    },
    {
      title: "Total Bookings",
      value: "0",
      icon: <Calendar className="w-6 h-6" />,
      bgColor: "bg-green-600",
    },
    {
      title: "Available Cars",
      value: "5",
      icon: <Car className="w-6 h-6" />,
      bgColor: "bg-green-600",
    },
  ];

  const chartMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <div className="text-white">{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Earnings Summary
            </h3>
            <div className="flex space-x-2">
              {["6 Months", "1 Year"].map((period) => (
                <button
                  key={period}
                  onClick={() => setActiveTimeframe(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTimeframe === period
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 flex items-end justify-between space-x-2">
            {chartMonths.map((month) => (
              <div key={month} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-100 rounded-t h-40 mb-2 flex items-end">
                  <div
                    className={`w-full rounded-t transition-all duration-300 ${
                      month === "May" ? "bg-green-600 h-8" : "bg-gray-300 h-2"
                    }`}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Booking Overview
            </h3>
            <div className="flex space-x-2">
              {["6 Months", "1 Year"].map((period) => (
                <button
                  key={period}
                  onClick={() => setActiveTimeframe(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTimeframe === period
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-px bg-gray-200"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-full">
              {chartMonths.map((month) => (
                <div key={month} className="flex flex-col items-center">
                  <div
                    className={`w-2 h-2 rounded-full mb-2 ${
                      month === "May" ? "bg-green-600" : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="text-xs text-gray-500">{month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
