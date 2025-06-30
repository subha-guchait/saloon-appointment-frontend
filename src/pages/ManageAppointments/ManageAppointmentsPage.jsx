import { useEffect, useState } from "react";
import {
  fetchAppointments,
  completeAppointment,
} from "../../api/manageAppoinmentsApi";
import AppointmentCard from "./AppointmentCard";

const ManageAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("Scheduled");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetchAppointments(status, page, limit);
      setAppointments(res.appointments);
      setPages(res.pagination.lastPage);
    } catch (error) {
      console.error("Failed to load appointments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // Reset to page 1 whenever status changes
  }, [status]);

  useEffect(() => {
    loadAppointments();
  }, [page, limit, status]);

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      await completeAppointment(appointmentId);
      loadAppointments();
    } catch (err) {
      console.error("Failed to complete appointment", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Appointments</h1>
        <div className="flex items-center gap-2">
          <label className="font-medium">Items per page:</label>
          <select
            className="select select-bordered w-fit"
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(parseInt(e.target.value));
            }}
          >
            {[3, 6, 9, 12].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="mb-6 flex gap-4">
        {["Scheduled", "Completed", "Cancelled"].map((s) => (
          <button
            key={s}
            className={`btn ${status === s ? "btn-primary" : "btn-outline"}`}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Appointments Grid */}
      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p>No {status.toLowerCase()} appointments found.</p>
      ) : (
        <>
          <div className="">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onCompleteClick={() =>
                  handleCompleteAppointment(appointment.id)
                }
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center gap-2">
            <button
              className="btn"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span className="self-center">
              Page {page} of {pages}
            </span>
            <button
              className="btn"
              disabled={page === pages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageAppointmentsPage;
