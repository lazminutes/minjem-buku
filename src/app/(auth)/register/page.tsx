import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { env } from "@/env.js"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shell } from "@/components/shell"

import { RegisterForm } from "../_components/register-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Register",
  description: "Register your account",
}

export default async function RegisterPage() {
  const session = await auth()

  if (session?.user) {
    if (Object.keys(session?.user).length > 0) redirect("/")
  }
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Daftar</CardTitle>
          <CardDescription>Minjem Buku</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">
              Sudah punya akun?
            </span>
            <Link
              aria-label="Sign up"
              href="/login"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
