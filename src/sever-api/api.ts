import axios from "axios";

export type UserType = {
    id: number
    favourite: boolean,
    name: string,
    age: number,
    phone: string,
    image: string,
    phrase: string,
    video?: string
    isFavorite?: boolean
    user: UserType
    isTouchedHandler?: () => void
    isTouched?: boolean
}

const axiosInstance = axios.create({
    baseURL: '/data.json'  //server URL
})
export const serviceApi = {
    async getData() {
        return axiosInstance.get<UserType[]>('').then(res => res.data);
    },
}