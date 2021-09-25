import { Auth } from '@firebase/auth'
import { makeAutoObservable } from 'mobx'
import { Firestore, Unsubscribe } from '@firebase/firestore'
import { FirebaseStorage } from 'firebase/storage'
import { UserImpl } from '@firebase/auth/internal'
import { getChatPath } from '../service/db/getChatPath'
import { IMessage, IUser } from '../types/types'

class Store {
    auth: Auth | undefined = undefined

    loginOrRegistration = false

    db: Firestore | undefined = undefined

    usersInfo: IUser = {
        name: '',
        photoUrl: '',
        id: '',
        lastActivity: null,
    }

    user: UserImpl | null = null

    currentOpponent: IUser | null = null

    dialogPath = ''

    unsubscribeDialog: Unsubscribe | null = null

    dialog: IMessage[] = []

    loading = false

    storage: FirebaseStorage | null = null

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    userLogOut() {
        this.currentOpponent = null
        this.dialog = []
        this.dialogPath = ''
        this.usersInfo = {
            name: '',
            photoUrl: '',
            id: '',
            lastActivity: null,
        }
        this.loginOrRegistration = false
    }

    setCurrentOpponent(opponentInfo: IUser) {
        this.currentOpponent = opponentInfo
    }

    get getCurrentOpponent() {
        return this.currentOpponent
    }

    setStorage(store: FirebaseStorage) {
        this.storage = store
    }

    get getMyStorage() {
        return this.storage
    }

    setLoading(loadingFromAuth: boolean) {
        this.loading = loadingFromAuth
    }

    get getLoading() {
        return this.loading
    }

    setDialog(getDialog: IMessage[]) {
        this.dialog = getDialog
    }

    get getDialog() {
        return this.dialog
    }

    setUnsubscribeDialog(unS: Unsubscribe) {
        this.unsubscribeDialog = unS
    }

    get getUnsubscribeDialog() {
        return this.unsubscribeDialog
    }

    setUsersInfo(userInfo: IUser) {
        this.usersInfo = userInfo
    }

    get getUsersInfo() {
        return this.usersInfo
    }

    setDialogPath(path: string) {
        this.dialogPath = getChatPath(path)
    }

    get getDialogPath() {
        return this.dialogPath
    }

    setLoginOrRegistration() {
        this.loginOrRegistration = !this.loginOrRegistration
    }

    setDB(db: Firestore) {
        this.db = db
    }

    get getDB() {
        return this.db
    }

    setCurrentUser(user: UserImpl) {
        this.user = user
    }

    getCurrentUser() {
        return this.user
    }

    getCurrentAuth() {
        return this.auth
    }

    setCurrentAuth(auth: Auth | undefined) {
        this.auth = auth
    }
}

export default new Store()
