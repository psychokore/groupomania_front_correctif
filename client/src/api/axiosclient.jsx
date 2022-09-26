import axios from "axios";
import {store} from '../store'
import jwt_decode from 'jwt-decode'
import { getRefreshToken } from "./auth";
import { refreshData } from "../slices/userSlice";



 export const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`
})

let isRefreshing = false;



const checkTokenBeforRefresh = async () => {
    const state = store.getState();
        const authToken = state.user.token;
        if (authToken) {
            const decodedToken = jwt_decode(authToken)
            const dateExpiration = new Date(decodedToken.exp * 1000);
            const currentDate = new Date
            const expirationCountDown = (dateExpiration.getTime() - currentDate.getTime())/1000
            
            if (expirationCountDown < (60*59) && !isRefreshing) {
                isRefreshing = true
                const refresh = await getRefreshToken()
                isRefreshing = false
                store.dispatch(
                    refreshData({
                        token: refresh.token,
                        isAdmin: refresh.isAdmin
                    })
                )
            }

        }
}

setInterval(checkTokenBeforRefresh, (60*1000*15))
