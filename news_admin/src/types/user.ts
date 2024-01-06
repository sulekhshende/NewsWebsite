

export type UserType = {
    userInfo:{
        username?: string;
        email?: string;
        password?: string;
    },
    CurrentUser: CurrentUser[];
}

export type CurrentUser = {
    currentUser?: null,
    isFetching?: boolean,
    error?: boolean
}