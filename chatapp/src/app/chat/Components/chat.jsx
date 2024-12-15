import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input";
export default function ChatArea(){

    return (
        <Card className={"w-full h-dvh flex flex-col"}>
            <CardHeader>
                <CardTitle className={"text-2xl"}>Chat</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className={"h-5/6"}>
            </CardContent>
            <CardFooter className={"w-full flex items-center justify-center"}>
                <div className={"max-w-[1000px] flex items-center justify-end gap-3 w-4/5 min-w-[360px]"}>
                    <Input className={"h-12 rounded-xl "} placeholder={"Type you messages here..."}
                              id={"type-message"}></Input>
                    <Button className={"bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10"}>
                        <div className={"fa-sharp-duotone fa-light fa-paper-plane-top text-center"}></div>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}