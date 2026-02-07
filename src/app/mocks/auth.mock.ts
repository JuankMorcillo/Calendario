export const MOCK_LOGIN_RESPONSE = [{
    user: {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@email.com',
        role: 'user',
        city: 'Madrid'
    },
    token: 'mocked-jwt-token'
},
{
    user: {
        id: 2,
        name: 'Juan Doe',
        email: 'juandoe@sdi.es',
        role: 'admin',
        city: 'Madrid'
    },
    token: 'mocked-jwt-token'
},
{
    user: {
        id: 2,
        name: 'Pepe Doe',
        email: 'pepedoe@sdi.es',
        role: 'admin',
        city: 'Cali'
    },
    token: 'mocked-jwt-token'
}
]

export const MOCK_USERS = [
    {
        email: 'johndoe@email.com',
        password: '12345'
    },
    {
        email: 'juandoe@sdi.es',
        password: '12345'
    },
    {
        email: 'pepedoe@sdi.es',
        password: '12345'
    }
]