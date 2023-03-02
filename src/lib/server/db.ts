import Surreal from 'surrealdb.js';
import {
    SURREALDB_NS,
    SURREALDB_DB,
    SURREALDB_URL,
    SURREALDB_USER,
    SURREALDB_PASS,
} from "$env/static/private";
import { dev } from '$app/environment';

export type Result<T> = {
  time: string;
  status: string;
  result: T[];
}

declare global {
    var surrealdb: Surreal
}

// ALWAYS MAKE SURE THAT THE SURREAL DB BINARY IS RUNNING !!!

// to escape hotreload
// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
export let db = global.surrealdb;
export async function initDB() {
    if (db) return;
    try {
        console.log('info: creating new connection to db.');
        db = new Surreal(SURREALDB_URL);
        await db.signin({
            user: SURREALDB_USER,
            pass: SURREALDB_PASS,
        });
        await db.use(SURREALDB_NS, SURREALDB_DB);
        if (dev) global.surrealdb = db;
        console.log('info: connected to db.');
    } catch (error) {
        if (dev) {
            console.log('error: connecting to db!', error);
        } else {
            console.log('error: connecting to db!');
        }
    }
}

// console.log('info: connecting to db.')
// const db = new Surreal(SURREALDB_URL);
// await db.signin({
//     user: SURREALDB_USER,
//     pass: SURREALDB_PASS,
// });
// await db.use(SURREALDB_NS, SURREALDB_DB);
// console.log('info: connected to db.')
// export default db;




// export const db = new Surreal(SURREALDB_URL);
// export async function initDB() {
//     try {
//         console.log('info: connecting to db.');
//         await Surreal.Instance.connect(SURREALDB_URL);
//         await Surreal.Instance.signin({
//             user: SURREALDB_USER,
//             pass: SURREALDB_PASS,
//         });
//         await Surreal.Instance.use(SURREALDB_NS, SURREALDB_DB);
//         await Surreal.Instance.wait();
//         console.log('info: connected to db.');
//     } catch (error) {
//         if (dev) {
//             console.log('error: connecting to db!', error);
//         } else {
//             console.log('error: connecting to db!');
//         }
//     }
// }
// export let db: Surreal;
// export async function initDB() {
//     console.log('info: connecting to db.');
//     if (db) return db;
//     try {
//         db = new Surreal(SURREALDB_URL);
//         await db.signin({
//             user: SURREALDB_USER,
//             pass: SURREALDB_PASS,
//         });
//         await db.use(SURREALDB_NS, SURREALDB_DB);
//         await db.wait();
//         console.log('info: connected to db.');
//     } catch (error) {
//         if (dev) {
//             console.log('error: connecting to db!', error);
//         } else {
//             console.log('error: connecting to db!');
//         }
//     }
// }
// export { db };



// console.log('info: connecting to db.!')
// const db = new Surreal(SURREALDB_URL);

// try {
//     await db.signin({
//         user: SURREALDB_USER,
//         pass: SURREALDB_PASS,
//     });
//     await db.use(SURREALDB_NS, SURREALDB_DB);
//     console.log('info: connected to db.')

// } catch (error) {
//     console.log('error: connecting to db.')
// }

// export default {
//     db: db,
// }



// export const db = connectDB();

// async function connectDB() {
//     // modify this function to hold only one instance and reconnect
//     // but ig surreal does that automagically so... idk
//     try {
//         // console.log('info: connecting to db.')
//         const db = new Surreal(SURREALDB_URL);
//         await db.signin({
//             user: SURREALDB_USER,
//             pass: SURREALDB_PASS,
//         });
//         await db.use(SURREALDB_NS, SURREALDB_DB);
//         console.log('info: connected to db.')
//         return db;
//     } catch (error) {
//         console.log('error: connecting to db.')
//         return new Surreal();
//     }
// }

// export const testDB = async () => {
//     const db = await connectDB();
//     if (!db) return 'no-db';
//     console.log('hsds');
//     console.log(db);
//     let created = await db.create("person", {
//         title: 'Founder & CEO',
//         name: {
//             first: 'Tobie',
//             last: 'Morgan Hitchcock',
//         },
//         marketing: true,
//         identifier: Math.random().toString(36).substr(2, 10),
//     });
//     let updated = await db.change("person:jaime", {
//         marketing: true,
//     });

//     // Select all people records
//     let people = await db.select("person");

//     // Perform a custom advanced query
//     let groups = await db.query('SELECT marketing, count() FROM type::table($tb) GROUP BY marketing', {
//         tb: 'person',
//     });
//     console.log({
//         created,
//         updated,
//         people,
//         groups,
//     });
//     return 'vaaal';
// }
