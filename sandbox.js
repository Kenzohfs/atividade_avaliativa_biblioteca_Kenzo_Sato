const crud = require("./crud");

/*
    Instalado a biblioteca npm: npm install firebase-admin --save
    Instalado a biblioteca npm: npm install firebase

    Comandos para inicializar o firebase:
        // Import the functions you need from the SDKs you need
        import { initializeApp } from "firebase/app";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        const firebaseConfig = {
        apiKey: "AIzaSyCKf6unvJ0G4EHRV3v1FtblEe5mHj8qCwU",
        authDomain: "biblioteca-kenzo.firebaseapp.com",
        projectId: "biblioteca-kenzo",
        storageBucket: "biblioteca-kenzo.appspot.com",
        messagingSenderId: "497858430979",
        appId: "1:497858430979:web:2d627fe84a6fb667ea6636"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

    No gerenciamento do firebase:
    Criação -> Firestore database -> Criar banco de dados -> Modo de produção -> us-east1 -> Continuar

    Verificar se precisar botar uma configuração como true;
*/

// async function buscarDadoId() {
//     const dados = await crud.getById("Pessoas", "3jJdriJs1449GtfWbcEY")
//     console.log(dados);
// }