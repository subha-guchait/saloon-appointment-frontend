import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../../api/userApi";
import ProfileForm from "../../components/profile/ProfileForm";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authUser, navigate]);

  const handleUpdate = async (updatedData) => {
    const isValid = handleInputErrors(updatedData);
    if (!isValid) return;
    try {
      const updatedUser = await updateUserProfile(updatedData);
      setUser(updatedUser);
      toast.success("Profile updated sucessfully!");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    }
  };

  function handleInputErrors(updatedData) {
    if (!updatedData.name || !updatedData.phone) {
      toast.error("All fields are required");
      return false;
    }
    if (updatedData.name.length < 2) {
      toast.error("Name must be atleast 2 characters long");
      return false;
    }

    if (updatedData.phone.length !== 10) {
      toast.error("Phone number must be 10 digits long");
      return false;
    }

    return true;
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      {user && <ProfileForm user={user} onSubmit={handleUpdate} />}
    </div>
  );
};

export default Profile;
