import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI as string;

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    client = new MongoClient(uri);
    clientPromise = client.connect();
} else {
    clientPromise = MongoClient.connect(uri);
}

export default clientPromise;