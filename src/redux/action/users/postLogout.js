export const getProfile = () => ({
    type: 'POST_LOGOUT',
    payload: fetch('/api/auth/signout',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()),
});