// ============================================
// Firestore CRUD Helpers
// ============================================

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  WhereFilterOp,
  OrderByDirection,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

// Get all documents from a collection
export async function getDocuments<T>(
  collectionName: string
): Promise<T[]> {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

// Get a single document by ID
export async function getDocument<T>(
  collectionName: string,
  id: string
): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  }
  return null;
}

// Add a new document
export async function addDocument<T extends object>(
  collectionName: string,
  data: T
): Promise<string> {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

// Update an existing document
export async function updateDocument<T extends object>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// Delete a document
export async function deleteDocument(
  collectionName: string,
  id: string
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

// Get documents with a filter
export async function getDocumentsByQuery<T>(
  collectionName: string,
  field: string,
  operator: WhereFilterOp,
  value: unknown
): Promise<T[]> {
  const q = query(
    collection(db, collectionName),
    where(field, operator, value)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

// Get documents ordered by a field
export async function getOrderedDocuments<T>(
  collectionName: string,
  orderField: string,
  direction: OrderByDirection = "asc",
  limitCount?: number
): Promise<T[]> {
  let q = query(
    collection(db, collectionName),
    orderBy(orderField, direction)
  );
  if (limitCount) {
    q = query(q, limit(limitCount));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

// Get featured documents
export async function getFeaturedDocuments<T>(
  collectionName: string,
  limitCount?: number
): Promise<T[]> {
  let q = query(
    collection(db, collectionName),
    where("featured", "==", true),
    where("status", "==", "published")
  );
  if (limitCount) {
    q = query(q, limit(limitCount));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

// Get published documents
export async function getPublishedDocuments<T>(
  collectionName: string,
  orderField: string = "createdAt",
  direction: OrderByDirection = "desc"
): Promise<T[]> {
  const q = query(
    collection(db, collectionName),
    where("status", "==", "published"),
    orderBy(orderField, direction)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}
