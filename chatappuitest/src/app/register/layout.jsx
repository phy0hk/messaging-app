import Register from "@/app/register/page";

export const metadata = {
    title: "Register",
    description: "Register to chatapp"
}
export default function LoginLayout(){
    return (
        <div>
            <Register />
        </div>
    )
}