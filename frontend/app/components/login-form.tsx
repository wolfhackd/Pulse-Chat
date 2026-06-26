import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import type React from "react"
import { useAuth } from "~/shared/hooks/useAuth"
import { toast } from "sonner"
import axios from "axios"
import { useNavigate } from "react-router"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

   const {login} = useAuth();
   const navigate = useNavigate();

    const handleSubmitLogin = async (e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
        toast.error("Todos os campos são obrigatórios!");
        return;
    }

    try{

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
            email,
            password
        })
        login(response.data.token);
        toast.success("Login realizado com sucesso!");
        navigate("/room/1");
    } catch (error) {
        console.error(error);
        toast.error("Erro ao realizar login!");
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Logue na sua conta</CardTitle>
          <CardDescription>
            Insira suas credenciais para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <Input id="password" name="password" type="password" minLength={8} placeholder="********" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Não tem uma conta? <a href="/signup">Cadastre-se</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
