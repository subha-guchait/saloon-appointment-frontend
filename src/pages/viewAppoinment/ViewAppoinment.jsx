import { useState } from "react";
import useAppointments from "../../hooks/useAppoinments";
import AppointmentCard from "../../components/appoinment/AppointmentCard";
import { toast } from "react-hot-toast";

const ViewAppointments = () => {
  const {
    appointments,
    setAppointments,
    loading,
    error,
    cancelAppointmentById,
  } = useAppointments();
  const [filter, setFilter] = useState("Scheduled");

  const filtered = appointments.filter((appt) => appt.status === filter);

  const handleCancel = async (id) => {
    try {
      await cancelAppointmentById(id);
      toast.success("Appointment cancelled!");
    } catch {
      toast.error("Failed to cancel appointment");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>

      {/* Status Tabs */}
      <div className="flex gap-4 mb-6">
        {["Scheduled", "Completed", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded cursor-pointer ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <p>No {filter.toLowerCase()} appointments found.</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appt={appt}
              onCancel={handleCancel}
              setAppointments={setAppointments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAppointments;
