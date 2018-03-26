const loginHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accepts': 'application/json',
    token: localStorage.getItem('token')
  }
}

const api = {

  login: (email, password) => {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: loginHeaders(),
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(r => r.json())
  },

  createUser: (user) => {
    return fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user})
    }).then(res => res.json())
  },

  findUser: (token) => {
    return fetch('http://localhost:3000/current_user', {
      method: "POST",
      headers: { "Authorization": token }
    }).then(res => res.json())
  },

  getCurrentUser: (id) => {
    return fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  },

  getAllUsers: () => {
    return fetch('http://localhost:3000/users', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  },

  getAllEvents: () => {
    return fetch('http://localhost:3000/events', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  },

  getEvent: (id) => {
    return fetch(`http://localhost:3000/events/${id}`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  },

  postNewEvent: (event) => {
    return fetch('http://localhost:3000/events', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({event})
    }).then(res => res.json())
  },

  patchEvent: (event) => {
    return fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
  },

  getAllInvitations: () => {
    return fetch('http://localhost:3000/invitations', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  },

  postNewInvitation: (invitation) => {
    return fetch('http://localhost:3000/invitations', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({invitation})
    }).then(res => res.json())
  },

  patchInvitation: (invitation) => {
    return fetch(`http://localhost:3000/invitations/${invitation.id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invitation)
    })
  },

  postNewPost: (post) => {
    return fetch('http://localhost:3000/posts', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({post})
    }).then(res => res.json())
  },

  getAllPosts: () => {
    return fetch('http://localhost:3000/posts', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  }

}

export default api