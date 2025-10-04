import { MongoClient, ServerApiVersion } from "mongodb"
import { Session } from "next-auth";
import { PutBlobResult } from "@vercel/blob";

const getClient = (dbUri: string) => {
  return (
    new MongoClient(dbUri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })
  )
}

async function getDB(dbName: string, session: Session | null) {
    const dbUri = session ? process.env.DB_URI_ADMIN : process.env.DB_URI 
    if (!dbUri) {
        throw new Error("No Database URI Found!")
    }
    const client = getClient(dbUri)
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

export async function getCollection(collectionName: string, session: Session | null) {
    const db = await getDB('sample_mflix', session)
    if (!db) throw new Error("Database not found!")
    console.log("Getting Collection " + collectionName)
    return db.collection(collectionName)
}

export async function uploadImage(
	name: string,
	url: PutBlobResult,
    description: string,
    session: Session | null
) {
    const collection = await getCollection('img_ref', session)
	const results = await collection?.insertOne({
		name,
		url,
		description,
	});
	console.log(results?.acknowledged);
}