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
import { FormError } from "@components/form-error"
import { FormSuccess } from "@components/form-success"
import { CardWrapper } from "@components/auth/card-wrapper"
import { Button } from "@components/ui/button"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schemas"
import { useForm } from "react-hook-form"
import { useState } from "react"

export const RegisterForm = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues:{
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    // TODO: API Fetch
    fetch("http://localhost:3001/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
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
        console.log(data);
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
            <FormError message="" />
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
    </div>
  )
}