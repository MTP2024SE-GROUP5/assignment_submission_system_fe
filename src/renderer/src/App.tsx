import React from "react"
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

const App = () => {

  console.log('Current Env:', import.meta.env);

  if (import.meta.env.DEV) {
    const mockUser = {
      id: 22,
      username: 'electron_tester',
      role: 'student',
      token: 'mock_bearer_token_12345'
    };

    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockUser.token);
      console.log('Mock user injected: ', mockUser.username);
    }
  }

  return(
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />

          <Route path="" element={<MainLayout/>}>
            <Route index element={<Home/>} />
          </Route>
        </Routes>
      </HashRouter>
  )
}

export default App