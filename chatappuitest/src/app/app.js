import {useRouter} from "next/router";
import Register from "@/app/register/layout";
import Login from "@/app/login/layout";
import Chat from "@/app/chat/layout"

export default function App() {
    const router = useRouter();
    const {pathname} = router;
    const renderPage = () => {
        switch (pathname) {
        case "/register": return <Register />;
        case "/login": return <Login />;
        case "/chat": return <Chat />;
        default: return "<h1>404 Page Not Found</h1>";
        }
    }
}
