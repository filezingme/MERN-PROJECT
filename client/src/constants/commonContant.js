export const API_URL = 
process.env.NODE_ENV === 'production' 
? 'http://localhost:5000/api' 
: 'https://damp-eyrie-82052.herokuapp.com/api'