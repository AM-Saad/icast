import User from './model'
import Meta, { MeMeta } from '../common/Meta'

interface ModelContext {
    user: null | User,
    meta: MeMeta,
    update_meta: Meta,
    setUserHandler: (user: User) => void,
    get_me: () => void,
    upload_media: (url: string, type: string) => Promise<number>
    upload_headshot: (formData: any) => Promise<number>,
    login: () => void,
    logout: () => void
}

export default ModelContext