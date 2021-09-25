import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import store from '../../store/store'
import { IUser } from '../../types/types'

interface IUserFromEmailPassword {
    nameFromForm: string
    photoURLFromForm?: string
    lastActivity?: number | null
}

export const createUser = (
    userFromEmailPassword: IUserFromEmailPassword = {
        nameFromForm: '',
        photoURLFromForm: '',
        lastActivity: null,
    }
): void => {
    const { nameFromForm, photoURLFromForm } = userFromEmailPassword
    const user = store.getCurrentUser()
    const db = store.getDB
    if (user && db) {
        const data = {
            name: nameFromForm ? nameFromForm : user.displayName,
            photoUrl: photoURLFromForm ? photoURLFromForm : user.photoURL,
            id: user.uid,
            lastActivity: Date.now(),
        }
        const usersDBRef = collection(db, 'users')
        const meUsers = query(usersDBRef, where('id', '==', user?.uid))
        getDocs(meUsers).then((res) => {
            if (res.empty) {
                addDoc(collection(db, 'users'), data)
            }
            store.setUsersInfo(data as IUser)
        })
    }
}
