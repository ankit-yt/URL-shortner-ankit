import { useContext } from "react"
import { AuthContext } from "./authInstance"
export const useAuthContext = ()=>useContext(AuthContext)