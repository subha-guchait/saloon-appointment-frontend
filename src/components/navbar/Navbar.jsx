import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import LogoutButton from "../shared/LogoutButton";

const Navbar = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-primary">
          Stellar Beauty Hub
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-1">
          {authUser?.role === "admin" && (
            <>
              <li>
                <Link to="/staff">Staff</Link>
              </li>
              <li>
                <Link to="/manage-appointments">Appointments</Link>
              </li>
            </>
          )}
          {authUser && authUser.role === "customer" && (
            <>
              <li>
                <Link to="/book">Book Appointment</Link>
              </li>
              <li>
                <Link to="/appointments">My Appointments</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </>
          )}
          {!authUser ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <li>
              <LogoutButton />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
