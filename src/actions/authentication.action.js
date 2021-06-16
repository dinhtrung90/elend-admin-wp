import { APP_TOKEN, APP_REFRESH_TOKEN } from "src/constants/constants";

export const clearAuthToken = () => {
    localStorage.removeItem(APP_TOKEN);
    localStorage.removeItem(APP_REFRESH_TOKEN);
};

export const authenticationActions = {
    clearAuthToken
};