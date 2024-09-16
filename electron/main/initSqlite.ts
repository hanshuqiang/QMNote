import Database from 'better-sqlite3';

export function initSqlite() {
    const db = new Database('database.db');
    try {
        db.exec(`CREATE TABLE IF NOT EXISTS NoteCatalog ( id INTEGER PRIMARY KEY,name TEXT NOT NULL,parent_id INTEGER);`);
        // const stmt = db.prepare( `SELECT name FROM sqlite_master WHERE type='table';`);
        // const tables = stmt.all();
        // console.log("tables", tables);
        //delete all tables
        // tables.forEach((table: any) => {
        //   db.exec(`DROP TABLE IF EXISTS ${table.name}`);
        // });

        // query all users
        const users = db.prepare('SELECT * FROM NoteCatalog').all();
        console.log(users);
    } catch (e: any) {
        console.log('error', e.message);
    }
}
