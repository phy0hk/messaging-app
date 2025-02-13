'use client'
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label"
import Link from "next/link"
import {useState} from "react";
import {Button} from "@/components/ui/button"
import {NextResponse} from "next/server";
export default function LoginFormCard(){
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        const handleSubmit = (e) => {
            e.preventDefault()
            console.log('Login attempt with:', { email, password })
            }

    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="text-sm">
                        <Link href="/forgot-password" className="text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <Button type="submit" className="w-full">Log in</Button>
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
                        </div>
                    </div>
                    <Link href={'/register'} className={'w-full'}>
                    <Button variant="outline" className="w-full" >
                        Create account
                    </Button>
                    </Link>
                </CardFooter>
            </form>
        </Card>);
        }