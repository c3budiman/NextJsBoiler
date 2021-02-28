export const getDog = () => ({
    type: 'GET_DOG',
    payload: fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json()),
});