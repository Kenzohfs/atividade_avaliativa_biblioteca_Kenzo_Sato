const { initializeApp } = require('firebase/app');
const {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    query,
    where,
    getDocs,
    getDoc,
    deleteDoc
} = require("firebase/firestore/lite");

const firebaseConfig = {
    apiKey: "AIzaSyCKf6unvJ0G4EHRV3v1FtblEe5mHj8qCwU",
    authDomain: "biblioteca-kenzo.firebaseapp.com",
    projectId: "biblioteca-kenzo",
    storageBucket: "biblioteca-kenzo.appspot.com",
    messagingSenderId: "497858430979",
    appId: "1:497858430979:web:2d627fe84a6fb667ea6636"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore();

async function save(nomeTabela, id, dado) {
    if (id) {
        const referencedEntity = await setDoc(doc(db, nomeTabela, id), dado);
        const savedData = {
            ...dado,
            id: id
        }
        return savedData;
    } else {
        const referencedEntity = await addDoc(collection(db, nomeTabela), dado);
        const savedData = {
            ...dado,
            id: referencedEntity.id
        }
        return savedData;
    }
}

async function get(nomeTabela) {
    const tableRef = collection(db, nomeTabela);

    const q = query(tableRef);

    const querySnapshot = await getDocs(q);

    const lista = [];

    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);
    })

    return lista;
}

async function getById(nomeTabela, id) {
    const docRef = doc(db, nomeTabela, id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
        return docSnap.data();
    } else {
        return new Error("Not found!");
    }
}

async function remove(nomeTabela, id) {
    const dado = await deleteDoc(doc(db, nomeTabela, id));
    return {
        message: `${id} deleted!`
    }
}

async function returnSelect(tableName, dataName, data) {
    const dbRef = await db.collection(tableName);
    const linhaRef = await dbRef.where(dataName, '==', data);
    console.log("linharef>: ", linhaRef);
    return linhaRef;
}

module.exports = {
    save,
    get,
    getById,
    remove,
    returnSelect
}