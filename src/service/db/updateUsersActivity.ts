import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore'
import store from '../../store/store'

/* eslint consistent-return: off */
export const updateUsersActivity = async (): Promise<void> => {
    const user = store.getCurrentUser()
    const db = store.getDB
    if (user && db) {
        const usersDBRef = collection(db, 'users')
        const userINFOQuery = query(usersDBRef, where('id', '==', user.uid))
        const result = await getDocs(userINFOQuery)
        const usersDoc = await doc(usersDBRef, result.docs[0].id)
        await updateDoc(usersDoc, {
            lastActivity: Date.now(),
        })
    }
}
