import { collection, addDoc } from 'firebase/firestore'
import { Firestore } from '@firebase/firestore'
import store from '../../store/store'
import { addMessage } from './addMessage'
import { IMessage } from '../../types/types'

export const createDialog = (
    db: Firestore,
    currentUserID: string | undefined,
    opponentId: string | null
): Promise<void> => {
    return addDoc(collection(db, 'dialogs'), {
        members: [currentUserID, opponentId],
    }).then((res) => {
        store.setDialogPath(res.path.split('/')[1])
        const initMessage: IMessage = {
            author: 'root',
            message: `${
                store.getUsersInfo.name ? store.getUsersInfo.name : 'You'
            } started the dialog`,
            time: Date.now(),
        }
        addMessage(initMessage)
    })
}
