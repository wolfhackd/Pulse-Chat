import { toast } from "sonner";
import axios from "axios";

export const handleSubmitLogin = async (e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
        toast.error("Todos os campos são obrigatórios!");
        return;
    }

    console.log("Email:", email);
    console.log("Password:", password);
    console.log(import.meta.env.VITE_API_URL);

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password
    })
    console.log(response.data);
  }