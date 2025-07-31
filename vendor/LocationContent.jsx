import React, { useState } from "react";
import { Search, Edit3, Trash2, Plus, X, Check } from "lucide-react";

export default function LocationContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEntries, setShowEntries] = useState(10);
  const [locations, setLocations] = useState([
    { id: 1, name: "New York" },
    { id: 2, name: "Los Angeles" },
    { id: 3, name: "Chicago" },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newLocation, setNewLocation] = useState("");

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayLocations = filteredLocations.slice(0, showEntries);

  const handleEdit = (location) => {
    setEditingId(location.id);
    setEditValue(location.name);
  };

  const handleSave = (id) => {
    setLocations(
      locations.map((location) =>
        location.id === id ? { ...location, name: editValue } : location
      )
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      setLocations(locations.filter((location) => location.id !== id));
    }
  };

  const handleAdd = () => {
    if (newLocation.trim()) {
      const newId = locations.length > 0 ? Math.max(...locations.map((l) => l.id)) + 1 : 1;
      setLocations([...locations, { id: newId, name: newLocation.trim() }]);
      setNewLocation("");
      setIsAdding(false);
    }
  };

  const NoDataState = () => (
    <tr>
      <td colSpan="3" className="py-16 text-center">
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
        <h2 className="text-2xl font-bold text-gray-800">Locations List</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition"
        >
          <Plus size={14} />
          Add Location
        </button>
      </div>

      {/* Add New Location Form */}
      {isAdding && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter new location name"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
            <button
              onClick={handleAdd}
              className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors"
            >
              <Check size={18} />
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

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
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase text-xs tracking-wider">
                #
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase text-xs tracking-wider">
                Location
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase text-xs tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {displayLocations.length === 0 ? (
              <NoDataState />
            ) : (
              displayLocations.map((location, index) => (
                <tr
                  key={location.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-700 text-sm">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 text-gray-700 font-medium text-sm">
                    {editingId === location.id ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      location.name
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {editingId === location.id ? (
                        <>
                          <button
                            onClick={() => handleSave(location.id)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(location)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(location.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination and Show Entries */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 text-sm text-gray-600 gap-4">
        {/* Show Entries Selector */}
        <div className="flex flex-wrap items-center gap-2">
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

        {/* Entry Count */}
        <div className="text-center sm:text-left">
          {filteredLocations.length === 0
            ? "Showing 0 to 0 of 0 entries"
            : `Showing 1 to ${Math.min(showEntries, filteredLocations.length)} of ${filteredLocations.length} entries`}
        </div>

        {/* Pagination */}
        <div className="flex justify-center sm:justify-end items-center gap-1">
          <button
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={filteredLocations.length === 0}
          >
            Previous
          </button>
          <button
            className={`px-3 py-1 rounded ${
              filteredLocations.length === 0
                ? "bg-gray-300 text-gray-500"
                : "bg-green-600 text-white"
            }`}
          >
            1
          </button>
          <button
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={filteredLocations.length === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}