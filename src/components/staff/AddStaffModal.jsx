import { useState, useEffect } from "react";
import { createStaff } from "../../api/staffApi";
import { getAllServices } from "../../api/serviceApi";
import toast from "react-hot-toast";

const AddStaffModal = ({ onClose, refreshStaff }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceId: "",
  });
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getAllServices();
        setServices(res);
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStaff(formData);
      refreshStaff();
      onClose();
    } catch (error) {
      console.error("Failed to create staff", error);
      toast.error(
        error.response.data.message ||
          error.response.data.errMessage ||
          "Failed to create staff"
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-white/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="bg-white p-6 rounded-md w-96 z-10">
        <h2 className="text-lg font-bold mb-4">Add Staff</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="input input-bordered"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <select
            name="serviceId"
            className="select select-bordered"
            value={formData.serviceId}
            onChange={handleChange}
            required
          >
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;
