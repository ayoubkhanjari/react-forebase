import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import AuthLayout from "./pages/AuthLayout"
import SignUpLayout from "./pages/SignUpLayout"
import { Route,Routes,useLocation } from "react-router-dom" // used for routing in react 
import { MovieProvider } from "./contexts/MovieContext"
import "./css/App.css"; 

function App() {

  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/signup";

  return (
    <div className={!isAuthPage ? "main-wrapper" : ""}>
    <MovieProvider>
      {/* Only apply App.css and NavBar if not on Auth page */}
      {!isAuthPage && <NavBar />}
      <main className={!isAuthPage ? "main-content" : ""}>
        <Routes>
          <Route path="/signup" element={<SignUpLayout />}/>
          <Route path="/" element={<AuthLayout />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/favorites" element={<Favorites />}/>
        </Routes>

      </main>
    </MovieProvider>
  </div>
  )
}

export default App
