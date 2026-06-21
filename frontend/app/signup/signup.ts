import axios from "axios";
import { toast } from "sonner";


export const handleSubmitSignup = async (e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (!username || !email || !password || !confirmPassword) {
        toast.error("Todos os campos são obrigatórios!");
        return;
    }

    if (password !== confirmPassword) {
        toast.error("As senhas não coincidem!");
        return;
    }

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
            username,
            email,
            password
        })

        console.log(response.data);
        toast.success("Cadastro realizado com sucesso!");
        // Redirect to login
    } catch(err){
        console.log(err);
    }
}