const loginHeaders = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  token: localStorage.getItem('token')
});

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: localStorage.getItem('token')
});

const apiRoot = process.env.NODE_ENV === 'production'
  ? 'https://gentle-hamlet-89215.herokuapp.com/api/v1'
  : 'http://localhost:3000/api/v1';

const api = {

  login: (email, password) => fetch(`${apiRoot}/login`, {
    method: 'POST',
    headers: loginHeaders(),
    body: JSON.stringify({
      email,
      password
    })
  }).then(res => res.json()),

  createUser: user => fetch(`${apiRoot}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
  }).then((res) => {
    res.json().then(json => ({
      status: res.status,
      json
    }))
      .then(({ status, json }) => {
        if (status !== 200) {
          return { res: { error: true } };
        }
        return json;
      });
  }),

  findUser: token => fetch(`${apiRoot}/current_user`, {
    method: 'POST',
    headers: { Authorization: token }
  }).then(res => res.json()),

  getCurrentUser: id => fetch(`${apiRoot}/users/${id}`, {
    method: 'GET',
    headers: authHeaders()
  }).then(res => res.json()),

  getAllUsers: () => fetch(`${apiRoot}/users`, {
    method: 'GET',
    headers: authHeaders(),
  }).then(res => res.json()),

  getAllEvents: () => fetch(`${apiRoot}/events`, {
    method: 'GET',
    headers: authHeaders(),
  }).then(res => res.json()),

  getEvent: id => fetch(`${apiRoot}/events/${id}`, {
    method: 'GET',
    headers: authHeaders()
  }).then(res => res.json()),

  postNewEvent: event => fetch(`${apiRoot}/events`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ event })
  }).then(res => res.json()),

  patchEvent: event => fetch(`${apiRoot}/events/${event.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(event)
  }).then(res => res.json()),

  getAllInvitations: () => fetch(`${apiRoot}/invitations`, {
    method: 'GET',
    headers: authHeaders(),
  }).then(res => res.json()),

  postNewInvitation: invitation => fetch(`${apiRoot}/invitations`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ invitation })
  }).then(res => res.json()),

  patchInvitation: invitation => fetch(`${apiRoot}/invitations/${invitation.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(invitation)
  }).then(res => res.json()),

  postNewPost: post => fetch(`${apiRoot}/posts`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ post })
  }).then(res => res.json()),

  getAllPosts: () => fetch(`${apiRoot}/posts`, {
    method: 'GET',
    headers: authHeaders()
  }).then(res => res.json()),

  getAllBeers: () => fetch(`${apiRoot}/beers`)
    .then(res => res.json()),

  getBeer: id => fetch(`${apiRoot}/beers/${id}`)
    .then(res => res.json()),

  postNewBeer: beer => fetch(`${apiRoot}/beers`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(beer)
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Something went wrong');
  })
    .catch(error => console.log(error)),

  patchBeer: beer => fetch(`${apiRoot}/beers/${beer.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(beer)
  }).then(res => res.json()),

  getAllBreweries: () => fetch(`${apiRoot}/breweries`)
    .then(res => res.json()),

  postNewBrewery: brewery => fetch(`${apiRoot}/breweries`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(brewery)
  }).then(res => res.json()),

  patchBrewery: brewery => fetch(`${apiRoot}/breweries/${brewery.id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(brewery)
  }).then(res => res.json()),

  getAllReviews: () => fetch(`${apiRoot}/reviews`)
    .then(res => res.json()),

  postNewReview: review => fetch(`${apiRoot}/reviews`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(review)
  }).then(res => res.json())

};

export default api;
