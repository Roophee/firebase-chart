export interface IUser {
    name: string
    photoUrl: string | null
    id: string
    lastActivity: number | null
}

export interface IMessage {
    author: string
    message: string
    time: number
}
