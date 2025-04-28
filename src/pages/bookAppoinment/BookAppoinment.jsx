import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useServices from "../../hooks/useServices";
import useBookAppointment from "../../hooks/useBookAppoinment";
import toast from "react-hot-toast";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { handleBookAppointment, loading, error } = useBookAppointment();
  const location = useLocation();
  const selectedService = location.state?.selectedService || null;

  const [service, setService] = useState(selectedService);
  const { services } = useServices();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async () => {
    if (!date || !time || !service) {
      toast.error("Please fill all fields");
      return;
    }

    const appointmentData = {
      serviceId: service.id,
      date,
      time,
    };

    const result = await handleBookAppointment(appointmentData);
    if (result) {
      toast.success("Appointment booked successfully!");
      navigate("/appointments");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

      <div className="mb-4">
        <label className="block font-semibold">Select Service:</label>
        <select
          className="border p-2 w-full"
          value={service?.id || ""}
          onChange={(e) =>
            setService(services.find((s) => s.id === parseInt(e.target.value)))
          }
        >
          <option value="">-- Select a Service --</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {service && (
        <>
          <p>
            <strong>Description:</strong> {service.description}
          </p>
          <p>
            <strong>Duration:</strong> {service.duration} mins
          </p>
          <p>
            <strong>Price:</strong> ₹{service.price}
          </p>
        </>
      )}

      <div className="mt-4">
        <label className="block">Appointment Date:</label>
        <input
          type="date"
          className="border p-2 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]} // today's date
        />
      </div>

      <div className="mt-4">
        <label className="block">Appointment Time:</label>
        <input
          type="time"
          className="border p-2 w-full"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <button
        className="btn btn-success mt-6"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
};

export default BookAppointment;
