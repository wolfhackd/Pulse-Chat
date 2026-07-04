import axios from "axios";

export const getRooms = async ()=>{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`);
    return res.data;
};