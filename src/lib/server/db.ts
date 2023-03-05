import Surreal from 'surrealdb.js';
import {
    SURREALDB_NS,
    SURREALDB_DB,
    SURREALDB_URL,
    SURREALDB_USER,
    SURREALDB_PASS,
} from "$env/static/private";
import { dev } from '$app/environment';
import { log } from '$lib/logger';
import { withTimeout } from '$lib/utils';
// ALWAYS MAKE SURE THAT THE SURREAL DB BINARY IS RUNNING !!!

declare global {
    var surrealdb: Surreal
}

export type Result<T> = {
    time: string;
    status: string;
    result: T[];
}
export let db = global.surrealdb;
export async function conectDB() {
    if (db) return;
    log.warn('creating new connection to db!');
    try {
        db = new Surreal(SURREALDB_URL);
        await withTimeout(db.signin({
            user: SURREALDB_USER,
            pass: SURREALDB_PASS,
        }));
        await withTimeout(db.use(SURREALDB_NS, SURREALDB_DB));
        if (dev) global.surrealdb = db;
        log.info('db connected ');
    } catch (error) {
        log.error('connecting to db:', error);
    }
}

// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
