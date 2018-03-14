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

  postUser: (user) => {
    console.log(user)
    return fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user})
    }).then(res => res.json())
  },

}

export default api