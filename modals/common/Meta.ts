interface Meta {
    loading: boolean,
    error: string | null
}

export interface MeMeta extends Meta {
    isLoggedIn: boolean
}
export default Meta