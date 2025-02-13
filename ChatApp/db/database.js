import { Platform } from "react-native"
let SQLite;
if(Platform.OS!=="web"){
    SQLite = require("expo-sqlite");
}
export const openDB=async()=>{
    return await SQLite.openDatabaseAsync('chatapplocaldb')
}

export async function startTheDB(db){
    try {
      await db.runAsync('CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY AUTOINCREMENT,sender TEXT, message TEXT, timestamp TEXT,chatID INTEGER);')
      
      await db.runAsync('CREATE TABLE IF NOT EXISTS  chats (id INTEGER PRIMARY KEY AUTOINCREMENT,chatName TEXT)' )

      await db.runAsync('CREATE TABLE IF NOT EXISTS screenPosition (id INTEGER PRIMARY KEY AUTOINCREMENT,position REAL,chatID INTEGER)')

    } catch (error) {
        console.error("See yourseld you moron ", error)
    }
}

export async function addMessage(db,sender,message,timestamp,chatID) {
    try{
        await db.runAsync("Insert INTO messages(sender,message,timestamp,chatID) VALUES (?,?,?,?)",[sender,message,timestamp,chatID])
    }catch(error){
        console.error("Thadlfk",error)
    }
}
export async function getMessagesByChatID(id,db){
    try{
        return await db.getAllAsync(`Select * from messages where chatID=${id}`)
    }catch(error){
        console.error("Thadlfk",error)
    }
}
export async function getScreenPosition(chatID,db){
    try{
        return await db.getFirstAsync(`Select * from screenPosition where chatID=${chatID}`)
    }catch(error){
        console.error("Thadlfk",error)
    }
}
export async function saveScreenPosition(ScreenPosition,chatID,db){
    try{
        await db.runAsync("Insert INTO screenPosition(position,chatID) VALUES (?,?)",[ScreenPosition,chatID])
    }catch(error){
        console.error("Thadlfk",error)
    }
}