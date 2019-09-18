import axios from '../plugins/axios'
import { IUser } from '../defines'

export const queryUserById = (id: string) => axios.get<IUser>(`/user/${id}`)

