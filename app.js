// // const { MongoClient } = require('mongodb');

// // const uri = 'mongodb://127.0.0.1:27017';
// // const dbName = 'digistar';

// // const client = new MongoClient(uri);

// // client.connect((error, client) => {

// //     if(error) {
// //         return console.log('Unable to connect to database');
// //     }
// //     console.log('Connected to database');
// // });

// const { MongoClient } = require('mongodb');

// const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB URI
// const client = new MongoClient(uri);

// async function connectDB() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');

//     const db = client.db('digistar'); // Replace with your database name
//     const collection = db.collection('user'); // Replace with your collection name

//     // Example operation: Inserting a document
//     const result = await collection.insertOne({ name: 'John Doe', age: 30 });
//     console.log('Document inserted:', result.insertedId);

//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   } finally {
//     await client.close();
//   }
// }

// connectDB();
