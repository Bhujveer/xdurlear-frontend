import React, { useState } from "react";
import {
  Search,
  Edit3,
  Trash2,
  Plus,
  ImageIcon,
} from "lucide-react";

export default function CarsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEntries, setShowEntries] = useState(10);
  const [cars, setCars] = useState([
    {
      id: 1,
      image: null,
      title: "Toyota Camry",
      pickupLocation: "New York",
      dropLocation: "Los Angeles",
      price: "$50/day",
      brand: "Toyota",
      model: "Camry",
      fuelType: "Gasoline",
      seats: 5,
      doors: 4,
      mileage: "30,000 miles",
    },
    {
      id: 2,
      image: null,
      title: "Honda Civic",
      pickupLocation: "Chicago",
      dropLocation: "Houston",
      price: "$40/day",
      brand: "Honda",
      model: "Civic",
      fuelType: "Gasoline",
      seats: 5,
      doors: 4,
      mileage: "25,000 miles",
    },
  ]);

  const [formVisible, setFormVisible] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [form, setForm] = useState({
    title: "",
    pickupLocation: "",
    dropLocation: "",
    price: "",
    brand: "",
    model: "",
    fuelType: "",
    seats: "",
    doors: "",
    mileage: "",
  });

  const handleAddOrEdit = () => {
    if (
      !form.title ||
      !form.pickupLocation ||
      !form.dropLocation ||
      !form.price
    )
      return;

    if (editingCar) {
      // Update
      setCars((prev) =>
        prev.map((c) =>
          c.id === editingCar.id ? { ...c, ...form } : c
        )
      );
    } else {
      // Add
      const newCar = {
        id: Date.now(),
        image: null,
        ...form,
      };
      setCars([newCar, ...cars]);
    }

    setFormVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      title: "",
      pickupLocation: "",
      dropLocation: "",
      price: "",
      brand: "",
      model: "",
      fuelType: "",
      seats: "",
      doors: "",
      mileage: "",
    });
    setEditingCar(null);
  };

  const handleEdit = (car) => {
    setForm(car);
    setEditingCar(car);
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  const filteredCars = cars.filter((car) =>
    [
      car.title,
      car.pickupLocation,
      car.dropLocation,
      car.brand,
      car.model,
      car.fuelType,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const displayCars = filteredCars.slice(0, showEntries);

  const NoDataState = () => (
    <tr>
      <td colSpan="13" className="py-16 text-center text-gray-500">
        No Data
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Cars List</h2>
        <button
          onClick={() => {
            resetForm();
            setFormVisible(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium"
        >
          <Plus size={14} />
          Add Car
        </button>
      </div>

      {/* Add/Edit Form */}
      {formVisible && (
        <div className="mb-6 bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-3">
            {editingCar ? "Edit Car" : "Add Car"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "title",
              "pickupLocation",
              "dropLocation",
              "price",
              "brand",
              "model",
              "fuelType",
              "seats",
              "doors",
              "mileage",
            ].map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="border p-2 rounded text-sm"
              />
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAddOrEdit}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
            >
              {editingCar ? "Update" : "Add"}
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
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                "#",
                "Image",
                "Title",
                "Pickup Location",
                "Drop Location",
                "Price",
                "Brand",
                "Model",
                "Fuel Type",
                "Seats",
                "Doors",
                "Mileage",
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
            {displayCars.length === 0 ? (
              <NoDataState />
            ) : (
              displayCars.map((car, index) => (
                <tr
                  key={car.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <ImageIcon size={20} className="text-gray-500" />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{car.title}</td>
                  <td className="py-3 px-4 text-sm">{car.pickupLocation}</td>
                  <td className="py-3 px-4 text-sm">{car.dropLocation}</td>
                  <td className="py-3 px-4 text-sm">{car.price}</td>
                  <td className="py-3 px-4 text-sm">{car.brand}</td>
                  <td className="py-3 px-4 text-sm">{car.model}</td>
                  <td className="py-3 px-4 text-sm">{car.fuelType}</td>
                  <td className="py-3 px-4 text-sm">{car.seats}</td>
                  <td className="py-3 px-4 text-sm">{car.doors}</td>
                  <td className="py-3 px-4 text-sm">{car.mileage}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(car)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-md"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-md"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (UI Only) */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <select
            value={showEntries}
            onChange={(e) => setShowEntries(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>
        <div>
          Showing {displayCars.length ? 1 : 0} to {displayCars.length} of{" "}
          {filteredCars.length} entries
        </div>
        <div className="flex gap-1">
          <button className="px-3 py-1 border rounded" disabled>
            Previous
          </button>
          <button className="px-3 py-1 bg-green-600 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 border rounded" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
