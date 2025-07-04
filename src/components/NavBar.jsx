import { Link, useNavigate} from "react-router-dom"; // to link to pages in react
import "../css/Navbar.css"
import { logout } from "../Config";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logo from '../assets/MovieApp.png';

function NavBar(){

    const [userEmail, setUserEmail] = useState("");
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

    
    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/home" >
                    <img src={logo} alt="Movie App Logo" style={{ height: '40px' }} />
                </Link>
            </div>
            <div className="navbar-links">
                
                <Link to="/home" className="nav-link">Home</Link> 
                <Link to="/favorites" className="nav-link">Favorites</Link>

                 {/* show email only when signed in */}
                {userEmail && (
                <span className="nav-link-user-email">
                    <strong>{userEmail}</strong>
                </span>
                )}
                <button onClick={handleLogout} className="nav-link logout-button">
                    Logout
                </button>
            </div>

        </nav>
    );

}

export default NavBar