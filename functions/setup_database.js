const db = require('./api/database')

async function setupDatabase(req, res, next) {
    // To delete all the collections
    // const collections = ['users', 'todos']
    // collections.forEach(async (collection) => await deleteCollection(collection))

    // Add documents to the todos collection
    addDocuments(
        'members',
        [
            
          { 
            name: "Taylor",
            sleeve: 23.7,
            chest: 21.5,
            body: 18.0 },
          { 
            name: "Kakak",
            sleeve: 21.6,
            chest: 19.9,
            body: 17.4 },
          { 
            name: "Mom",
            sleeve: 24.5,
            chest: 21.8,
            body: 19.9 },
          { 
            name: "Lina",
            sleeve: 25.5,
            chest: 22.4,
            body: 20.2 }
        ]
    )

    res.send('Setting Up Database.... Done ')
}

async function deleteCollection(collection) {
    const cref = db.firestore.collection(collection)
    const docs = await cref.listDocuments()
    docs.forEach((doc) => doc.delete())
}

function addDocuments(collection, docs) {
    docs.forEach((doc) => db.create(collection, doc))
}

module.exports = setupDatabase
