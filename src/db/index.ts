// import postgres from "postgres"
import { sql } from "@vercel/postgres"
import { drizzle } from "drizzle-orm/vercel-postgres"

import * as schema from "./schema"

export const db = drizzle(sql, { schema })
// import { env } from "@/env.js"
// import { drizzle } from "drizzle-orm/postgres-js"
// import postgres from "postgres"

// import * as schema from "./schema"

// const client = postgres(env.DATABASE_URL)
// export const db = drizzle(client, { schema })
