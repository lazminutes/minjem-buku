"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authSchema } from "@/lib/validations/auth"

type Inputs = z.infer<typeof authSchema>

export function LoginForm() {
  const router = useRouter()
  //   const { isLoaded, signIn, setActive } = useSignIn()
  const [loading, setLoading] = React.useState(false)

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  //   async function onSubmit(data: Inputs) {
  //     if (!isLoaded) return

  //     setLoading(true)

  //     try {
  //       const result = await signIn.create({
  //         identifier: data.email,
  //         password: data.password,
  //       })

  //       if (result.status === "complete") {
  //         await setActive({ session: result.createdSessionId })

  //         router.push(`${window.location.origin}/`)
  //       } else {
  //         /*Investigate why the login hasn't completed */
  //         console.log(result)
  //       }
  //     } catch (err) {
  //       showErrorToast(err)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        //   onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="hi@lazminutes.com" {...field} />
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
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2" disabled={loading}>
          {loading && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Login
          <span className="sr-only">Login</span>
        </Button>
      </form>
    </Form>
  )
}
