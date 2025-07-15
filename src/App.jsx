import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import AuthLayout from "./pages/AuthLayout"
import SignUpLayout from "./pages/SignUpLayout"
import { Route,Routes,useLocation } from "react-router-dom" // used for routing in react 
import { MovieProvider } from "./contexts/MovieContext"
import MovieDetails from "./components/MovieDetails"
// import "./css/App.css"; 

function App() {

  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/signup";

  return (
  
    <MovieProvider>
      {!isAuthPage && <NavBar />}
      <main className="flex-1 w-full flex flex-col" >
        <Routes>
          <Route path="/signup" element={<SignUpLayout />}/>
          <Route path="/" element={<AuthLayout />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/favorites" element={<Favorites />}/>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
        {!isAuthPage && <Footer />}


      </main>
    </MovieProvider>
  )
}

export default App
