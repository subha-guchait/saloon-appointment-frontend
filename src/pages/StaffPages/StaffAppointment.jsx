import { useState } from "react";
import useStaffAppointments from "../../hooks/useStaffAppointment";
import StaffAppointmentCard from "../../components/Staff/StaffAppointmentCard";
import { completeAppointment } from "../../api/manageAppoinmentsApi";
import toast from "react-hot-toast";

const StaffAppointments = () => {
  const [status, setStatus] = useState("Scheduled");
  const { appointments, setAppointments, loading, error } =
    useStaffAppointments(status);

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      const completedAppointment = await completeAppointment(appointmentId);
      if (completedAppointment) {
        setAppointments((prev) =>
          prev.filter((appt) => appt.id !== appointmentId)
        );
        toast.success("Appointment completed Successfully");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Appointments – {status}</h1>

      {/* Toggle Buttons */}
      <div className="mb-4 flex gap-4">
        <button
          className={`btn ${
            status === "Scheduled" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => setStatus("Scheduled")}
        >
          Scheduled
        </button>
        <button
          className={`btn ${
            status === "Completed" ? "btn-primary" : "btn-outline"
          }`}
          onClick={() => setStatus("Completed")}
        >
          Completed
        </button>
      </div>

      {/* Data Display */}
      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : appointments.length === 0 ? (
        <p>No {status.toLowerCase()} appointments found.</p>
      ) : (
        appointments.map((appointment) => (
          <StaffAppointmentCard
            key={appointment.id}
            appointment={appointment}
            onComplete={handleCompleteAppointment}
          />
        ))
      )}
    </div>
  );
};

export default StaffAppointments;
