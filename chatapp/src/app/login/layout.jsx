import Login from "@/app/login/page";

export const metadata = {
    title: "Login",
    description: "Login to chatapp"
}
export default function LoginLayout(){
    return (
        <div>
            <Login />
        </div>
        )
}