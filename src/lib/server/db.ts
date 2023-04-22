import { Cirql } from 'cirql';

import {
	SURREALDB_NS,
	SURREALDB_DB,
	SURREALDB_URL,
	SURREALDB_USER,
	SURREALDB_PASS,
} from '$env/static/private';
import { dev } from '$app/environment';
import { log } from '$lib/logger';
import { withTimeout } from '$lib/utils';
// ALWAYS MAKE SURE THAT THE SURREAL DB BINARY IS RUNNING !!!

declare global {
	var surrealdb: Cirql;
}

export let db = global.surrealdb;
export async function conectDB() {
	if (db) return;
	log.warn('creating new connection to db!');
	try {
		db = new Cirql({
			connection: {
				endpoint: SURREALDB_URL,
				namespace: SURREALDB_NS,
				database: SURREALDB_DB,
			},
			credentials: {
				user: SURREALDB_USER,
				pass: SURREALDB_PASS,
			},
			autoConnect: true,
			logging: dev,
			logPrinter: log.db_log,
		});
		await withTimeout(db.ready(), 'db connection timed out');
		if (dev) global.surrealdb = db;
		log.info('db connected ');
	} catch (error) {
		log.error('connecting to db:', error);
	}
}
