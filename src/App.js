import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

const HomePage = lazy(() => import("./Pages/HomePage"));
const Login = lazy(() => import("./Pages/Login"));
const Compiler = lazy(() => import("./Pages/Compiler"));
const Profile = lazy(() => import("./Pages/Profile"));
const AprovePage = lazy(() => import("./Pages/Admin/ApprovePage"));
const ComilerForID = lazy(() => import("./Pages/ComilerForID"));

function App() {
  return (
    <div className="App">
     <div>
        <Router>
        <NavBar/>
            <Suspense Suspence={<h1>Loading...</h1>}>
              <Routes>
                      <Route path="/" element={<HomePage />} exact/>
                      <Route path="/login" element={<Login />} />
                      <Route path="/compiler" element={<Compiler />} />
                      <Route path="/:id" element={<ComilerForID />} />
                      <Route path="/admin/appr" element={<AprovePage />} />
                      <Route path="/profile" element={<Profile />} />
              </Routes>
            </Suspense> 
        </Router>
        <Footer/>
    </div>
    </div>
  );
}

export default App;
