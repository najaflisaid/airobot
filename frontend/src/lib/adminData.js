import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

export const createProduct = (data) => addDoc(collection(db, "products"), { ...data, createdAt: Date.now() });
export const updateProduct = (id, data) => updateDoc(doc(db, "products", id), data);
export const deleteProduct = (id) => deleteDoc(doc(db, "products", id));

export const createCategory = (data) => addDoc(collection(db, "categories"), { ...data, createdAt: Date.now() });
export const deleteCategory = (id) => deleteDoc(doc(db, "categories", id));
