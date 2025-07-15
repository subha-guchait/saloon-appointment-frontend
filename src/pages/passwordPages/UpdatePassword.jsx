import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyResetLink, updatePassword } from "../../api/authApi";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const UpdatePassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [valid, setValid] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await verifyResetLink(token);
        if (res.success) {
          setValid(true);
        }
      } catch (error) {
        setValid(false);
        toast.error(error.message || "Something went wrong", {
          position: "top-right",
        });
      }
    };

    checkToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updatePassword(token, password);
      if (res.success) {
        toast.success(res.message, {
          position: "top-right",
        });
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong", {
        position: "top-right",
      });
      setValid(false);
    }
  };

  if (valid === null) return <p>Verifying...</p>;
  if (!valid) return <p>Invalid or expired link.</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl mb-4 font-semibold">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          New Password:
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full p-2 pr-10 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-2 text-gray-500 cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-3 cursor-pointer"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
