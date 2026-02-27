import React from "react"
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import {WorkspaceList} from "@/pages/WorkspaceList";
import {WorkspaceLayout} from "@/layouts/WorkspaceLayout";
import {WorkspaceOverview} from "@/pages/WorkspaceDetail/Overview";
import {TitleProvider} from "../context/TitleContext";

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
      <TitleProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login/>} />

            <Route path="/" element={<MainLayout/>}>
              <Route index element={<Home/>} />
              <Route path="/workspaces" element={<WorkspaceList />} />
              <Route path="/workspaces/:id" element={<WorkspaceLayout />}>
                <Route index element={<WorkspaceOverview />} />
                {/*<Route path="assignments" element={<AssignmentList />} />*/}
                {/*<Route path="members" element={<MemberList />} />*/}
                {/*<Route path="assignments/:assignmentId" element={<AssignmentDetail />} />*/}
              </Route>
            </Route>
          </Routes>
        </HashRouter>
      </TitleProvider>
  )
}

export default App