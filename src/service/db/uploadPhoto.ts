import { ref, uploadBytes, UploadResult } from 'firebase/storage'
import store from '../../store/store'

export const uploadPhoto = (file: File): Promise<UploadResult> | undefined => {
    const storage = store.getMyStorage
    if (storage) {
        const storageRef = ref(storage, `users_photo/${file.name}`)
        return uploadBytes(storageRef, file)
    }
    return undefined
}
