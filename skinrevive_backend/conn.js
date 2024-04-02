import { MongoClient } from "mongodb";
const connectionString =
  "mongodb+srv://saloniprasad9:7xzH71kiRWsKnYe4@skinrevivecluster.plxunu7.mongodb.net/?retryWrites=true&w=majority&appName=SkinreviveCluster";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let conn;

try {
  conn = await client.connect();

  console.log("Successfully connected to MongoDB.");
} catch (e) {
  console.error(e);
}

let db = conn.db("skin_revive");
export default db;
