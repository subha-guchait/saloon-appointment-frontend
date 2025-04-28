import { format } from "date-fns";

const AppointmentCard = ({ appointment, onAssignClick, onCompleteClick }) => {
  const appointmentDateTime = new Date(
    `${appointment.date}T${appointment.time}`
  );
  const now = new Date();

  return (
    <div className="card bg-base-100 shadow-md p-4 flex flex-col gap-2">
      <p>
        <strong>Appointment ID:</strong> {appointment.id}
      </p>
      <p>
        <strong>Date:</strong> {format(appointmentDateTime, "PPP")}
      </p>
      <p>
        <strong>Time:</strong> {format(appointmentDateTime, "p")}
      </p>
      <p>
        <strong>Amount:</strong> ₹{appointment.amount}
      </p>
      <p>
        <strong>Status:</strong> {appointment.status}
      </p>
      <p>
        <strong>Payment Status:</strong> {appointment.paymentStatus}
      </p>
      <p>
        <strong>Staff:</strong>{" "}
        {appointment.staffId
          ? `Staff ID ${appointment.staffId}`
          : "Not Assigned"}
      </p>

      <div className="flex gap-2">
        {!appointment.staffId && (
          <button className="btn btn-primary btn-sm" onClick={onAssignClick}>
            Assign Staff
          </button>
        )}

        {appointment.staffId && now >= appointmentDateTime && (
          <button className="btn btn-success btn-sm" onClick={onCompleteClick}>
            Complete Appointment
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
