import { useEffect, useState } from "react";
import {
  fetchScheduledAppointments,
  assignStaffToAppointment,
  completeAppointment,
} from "../../api/manageAppoinmentsApi";
import AppointmentCard from "./AppointmentCard";
import AssignStaffModal from "./AssignStaffModal";

const ManageAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const loadAppointments = async () => {
    try {
      const res = await fetchScheduledAppointments();
      setAppointments(res);
    } catch (error) {
      console.error("Failed to load appointments", error);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleAssignStaff = async (staffId) => {
    try {
      await assignStaffToAppointment(selectedAppointment.id, staffId);
      setSelectedAppointment(null);
      loadAppointments();
    } catch (error) {
      console.error("Failed to assign staff", error);
    }
  };

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      await completeAppointment(appointmentId);
      loadAppointments();
    } catch (error) {
      console.error("Failed to complete appointment", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Scheduled Appointments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onAssignClick={() => setSelectedAppointment(appointment)}
            onCompleteClick={() => handleCompleteAppointment(appointment.id)}
          />
        ))}
      </div>

      {selectedAppointment && (
        <AssignStaffModal
          appointment={selectedAppointment}
          onAssign={handleAssignStaff}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
};

export default ManageAppointmentsPage;
