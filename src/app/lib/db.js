// import { MongoClient } from "mongodb";
 const {DB_USERNAME,DB_PASSWORD} = process.env;


export const connectionStr = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.blmpx9a.mongodb.net/resto-app?appName=Cluster0`; //Atlas url