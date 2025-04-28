import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useServices from "../../hooks/useServices";
import CreateServiceModal from "./CreateServiceModal";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
  const { services, loading, fetchServices } = useServices();
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleBookNow = (service) => {
    navigate("/book", { state: { selectedService: service } });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Our Services</h1>

      {authUser?.role === "admin" && (
        <div className="flex justify-end mb-4">
          <button
            className="btn btn-success"
            onClick={() => setShowCreateModal(true)}
          >
            Add New Service
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center text-lg">Loading services...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="card bg-base-100 shadow-md p-4">
              <h2 className="text-xl font-semibold">{service.name}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {service.description}
              </p>
              <p className="font-bold mb-1">
                Duration: {service.duration} mins
              </p>
              <p className="font-bold mb-4">Price: ₹{service.price}</p>
              <button
                className="btn btn-primary"
                onClick={() => handleBookNow(service)}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateServiceModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            setShowCreateModal(false);
            fetchServices();
          }}
        />
      )}
    </div>
  );
};

export default Home;
