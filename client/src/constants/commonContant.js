export const API_URL = 
process.env.NODE_ENV === 'production' 
? 'http://localhost:5000/api' 
: 'https://glacial-chamber-01131.herokuapp.com/api'