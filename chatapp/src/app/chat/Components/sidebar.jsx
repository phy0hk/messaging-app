"use client"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader,SidebarProvider} from "@/components/ui/sidebar";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
export default function ChatArea(){
    const [width, setWidth] = useState(0);
    const sidebar_cardRef = useRef(null);
    useEffect(()=>{
        const sidebar_card = sidebar_cardRef.current;
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                console.log(entry.contentRect.width); 
            }
          });
          resizeObserver.observe(sidebar_card);
          return () => resizeObserver.disconnect();
    })
    return (

        <Card className={"w-full h-dvh flex flex-col rounded-none"} ref={sidebar_cardRef}>
            <CardHeader>
                <CardTitle className={"text-2xl"}>Recent</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className={"h-5/6"}>
            </CardContent>
            <CardFooter className={""}>
            </CardFooter>
        </Card>
    )
}