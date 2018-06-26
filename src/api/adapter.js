const loginHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    token: localStorage.getItem('token')
  };
};

const authHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: localStorage.getItem('token')
  };
};

const apiRoot = process.env.NODE_ENV === 'production' ? 'https://gentle-hamlet-89215.herokuapp.com/api/v1' : 'http://192.168.1.94:3000/api/v1';

const api = {

  login: (email, password) => {
    return fetch(`${apiRoot}/login`, {
      method: 'POST',
      headers: loginHeaders(),
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => res.json());
  },

  createUser: (user) => {
    return fetch(`${apiRoot}/users`, {
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
    });
  },

  findUser: (token) => {
    return fetch(`${apiRoot}/current_user`, {
      method: 'POST',
      headers: { Authorization: token }
    }).then(res => res.json());
  },

  getCurrentUser: (id) => {
    return fetch(`${apiRoot}/users/${id}`, {
      method: 'GET',
      headers: authHeaders()
    }).then(res => res.json());
  },

  getAllUsers: () => {
    return fetch(`${apiRoot}/users`, {
      method: 'GET',
      headers: authHeaders(),
    }).then(res => res.json());
  },

  getAllEvents: () => {
    return fetch(`${apiRoot}/events`, {
      method: 'GET',
      headers: authHeaders(),
    }).then(res => res.json());
  },

  getEvent: (id) => {
    return fetch(`${apiRoot}/events/${id}`, {
      method: 'GET',
      headers: authHeaders()
    }).then(res => res.json());
  },

  postNewEvent: (event) => {
    return fetch(`${apiRoot}/events`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ event })
    }).then(res => res.json());
  },

  patchEvent: (event) => {
    return fetch(`${apiRoot}/events/${event.id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(event)
    }).then(res => res.json());
  },

  getAllInvitations: () => {
    return fetch(`${apiRoot}/invitations`, {
      method: 'GET',
      headers: authHeaders(),
    }).then(res => res.json());
  },

  postNewInvitation: (invitation) => {
    return fetch(`${apiRoot}/invitations`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ invitation })
    }).then(res => res.json());
  },

  patchInvitation: (invitation) => {
    return fetch(`${apiRoot}/invitations/${invitation.id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(invitation)
    }).then(res => res.json());
  },

  postNewPost: (post) => {
    return fetch(`${apiRoot}/posts`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ post })
    }).then(res => res.json());
  },

  getAllPosts: () => {
    return fetch(`${apiRoot}/posts`, {
      method: 'GET',
      headers: authHeaders()
    }).then(res => res.json());
  },

  getAllBeers: () => {
    return fetch(`${apiRoot}/beers`)
      .then(res => res.json());
  },

  postNewBeer: (beer) => {
    return fetch(`${apiRoot}/beers`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(beer)
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
    });
  },

  patchBeer: (beer) => {
    return fetch(`${apiRoot}/beers/${beer.id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(beer)
    }).then(res => res.json());
  },

  getAllBreweries: () => {
    return fetch(`${apiRoot}/breweries`)
      .then(res => res.json());
  },

  postNewBrewery: (brewery) => {
    return fetch(`${apiRoot}/breweries`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(brewery)
    }).then(res => res.json());
  },

  patchBrewery: (brewery) => {
    return fetch(`${apiRoot}/breweries/${brewery.id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(brewery)
    }).then(res => res.json());
  },

  getAllReviews: () => {
    return fetch(`${apiRoot}/reviews`)
      .then(res => res.json());
  },

  postNewReview: (review) => {
    return fetch(`${apiRoot}/reviews`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(review)
    }).then(res => res.json());
  }

};

export default api;
