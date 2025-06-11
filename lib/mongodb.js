import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const options = {};


let client;
let clientPromise;

if (!uri) {
  throw new Error('⚠️ Please define the MONGO_URI environment variable in .env.local');
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;


export const connectToDatabase = async () => {
  const client = await clientPromise;
  return client.db(); 
};

