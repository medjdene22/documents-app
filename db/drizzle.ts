import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export const sql = neon('postgresql://neondb_owner:TPBEJrV0W2lI@ep-icy-lake-a8tspzdr.eastus2.azure.neon.tech/neondb?sslmode=require');
export const db = drizzle(sql);



