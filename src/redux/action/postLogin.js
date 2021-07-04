export const postLogin = (username, password) => ({
    type: 'POST_LOGIN',
    payload: fetch('/api/auth/signin',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            }) // body data type must match "Content-Type" header
        })
        .then(response => response.json()),
});