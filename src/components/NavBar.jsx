import { Link, useNavigate} from "react-router-dom"; // to link to pages in react
// import "../css/Navbar.css"
import { logout } from "../Config";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logo from '../assets/MovieApp.png';

function NavBar(){

    const [userEmail, setUserEmail] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

      // Subscribe once to auth state changes
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUserEmail(user ? user.email : "");
    });

    // Clean up listener on unmount
        return () => unsubscribe();
    }, []);

    // Log out then redirect to login page
    const handleLogout = async () => {
        await logout(); // 👈 Call logout from Firebase
        navigate("/");  // 👈 Redirect to login page
    };

    return (
        <nav className="bg-black text-white px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
              <img src={logo} alt="Movie App Logo" className="w-10 h-10 object-contain" />
            </div>
    
            {/* Mobile menu toggle */}
            <button
              className="text-white md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
    
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/home"
                className="text-red-600 hover:text-red-400 text-lg font-medium transition duration-200"
              >
                Home
              </Link>
              <Link
                to="/favorites"
                className="text-red-600 hover:text-red-400 text-lg font-medium transition duration-200"
              >
                Favorites
              </Link>
              <span className="font-medium text-lg whitespace-nowrap">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-400 px-4 py-2 rounded-md transition duration-200 text-lg font-medium cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
    
          {/* Mobile Menu */}
          {isOpen && (
            <div className="flex flex-col items-start gap-4 mt-4 md:hidden">
              <Link
                to="/home"
                className="text-red-600 hover:text-red-400 text-base font-medium transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/favorites"
                className="text-red-600 hover:text-red-400 text-base font-medium transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                Favorites
              </Link>
              <span className="font-medium text-base">{userEmail}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-white bg-red-600 hover:bg-red-400 px-3 py-2 rounded-md transition duration-200 text-base font-medium cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      );

    // return(
    //         <nav className="bg-black text-white px-6 py-4 flex items-center justify-between gap-80">
    //         {/* Left: Logo */}
    //         <div className="flex items-center gap-2">
    //         <img src="./image2vector.svg" alt="Movie App Logo" className="w-10 h-10 object-contain" />
    //         </div>
        
    //         {/* Right: Nav links + email + logout */}
    //         <div className="flex items-center gap-6">
    //         {/* Navigation Links - slightly larger and pushed right */}
    //         <a href="/home" className="text-red-600 hover:text-red-400 text-lg font-medium transition duration-200">
    //             Home
    //         </a>
    //         <a href="/favorites" className="text-red-600 hover:text-red-400 text-lg font-medium transition duration-200">
    //             Favorites
    //         </a>
        
    //         {/* Email */}
    //         <span className="font-medium text-lg whitespace-nowrap">{userEmail}</span>
        
    //         {/* Logout Button */}
    //         <button className="text-white bg-red-600 hover:bg-red-400 px-4 py-2 rounded-md transition duration-200 text-lg font-medium cursor-pointer" onClick={handleLogout}>
    //             Logout
    //         </button>
    //         </div>
    //     </nav>
    
    // );

}

export default NavBar