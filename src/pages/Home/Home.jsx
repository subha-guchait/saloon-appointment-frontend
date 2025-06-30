import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useServices from "../../hooks/useServices";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { services } = useServices();
  const { authUser } = useAuthContext();

  const handleBookNow = () => {
    navigate("/book-appointment");
  };

  //redirect based on user role
  useEffect(() => {
    if (authUser) {
      if (authUser.role === "admin") {
        navigate("/admin/manage-services");
      } else if (authUser.role === "staff") {
        navigate("/staff/availability");
      } else if (authUser.role === "customer") {
        navigate("/book-appointment");
      }
    }
  }, [authUser, navigate]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6">
        Welcome to Stellar Beauty Hub
      </h1>
      <p className="text-center text-gray-600 mb-12">
        We offer a wide range of beauty and grooming services to help you look
        and feel your best.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-center">Our Services</h2>
      <ul className="mb-12 space-y-4 text-lg text-gray-700 list-disc list-inside">
        {services.map((service) => (
          <li key={service.id}>
            <span className="font-medium">{service.name}:</span>{" "}
            {service.description}
          </li>
        ))}
      </ul>

      <div className="flex justify-center">
        <button
          onClick={handleBookNow}
          className="btn btn-outline btn-info px-6 py-3 rounded-full"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Home;
