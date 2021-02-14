const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const serviceAccount = require('./firestore-auth.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function insertFile(inputDatabase, inputCollection, inputDoc){
    var docUUID = uuidv4();
    
    const dbID = db.collection(inputDatabase).doc('default').collection(inputCollection).doc(docUUID);
    inputDoc.id = docUUID;
    var document = inputDoc;
    await dbID.set(document);
    console.log(docUUID);

    return docUUID;
}

async function updateFile(inputDatabase, inputCollection, inputDoc, inputUUID){
    const dbID = db.collection(inputDatabase).doc('default').collection(inputCollection).doc(inputUUID);
    await dbID.set(document);
    console.log(inputUUID);
    return inputUUID;
}

async function getFile(inputDatabase, inputCollection, inputQuery, inputOptions){
    const collection = db.collection(inputDatabase).doc('default').collection(inputCollection);
    var snapshot = collection;
    var keys = Object.keys(inputQuery);
    var vals = Object.values(inputQuery);
    for(var key in keys){
        console.log('key' + keys[key])
        var stringKey = keys[key];
        snapshot = snapshot.where(keys[key], '==', inputQuery[stringKey])
    }
    snapshot = await snapshot.get();
    var data = []
    snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        data.push(doc.data());
    })
    //console.log(data);
    return data //(await snapshot.get()).data();
}

async function getFileById(inputDatabase, inputCollection, inputID, inputOptions){
    const collection = db.collection(inputDatabase).doc('default').collection(inputCollection);
    const doc = await collection.doc(inputID).get();
    var data = await doc.data();
    // if(inputOptions == null || inputOptions != "==" || inputOptions == {}){
    //     console.log("alternative operator")
    //     snapshot = await collection.where("id", "==", inputID).get();
    console.log(data);
    return data;
}

module.exports = {insertFile, getFile, getFileById}

//insertFile("test","test",{data: 'test34'})
//getFile('trek', 'auth', {username: 'testing'}); //6

//getFile('trek','api-assembled', {id: 'bf1919f1-354d-4324-af5a-e4f39e27451c'})

//getFileById('trek', 'api-assembled', 'bf1919f1-354d-4324-af5a-e4f39e27451c')