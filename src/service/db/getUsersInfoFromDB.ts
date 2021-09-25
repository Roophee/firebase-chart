import { collection, getDocs, query, where } from 'firebase/firestore'
import store from '../../store/store'
import { IUser } from '../../types/types'

export const getUsersInfoFromDB = async (): Promise<IUser> => {
    const user = store.getCurrentUser()
    const db = store.getDB
    if (user && db) {
        const usersDBRef = collection(db, 'users')
        const userINFOQuery = query(usersDBRef, where('id', '==', user.uid))
        const result = await getDocs(userINFOQuery)
        if (result.empty) {
            return {
                name: '',
                photoUrl: '',
                id: '',
                lastActivity: null,
            }
        }
        return result.docs[0].data() as IUser
    }
    return {
        name: 'Harry Potter',
        photoUrl: '-1',
        id: '-1',
        lastActivity: -1,
    }
}
