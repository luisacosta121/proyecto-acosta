import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDTi9TijoT7Pp2OaEe6QpH628fc60NWctM",
  authDomain: "el-pibe-play.firebaseapp.com",
  projectId: "el-pibe-play",
  storageBucket: "el-pibe-play.appspot.com",
  messagingSenderId: "499565355333",
  appId: "1:499565355333:web:cfa469f1365693281b9e2c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)