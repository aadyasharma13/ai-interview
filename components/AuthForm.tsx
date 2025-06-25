"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { toast } from 'sonner';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUp, signIn } from "@/lib/actions/auth.action";
import FormFeild from "./FormFeild";


const authFormSchema = (type:FormType) => {
    return z.object({
        name:type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email:z.string().email(),
        password:z.string().min(3),
    })
}

const AuthForm = ({ type }: { type:FormType}) => {
    const formSchema = authFormSchema(type);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            if (type === "sign-up") {
                const {name,email,password} = data;

                const userCredential = await createUserWithEmailAndPassword(auth,email,password);

                const result = await signUp({
                    uid:userCredential.user.uid,
                    name: name!,
                    email,
                    password,
                })

                if(!result?.success){
                    toast.error(result?.message);
                    return;
                }

                toast.success("Account created successfully. Please sign in.");
                router.push("/sign-in");
            }else{
                const {email,password} = data;
                const userCredential = await signInWithEmailAndPassword(auth,email,password);

                const idToken = await userCredential.user.getIdToken();

                if(!idToken){
                    toast.error("Sign in Failed. Please try again.");
                    return;
                }

                await signIn({
                    email,
                    idToken,
                })

                toast.success("Signed in successfully.");
                router.push("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(`There was an error: ${error}`);
        }
    }

    const isSignIn = type === "sign-in";
    const isSignUp = type === "sign-up";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" width={38} height={32} style={{ height: 'auto' }} />
                    <h2 className="text-2xl font-bold">PrepWise</h2>
                </div>
                <h3>Practice job interviews with ai</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                        {!isSignIn && (
                            <FormFeild
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your Name"
                                type="text"
                            />
                        )}
                        <FormFeild
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Your email address"
                            type="email"
                        />
                        <FormFeild
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />
                        {/* Add more fields for sign up if needed, e.g., confirm password, company, role, location */}
                        <Button className="btn" type="submit">{isSignIn ? "Sign In" : "Create an Account"}</Button>
                    </form>
                </Form>

                <p className="text-center text-sm text-muted-foreground">
                    {isSignIn ? "No account yet?" : "Have an account already?"}
                    <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary ml-1">
                        {!isSignIn ? "Sign In" : "Sign Up"}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm;