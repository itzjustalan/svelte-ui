import Surreal from 'surrealdb.js';
import {
    SURREALDB_NS,
    SURREALDB_DB,
    SURREALDB_URL,
    SURREALDB_USER,
    SURREALDB_PASS,
} from "$env/static/private";

export const db = connectDB;

async function connectDB() {
    // modify this function to hold only one instance and reconnect
    // but ig surreal does that automagically so... idk
    try {
        // console.log('info: connecting to db.')
        const db = new Surreal(SURREALDB_URL);
        await db.signin({
            user: SURREALDB_USER,
            pass: SURREALDB_PASS,
        });
        await db.use(SURREALDB_NS, SURREALDB_DB);
        console.log('info: connected to db.')
        return db;
    } catch (error) {
        console.log('error: connecting to db.')
    }
}

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
