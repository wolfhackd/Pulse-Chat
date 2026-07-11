import axios from "axios"

export type ChatMessage = {
  id: string
  username: string
  text: string
  time: string
}

export const findRoomById = async (id: string) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/${id}`)
  return res.data
}

export const getRooms = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/rooms`)
  return res.data
}
