import { publicRequest } from './requestMethod';
import { loginFailure, loginStart, loginSuccess } from "./userRedux/usersSlice";





export const loginUser = async (dispatch:any, user:any) => {
    dispatch(loginStart());
    try {
        const res =  await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
}