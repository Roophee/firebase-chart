import { collection, getDocs, query, where } from 'firebase/firestore'
import store from '../../store/store'
import { createDialog } from './createDialog'

export const getDialogPath = (): void => {
    const user = store.getCurrentUser()
    const currentUserID = user?.uid
    const opponent = store.getCurrentOpponent
    const opponentId = store.getCurrentOpponent?.id

    const db = store.getDB
    if (user && db && opponent) {
        const usersDBRef = collection(db, 'dialogs')
        const dialogDoc = query(
            usersDBRef,
            where('members', 'array-contains', currentUserID)
        )
        getDocs(dialogDoc).then((res) => {
            const filteredDialogs = res.docs.filter((item) =>
                item.data().members.includes(opponentId)
            )
            if (filteredDialogs.length < 1) {
                createDialog(db, currentUserID, opponent?.id)
            }
            if (filteredDialogs.length > 0)
                store.setDialogPath(filteredDialogs[0].id)
        })
    }
}
