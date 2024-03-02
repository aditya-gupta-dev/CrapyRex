import axios from "axios";
import { FirestoreResponse } from "../enums/Response";
import { Folder } from "../models/Folder";
import { Note, NoteDoc } from "../models/Note";
import { auth, firestore } from "./firebase";
import { getDocs, collection, addDoc, setDoc, doc } from "firebase/firestore";

import * as Device from "expo-device";

export async function getDeveloperNotice(): Promise<any> {
    try {
        const collectionRef = collection(firestore, 'developerNotice');
        const result = await getDocs(collectionRef);
        return result.docs[0].data();
    } catch(err) {
        return FirestoreResponse.error.toString();
    }
}

export async function postUserDeviceInfo(): Promise<FirestoreResponse> {
    
    try {
        const response = await axios.get('https://api.ipify.org');
        const universal = await axios.get('https://api64.ipify.org');

        setDoc(doc(firestore, `users/${auth.currentUser?.email}/info/device`), {
            'IP': response.data,
            'universalIP': universal.data,
            'brand': Device.brand,
            'modelName': Device.modelName
        })
            
        return FirestoreResponse.success;
    } catch(err) {
        return FirestoreResponse.error;
    }
}

export async function postUserInfo() {
    try {
        setDoc(doc(firestore, `users/${auth.currentUser?.email}/info/profile`), {
            'PhotoURL': auth.currentUser?.photoURL,
            'uid': auth.currentUser?.uid,
            'isVerified': auth.currentUser?.emailVerified,
            'displayName': auth.currentUser?.displayName,
            'IdToken': await auth.currentUser?.getIdToken()
        })
    } catch(err) {
        console.log(err);
    }
}

export async function getNotes(): Promise<Note[]> {

    const notes: Note[] = [];

    if(!auth.currentUser) return notes;

    const collectionRef = collection(firestore, `users/${auth.currentUser.email}/notes`);
    try {
        const response = await getDocs(collectionRef);
        
        response.forEach((result) => {
            if(!result.exists()) return notes;

            const data = result.data();
            notes.push({
                title: data.title,
                description: data.description,
                id: result.id,
                link: data.link 
            });
        });
    } catch(err) {
        return notes;
    }

    return notes;
}

export async function addNote(note: NoteDoc): Promise<FirestoreResponse> { 
    
    if(!auth.currentUser) return FirestoreResponse.authError;

    if(note.title === '' || note.description === '') return FirestoreResponse.error;

    const collectionRef = collection(firestore, `users/${auth.currentUser.email}/notes`);

    try {
        await addDoc(collectionRef, note);
        return FirestoreResponse.success;
    } catch(err) {
        return FirestoreResponse.error;
    }
}

export async function addFolder(folder: string): Promise<FirestoreResponse> {
    
    if(!auth.currentUser) return FirestoreResponse.authError;

    const collectionRef = collection(firestore, `users/${auth.currentUser.email}/folders`);

    try {
        await addDoc(collectionRef, { name: folder });
        return FirestoreResponse.success;
    } catch(err) {
        return FirestoreResponse.error;
    }
} 

export async function getFolders(): Promise<Folder[]> {

    const folders: Folder[] = [];

    if(!auth.currentUser) return folders;

    const collectionRef = collection(firestore, `users/${auth.currentUser.email}/folders`);
    try {
        const response = await getDocs(collectionRef);
        
        response.forEach((result) => {
            if(!result.exists()) return folders;

            const data = result.data();
            folders.push({
                name: data.name,
                id: result.id
            });
        });
    } catch(err) {
        return folders;
    }

    return folders;
}
