export default interface Model {
    age: number | null
    budget_per_day: number
    createdAt: string
    email: string
    gender: string
    height: number
    hobbies: any[]
    headshot: string
    media: Media[]
    mobile: string
    name: string
    nationality: string | null
    password: string
    profile_image: string | null
    skin: string | null
    updatedAt: string
    weight: number
    _id: string
}

export interface Media {
    path: string
    media_type: string
    _id?: string
}