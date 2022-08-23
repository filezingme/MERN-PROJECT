import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from './components/layout/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'


function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>

          <Route path="/" element={<Landing />} /> {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
          
          <Route 
            path="/login" 
            element={<Auth authRoute='login'  />}
            exact />
          
          <Route 
            path="/register" 
            element={<Auth authRoute='register'  />}
            exact />

        </Routes>
      </Router>
    </AuthContextProvider>    
  );
}

export default App;
