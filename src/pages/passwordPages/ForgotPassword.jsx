import React, { useState } from "react";
import { resetPassword } from "../../api/authApi";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await resetPassword(email);
      toast.success("Email sent successfully", {
        position: "top-right",
      });
      setMessage(message);
      setStatus("success");
    } catch (error) {
      toast.error(error.message || "Something went wrong", {
        position: "top-right",
      });
      setMessage(error.message || "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>

      {message && (
        <p
          className={`mb-4 text-sm ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Enter your email address:
          <input
            type="email"
            required
            className="w-full input input-bordered mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-primary w-full mt-3">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
