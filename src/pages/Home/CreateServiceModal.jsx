import { useState } from "react";
import { createService } from "../../api/serviceApi";
import toast from "react-hot-toast";

const CreateServiceModal = ({ onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { name, description, duration, price } = formData;

    if (!name.trim() || !description.trim()) {
      toast.error("Name and description are required!");
      return false;
    }
    if (!duration || isNaN(duration) || Number(duration) <= 0) {
      toast.error("Duration must be a positive number!");
      return false;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      toast.error("Price must be a positive number!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createService({
        name: formData.name.trim(),
        description: formData.description.trim(),
        duration: Number(formData.duration),
        price: Number(formData.price),
      });

      toast.success("Service created successfully!");
      onCreated();
    } catch (error) {
      console.error("Failed to create service", error);
      toast.error("Failed to create service. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-lg font-bold mb-4">Create New Service</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Service Name"
            className="input input-bordered"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (mins)"
            className="input input-bordered"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
          />
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            className="input input-bordered"
            value={formData.price}
            onChange={handleChange}
            required
            min="1"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceModal;
