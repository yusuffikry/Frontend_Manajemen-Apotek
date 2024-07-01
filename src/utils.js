import axios from 'axios';

export const loadToken = async () => {
    await axios.post('http://localhost:8000/auth/token', {
        username: 'admin',
        password: 'admin'
    },{headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }

    }).then((response) => {
        localStorage.setItem('token', response.data.access_token);
    })
}