import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export const sql = neon("postgresql://neondb_owner:tGHfN6iQY3Mv@ep-snowy-silence-a51l576c.us-east-2.aws.neon.tech/neondb?sslmode=require");
export const db = drizzle(sql);

