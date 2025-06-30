import { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { getAllServicesAdmin, updateServiceStatus } from "../../api/serviceApi";
import CreateServiceModal from "./CreateServiceModal";

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getAllServicesAdmin();
      setServices(data);
    } catch (error) {
      toast.error("Failed to fetch services");
    }
  };

  const openAddModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      const updatedService = await updateServiceStatus(id, !isActive);
      toast.success(`Service ${isActive ? "deactivated" : "activated"}`);

      // Update only the toggled service in state
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === id ? updatedService : service
        )
      );
    } catch (error) {
      toast.error("Failed to update service status");
    }
  };

  const handleServiceCreatedOrUpdated = (service) => {
    setIsModalOpen(false);
    if (!service) return;

    setServices((prev) => {
      const exists = prev.find((s) => s.id === service.id);
      if (exists) {
        return prev.map((s) => (s.id === service.id ? service : s));
      } else {
        return [service, ...prev];
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Services</h1>
        <button
          onClick={openAddModal}
          className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary/90 cursor-pointer"
        >
          <Plus className="w-5 h-5" /> Add Service
        </button>
      </div>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow rounded-2xl p-4 flex flex-col justify-between h-full"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-1">{service.name}</h2>
                <p className="text-gray-600 text-sm break-words mb-2">
                  {service.description}
                </p>
                <div className="text-sm text-gray-500">
                  Duration:{" "}
                  <span className="font-medium">{service.duration} mins</span>
                  <br />
                  Price: <span className="font-medium">₹{service.price}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() => openEditModal(service)}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  title="Edit"
                >
                  <Pencil className="w-5 h-5" />
                </button>

                <label className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">
                    {service.isActive ? "Active" : "Inactive"}
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-success toggle-sm cursor-pointer"
                    checked={service.isActive}
                    onChange={() =>
                      handleToggleActive(service.id, service.isActive)
                    }
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <CreateServiceModal
          onClose={() => setIsModalOpen(false)}
          onCreated={handleServiceCreatedOrUpdated}
          serviceToEdit={editingService}
        />
      )}
    </div>
  );
};

export default ServiceManagement;
