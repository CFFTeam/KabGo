export const authStorage = {
    authenticate(userInfo: any) {
        localStorage.setItem('auth', JSON.stringify(userInfo))
    },

    getAuthData() {
        const authData = localStorage.getItem('auth');
        if (!authData) {
            console.log('Auth data is empty');
            return;
        }
        return JSON.parse(authData);
    },

    logout() {
        if (localStorage.getItem('auth'))
            localStorage.removeItem('auth');
    },
    
    isAuthenticated() {
        const authData = localStorage.getItem('auth');
        return authData && JSON.parse(authData);
    }
}