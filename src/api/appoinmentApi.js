import api from "./axios";

export const bookAppointment = async (slotId) => {
  try {
    const res = await api.post("/appoinments", { slotId });
    return res.data.appoinment;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const getUserAppointments = async () => {
  try {
    const res = await api.get("/appoinments");
    return res.data.appoinments;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const cancelAppoionment = async (appoinmentId) => {
  try {
    const res = await api.put(`/appoinments/cancel/${appoinmentId}`, {});

    return res.data.appoinment;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const getStaffAppointments = async (status) => {
  try {
    const res = await api.get(`appoinments/staff?status=${status}`);
    return res.data.appoinments;
  } catch (err) {
    console.log(err);
    const message =
      err?.response?.data?.message || err.message || "Something went wrong";
    throw new Error(message);
  }
};
