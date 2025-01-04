"use client"
import {useEffect} from "react";
import {document} from "postcss";

export default function Page(){
    useEffect(() => {
        document.location.replace("/chat")
    }, []);
    return(<div></div>)
}