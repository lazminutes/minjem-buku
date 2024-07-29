import type { Metadata, Viewport } from "next"
import { env } from "@/env.js"

import "@/styles/globals.css"

import { auth } from "@/auth"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { SessionProvider } from "next-auth/react"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/providers"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: "Minjem Buku",
    template: `%s - Minjem Buku`,
  },
  description: "Minjem Buku",
  keywords: [
    "nextjs",
    "react",
    "react server components",
    "books",
    "loans",
    "lazminutes",
  ],
  authors: [
    {
      name: "lazminutes",
    },
  ],
  creator: "lazminutes",
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="id" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            GeistSans.variable,
            GeistMono.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  )
}
