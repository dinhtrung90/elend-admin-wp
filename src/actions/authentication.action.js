import { APP_TOKEN } from "src/constants/constants";

export const clearAuthToken = () => {
    if (localStorage.getItem(APP_TOKEN)) {
        localStorage.removeItem(APP_TOKEN);
    }
};

export const authenticationActions = {
    clearAuthToken
};