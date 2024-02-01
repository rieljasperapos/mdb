"use client"
import { Input } from "@components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { CardWrapper } from "./card-wrapper"
import { Button } from "@components/ui/button"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export const RegisterForm = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { status } = useSession();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/dashboard");
    }
  }, [status])

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    // TODO: API Fetch
    fetch("https://api-mdb.vercel.app/register-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        if (data.status) {
          setSuccess(data.message);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }
  return (
    <div className="flex justify-center items-center my-12">
      {status === "unauthenticated" ? (
        <>
          <CardWrapper
            headerTitle="Register"
            headerLabel="Greetings!"
            login="Already have an account?"
            loginHref="/auth/login"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="John Doe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
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
                <FormError message={error} />
                <FormSuccess message={success} />
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
        <p>Loading...</p>
      )}
    </div>
  )
}