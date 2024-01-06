import axios from "axios";


const Base_Url = "https://bolt-news-app.herokuapp.com/api";
const user = JSON.parse(localStorage.getItem("persist:root"))?.currentUser;
const currentUser = user && JSON.stringify(user);

let TOKEN;
if(currentUser !== undefined){
    const Reporter = JSON.parse(currentUser);
    const userReporter = JSON.parse(Reporter)
    TOKEN = userReporter?.accessToken
}

//console.log("line no 10 requestmethods " + userReporter?.accessToken);
//console.log("line no 11 requestmethods isReporter : " + userReporter?.isReporter);

//console.log(currentUser?.accessToken);
//console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser?.accessToken);

export const publicRequest = axios.create({
    baseURL: Base_Url,
});

export const userRequest = axios.create({
    baseURL: Base_Url,
    headers: { token: `Bearer ${TOKEN}` }
})