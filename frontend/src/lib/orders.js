import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const createOrder = async (payload) => {
  const order = {
    ...payload,
    status: "paid",
    statusHistory: [
      { status: "pending", at: Date.now() },
      { status: "paid", at: Date.now() },
    ],
    createdAt: Date.now(),
  };
  const ref = await addDoc(collection(db, "orders"), order);
  return { id: ref.id, ...order };
};

export const updateOrderStatus = async (orderId, status, history) => {
  const ref = doc(db, "orders", orderId);
  await updateDoc(ref, {
    status,
    statusHistory: [...(history || []), { status, at: Date.now() }],
  });
};

export const shortId = (id) => (id ? id.slice(-8).toUpperCase() : "");
