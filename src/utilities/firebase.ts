/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  deleteField,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  WhereFilterOp,
  limit,
  startAt,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import { getFunctions, httpsCallable } from 'firebase/functions'
import {
  getAuth,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { firebaseConfig } from '../constants/firebaseConfigs'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const provider = new GoogleAuthProvider()
const functions = getFunctions(firebaseApp, 'europe-west6')
const storage = getStorage(firebaseApp, 'gs://black-academy.appspot.com')

export const userSignOut = () => {
  const auth = getAuth()
  signOut(auth)
}

export const googleSignIn = async () => {
  const auth = getAuth()
  const response = await signInWithPopup(auth, provider)
  return response
}

export const getLoggedUser = async (): Promise<User | null> => {
  const auth = getAuth()
  const getUser = (): Promise<User | null> => {
    return new Promise(resolve => {
      onAuthStateChanged(auth, user => {
        resolve(user)
      })
    })
  }

  const user = await getUser()
  return user
}

export const emailSignUp = async ({ email, password }: { email: string; password: string }) => {
  const auth = getAuth()
  const response = await createUserWithEmailAndPassword(auth, email, password)
  return response
}

export const emailSignIn = ({ email, password }: { email: string; password: string }) => {
  const auth = getAuth()
  return signInWithEmailAndPassword(auth, email, password)
}

export const passwordResetEmail = async (email: string) => {
  const auth = getAuth()
  const response = await sendPasswordResetEmail(auth, email)
  console.log(response)
}

export const getCollection = async ({ collectionId }: { collectionId: string }) => {
  const querySnapshot = await getDocs(collection(db, collectionId))
  return querySnapshot.docs.map(doc => doc.data())
}

export const getCollectionWithQueries = async ({
  collectionId,
  queries,
  page,
  pageSize,
  orderFields,
}: {
  collectionId: string
  queries: { key: string; operator: string; value: string | string[] | boolean | null }[]
  page?: number
  pageSize?: number
  orderFields?: string[]
}) => {
  const q = query(
    collection(db, collectionId),
    ...queries.map(({ key, operator, value }) => where(key, operator as WhereFilterOp, value)),
    ...(pageSize ? [limit(10)] : []),
    ...(page && page > 0 && pageSize ? [startAt(page * pageSize)] : []),
    ...(orderFields?.length ? orderFields.map(field => orderBy(field)) : []),
  )

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => doc.data())
}

export const setCollectionWatcherWithQueries = ({
  collectionId,
  queries,
  setChanges,
}: {
  collectionId: string
  queries: { key: string; operator: string; value: string | string[] | boolean | null }[]
  setChanges: (changes: any) => void
}) => {
  const q = query(
    collection(db, collectionId),
    ...queries.map(({ key, operator, value }) => where(key, operator as WhereFilterOp, value)),
  )
  return onSnapshot(q, response => {
    const changes = response.docs.reduce((list, doc) => {
      const data = doc.data()
      return { ...list, [doc.id]: data }
    }, {})
    setChanges(changes)
  })
}

export const getCollectionDoc = async ({ collectionId, docId }: { collectionId: string; docId: string }) => {
  const docRef = doc(db, collectionId, docId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) return docSnap.data()
  else return {}
}

export const setCollectionDoc = async ({
  collectionId,
  docId,
  data,
}: {
  collectionId: string
  docId: string
  data: any
}) => {
  const docRef = doc(db, collectionId, docId)
  await setDoc(docRef, data)

  return data
}

export const addCollectionDoc = async ({
  collectionId,
  data,
  idName = 'id',
}: {
  collectionId: string
  data: any
  idName?: string
}) => {
  const docRef = await addDoc(collection(db, collectionId), data)

  const docId = docRef.id

  await updateDoc(docRef, { [idName]: docId })

  return {
    ...data,
    [idName]: docId,
  }
}

export const deleteCollectionDoc = async ({ collectionId, docId }: { collectionId: string; docId: string }) => {
  const docRef = doc(db, collectionId, docId)
  await deleteDoc(docRef)
}

export const updateCollectionDoc = async ({
  collectionId,
  docId,
  data,
}: {
  collectionId: string
  docId: string
  data: any
}) => {
  const docRef = doc(db, collectionId, docId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) await updateDoc(docRef, data)
}

export const deleteCollectionDocField = async ({
  collectionId,
  docId,
  keyId,
}: {
  collectionId: string
  docId: string
  keyId: string
}) => {
  const docRef = doc(db, collectionId, docId)
  await updateDoc(docRef, {
    [keyId]: deleteField(),
  })
}

export const callFirebaseFunction = async ({ functionName, data }: { functionName: string; data: any }) => {
  const firebaseFunction = httpsCallable(functions, functionName)
  const response = await firebaseFunction(data)
  return response
}

export const getStorageUrl = async ({ path }: { path: string }) => {
  const storageRef = ref(storage, path)
  const url = await getDownloadURL(storageRef)
  return url
}
