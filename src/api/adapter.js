const loginHeaders = () => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    token: localStorage.getItem('token')
  };
};

// production
const apiRoot = 'https://gentle-hamlet-89215.herokuapp.com/api/v1';

// dev
// const apiRoot = 'http://192.168.1.94:3000/api/v1';

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
    }).then(res => res.json());
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
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  },

  getAllUsers: () => {
    return fetch(`${apiRoot}/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  },

  getAllEvents: () => {
    return fetch(`${apiRoot}/events`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  },

  getEvent: (id) => {
    return fetch(`${apiRoot}/events/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  },

  postNewEvent: (event) => {
    return fetch(`${apiRoot}/events`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event })
    }).then(res => res.json());
  },

  patchEvent: (event) => {
    return fetch(`${apiRoot}/events/${event.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    }).then(res => res.json());
  },

  getAllInvitations: () => {
    return fetch(`${apiRoot}/invitations`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  },

  postNewInvitation: (invitation) => {
    return fetch(`${apiRoot}/invitations`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ invitation })
    }).then(res => res.json());
  },

  patchInvitation: (invitation) => {
    return fetch(`${apiRoot}/invitations/${invitation.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invitation)
    }).then(res => res.json());
  },

  postNewPost: (post) => {
    return fetch(`${apiRoot}/posts`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post })
    }).then(res => res.json());
  },

  getAllPosts: () => {
    return fetch(`${apiRoot}/posts`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  },

  getAllBeers: () => {
    return fetch(`${apiRoot}/beers`)
      .then(res => res.json());
  },

  postNewBeer: (beer) => {
    return fetch(`${apiRoot}/beers`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(beer)
    }).then(res => res.json());
  },

  patchBeer: (beer) => {
    return fetch(`${apiRoot}/beers/${beer.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
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
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(brewery)
    }).then(res => res.json());
  },

  patchBrewery: (brewery) => {
    return fetch(`${apiRoot}/breweries/${brewery.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
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
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    }).then(res => res.json());
  }

};

export default api;
