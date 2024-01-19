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
import { redirect } from "next/navigation"
import { signIn, useSession } from "next-auth/react"

export const LoginForm = () => {
  const { data: session, status } = useSession();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password
    });

    if (res?.ok) {
      // TODO: add toast popup
      
    }
  }

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex justify-center items-center my-12">
      {status === "unauthenticated" ? (
        <>
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
        </>
      ):(
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}