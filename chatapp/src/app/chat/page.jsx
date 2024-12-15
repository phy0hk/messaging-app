"use client"
import { useState, useEffect } from "react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import Sidebar from "./Components/sidebar";
import ChatArea from "./Components/chat";
import {SidebarProvider} from "@/components/ui/sidebar";
export default function ChatPage() {
    const [MobileView, setMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setMobileView(window.innerWidth < 480);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            {MobileView ? (
                <div>
                    <ChatArea />
                </div>
            ) : (
                <ResizablePanelGroup direction="horizontal" className="w-full">
                    <ResizablePanel className="min-w-[80px]">
                        <Sidebar />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel className="min-w-[400px]">
                        <ChatArea />
                    </ResizablePanel>
                </ResizablePanelGroup>
                    )}
        </>
    );
}
