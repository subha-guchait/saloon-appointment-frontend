import { useState } from "react";
import { getStaffSlots } from "../api/staffApi";

const useStaffSlots = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const slots = await getStaffSlots();
      setSlots(slots);
    } catch (err) {
      console.error("Failed to fetch slots", err);
    } finally {
      setLoading(false);
    }
  };

  return { slots, setSlots, loading, fetchSlots };
};

export default useStaffSlots;
