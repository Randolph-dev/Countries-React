import { BrowserRouter, Route, Routes } from "react-router-dom";
import Countries from "./components/Countries";
import CountrySingle from "./components/CountrySingle";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Layout from "./pages/Layout";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth/firebase";
import ProtectedRoute from "./auth/ProtectedRoute";
import Favourites from "./components/Favourites";
import About from "./components/About"

const App = () => {

  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              
              <Route element={<ProtectedRoute user={user} />}>
                <Route path="/countries" element={<Countries />} />
                <Route path="/countries/:single" element={<CountrySingle />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/about" element={<About />} />
              </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;