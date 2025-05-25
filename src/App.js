import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Recipes from './components/Recipes';
import Home from './components/Home';
import useAuth from './useAuth';
import Profile from './components/Profile';
import RecipesDetails from './components/RecipesDetails';
import WeeklyPlanner from './components/WeeklyPlanner';

function App() {
  const auth = useAuth();

  const PrivateRoute = ({ children }) => {
    if (auth.loading) return <div>Loading...</div>;
    return auth.authenticated ? children : <Login />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home auth={auth} />} />
        <Route path="/login" element={<Login auth={auth}/>} />
        <Route path="/profile" element={<Profile auth={auth} />} />
        <Route path="/recipes/:id" element={<RecipesDetails auth={auth} />} />
        <Route path="/weekly-planner" element={<WeeklyPlanner auth={auth} />} />
        <Route path="/recipes" element={
            <PrivateRoute>
              <Recipes auth={auth} />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
