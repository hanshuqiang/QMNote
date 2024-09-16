import { app, ipcMain } from 'electron'
import { makeRequest, ResponseOptions } from 'electron/utils/makeRequest'
import Database from 'better-sqlite3'

export function note(win: Electron.BrowserWindow) {
    const db = new Database('database.db')

    ipcMain.handle('add-catalog', async (event: Electron.IpcMainInvokeEvent, args: any) => {
        args = JSON.parse(args)
        console.log('event', args)
        try {
            // db.exec(`CREATE TABLE IF NOT EXISTS NoteCatalog ( id INTEGER PRIMARY KEY,name TEXT NOT NULL,parent_id INTEGER);`);
            let sql = `  INSERT INTO NoteCatalog (name, parent_i,type)  VALUES ('${args.name}',${args.parent_id},'${args.type}');`
            db.exec(sql)
            // query all users
            const result = db.prepare('SELECT * FROM NoteCatalog').all()
            let res: ResponseOptions = {
                code: 0,
                data: result,
                message: ''
            }
            return res
        } catch (e: any) {
            console.log('error', e.message)
        }
    })
    ipcMain.handle('get-catalog', async (event: Electron.IpcMainInvokeEvent, args: any) => {
        args = JSON.parse(args || '{}')
        let res: ResponseOptions = {
            code: 0,
            data: {},
            message: ''
        }
        try {
            const result = db.prepare('SELECT * FROM NoteCatalog').all()
            res.data = result
            console.log('result', result)

            return res
        } catch (e: any) {
            res.code = 1
            res.message = e.message
            return res
        }
    })
}
