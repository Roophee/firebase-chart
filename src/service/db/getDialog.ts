import { collection, query, onSnapshot } from 'firebase/firestore'
import { Firestore, Unsubscribe } from '@firebase/firestore'
import { IMessage } from '../../types/types'
import store from '../../store/store'

export const getDialog = (db: Firestore, dialogPath: string): void => {
    const q = query(collection(db, dialogPath))
    const unsubscribe: Unsubscribe = onSnapshot(q, (querySnapshot) => {
        const arr: IMessage[] = []
        querySnapshot.forEach((doc) => {
            arr.push(doc.data() as IMessage)
            arr.sort((a, b) => {
                return a.time - b.time
            })
            store.setDialog(arr)
        })
    })
    store.setUnsubscribeDialog(unsubscribe)
}
