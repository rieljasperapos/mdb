"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { LoginSchema } from "@/schemas"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { CardWrapper } from "@components/auth/card-wrapper"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"
import { FormError } from "@components/form-error"
import { FormSuccess } from "@components/form-success"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


export const LoginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    fetch("http://localhost:3001/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify( values )
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      return res.json();
    })
    .then((data) => {
      if (data.status) {
        router.push("/dashboard");
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }

  useEffect(() => {
    fetch("http://localhost:3001/auth", {
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}`)
        }
        return res.json();
      })
      .then((data) => {
        if (data.status) {
          router.push("/dashboard")
        } else {
          router.push("/auth/login")
        }
      })
      .catch((err: Error) => {
        console.error(err);
      })
  })

  return (
    <div className="flex justify-center items-center my-12">
      <CardWrapper
        headerTitle="Login"
        headerLabel="Welcome Back!"
        showSocial
        register="Dont have an account?"
        registerHref="/auth/register"
      >
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-8"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="john.doe@sample.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="********" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message="" />
            <FormSuccess message="" />
            <Button 
              className="w-full" 
              type="submit"
              >
                Submit
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}