import React, { useState } from "react";
import { Search, Edit3, Trash2, Plus } from "lucide-react";

export default function BookingsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEntries, setShowEntries] = useState(10);
  const [statusFilter, setStatusFilter] = useState("All");
  const [formVisible, setFormVisible] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      date: "2025-07-01",
      name: "Alice Johnson",
      owner: "Car Rentals Inc.",
      carName: "Toyota Corolla",
      amount: "$100",
      paymentMethod: "Credit Card",
      status: "Confirmed",
    },
    {
      id: 2,
      date: "2025-07-02",
      name: "Bob Smith",
      owner: "DriveNow",
      carName: "Honda Civic",
      amount: "$120",
      paymentMethod: "PayPal",
      status: "Pending",
    },
    // More bookings if needed...
  ]);

  // Form state
  const [form, setForm] = useState({
    date: "",
    name: "",
    owner: "",
    carName: "",
    amount: "",
    paymentMethod: "",
    status: "Pending",
  });

  // Filter bookings by search and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      statusFilter === "All" || booking.status === statusFilter;
    const matchesSearch =
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Pagination slice
  const displayBookings = filteredBookings.slice(0, showEntries);

  // Reset form helper
  const resetForm = () => {
    setForm({
      date: "",
      name: "",
      owner: "",
      carName: "",
      amount: "",
      paymentMethod: "",
      status: "Pending",
    });
    setEditingBooking(null);
  };

  // Show form for editing existing booking
  const handleEdit = (booking) => {
    setForm(booking);
    setEditingBooking(booking);
    setFormVisible(true);
  };

  // Delete booking
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter((b) => b.id !== id));
    }
  };

  // Add or update booking
  const handleSubmit = () => {
    // Simple validation
    if (!form.date || !form.name || !form.owner || !form.carName || !form.amount) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingBooking) {
      // Update
      setBookings((prev) =>
        prev.map((b) => (b.id === editingBooking.id ? { ...form, id: editingBooking.id } : b))
      );
    } else {
      // Add
      setBookings([{ ...form, id: Date.now() }, ...bookings]);
    }
    setFormVisible(false);
    resetForm();
  };

  const NoDataState = () => (
    <tr>
      <td colSpan="9" className="py-16 text-center">
        <div className="flex flex-col items-center justify-center text-gray-400">
          <p className="text-lg font-medium text-gray-500">No Data</p>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Bookings List</h2>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>

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

      {/* Add/Edit Form */}
      {/* {formVisible && (
        <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-300">
          <h3 className="text-lg font-semibold mb-3">
            {editingBooking ? "Edit Booking" : "Add Booking"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="border p-2 rounded text-sm"
              placeholder="Date"
              required
            />
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-2 rounded text-sm"
              placeholder="Name"
              required
            />
            <input
              type="text"
              value={form.owner}
              onChange={(e) => setForm({ ...form, owner: e.target.value })}
              className="border p-2 rounded text-sm"
              placeholder="Owner"
              required
            />
            <input
              type="text"
              value={form.carName}
              onChange={(e) => setForm({ ...form, carName: e.target.value })}
              className="border p-2 rounded text-sm"
              placeholder="Car Name"
              required
            />
            <input
              type="text"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="border p-2 rounded text-sm"
              placeholder="Amount"
              required
            />
            <input
              type="text"
              value={form.paymentMethod}
              onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
              className="border p-2 rounded text-sm"
              placeholder="Payment Method"
              required
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="border p-2 rounded text-sm"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
            >
              {editingBooking ? "Update" : "Add"}
            </button>
            <button
              onClick={() => {
                setFormVisible(false);
                resetForm();
              }}
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                "#",
                "Date",
                "Name",
                "Owner",
                "Car Name",
                "Amount",
                "Payment Method",
                "Booking Status",
                "Action",
              ].map((th) => (
                <th
                  key={th}
                  className="text-left py-3 px-4 font-semibold text-gray-700 uppercase text-xs tracking-wider"
                >
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayBookings.length === 0 ? (
              <NoDataState />
            ) : (
              displayBookings.map((booking, index) => (
                <tr
                  key={booking.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{booking.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{booking.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{booking.owner}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{booking.carName}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{booking.amount}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{booking.paymentMethod}</td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : booking.status === "Confirmed"
                          ? "bg-blue-100 text-blue-800"
                          : booking.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {/* <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(booking)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 text-sm text-gray-600 gap-4">
        {/* Show Entries Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span>Show</span>
          <select
            value={showEntries}
            onChange={(e) => setShowEntries(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {[10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>

        {/* Entry Count */}
        <div className="text-center sm:text-left">
          {displayBookings.length === 0
            ? "Showing 0 to 0 of 0 entries"
            : `Showing 1 to ${displayBookings.length} of ${filteredBookings.length} entries`}
        </div>

        {/* Pagination Controls (for now no pages, just placeholders) */}
        <div className="flex justify-center sm:justify-end items-center gap-1">
          <button
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={true} // pagination disabled for now
          >
            Previous
          </button>
          <button className="px-3 py-1 rounded bg-green-600 text-white">1</button>
          <button
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={true} // pagination disabled for now
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
