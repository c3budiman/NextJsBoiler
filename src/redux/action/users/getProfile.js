export const getProfile = () => ({
    type: 'GET_PROFILE',
    payload: fetch('/api/users/profile',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()),
});