import { MongoClient, ServerApiVersion } from "mongodb"

if (!process.env.DB_URI) {
    throw new Error("Mongo URI not found!")
}

const client = new MongoClient(process.env.DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})


async function getDB(dbName: string) {
    try {
        console.log("Connecting to Server")
        await client.connect()
        console.log(">>>>Connected to Server<<<<")
        console.log("Getting Database " + dbName)
        return client.db(dbName)
    } catch (err) {
        console.log(err)
    }
}

export default async function getCollection(collectionName: string) {
    const db = await getDB('sample_mflix')
    console.log("Getting Collection " + collectionName)
    if (db) {
        return db.collection(collectionName)
    }
    return null;
}