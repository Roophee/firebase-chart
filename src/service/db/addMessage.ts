import { collection, addDoc } from 'firebase/firestore'
import store from '../../store/store'
import { IMessage } from '../../types/types'

export const addMessage = (message: IMessage): void => {
    const db = store.getDB
    const path = store.getDialogPath
    if (db) {
        addDoc(collection(db, path), message)
    }
}
