import ChatHome from './page'
export const metadata = {
    title: "Chat",
    description: ""
}

export default function ChatAppLayout(){
    return (
        <div className={""}>
            <ChatHome />
        </div>
    )
}