function Footer() {
    return (
        <footer className="bg-black text-white py-10 px-4 sm:px-10 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm md:text-base">
                {/* Left: Brand Info */}
                <div>
                    <h3 className="text-red-600 text-xl font-bold mb-2">MovieApp</h3>
                    <p className="text-gray-400">
                        Discover, like, and save your favorite movies. Powered by Khanjari Consulting .
                    </p>
                </div>

                {/* Center: Quick Links */}
                <div>
                    <h4 className="text-red-600 font-semibold mb-2">Navigation</h4>
                    <ul className="space-y-1">
                        <li>
                            <a href="/home" className="hover:text-red-500 transition">Home</a>
                        </li>
                        <li>
                            <a href="/favorites" className="hover:text-red-500 transition">Favorites</a>
                        </li>
                        <li>
                            <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
                                TMDb API
                            </a>
                        </li>
                    </ul>
                </div>
                        
                {/* Right: Contact or Social */}
                <div>
                    <h4 className="text-red-600 font-semibold mb-2">Contact</h4>
                    <p className="text-gray-400">Developed by Ayoub Khanjari</p>
                    <p className="text-gray-400">📧 ayoubkhanjari.dev@gmail.com</p>
                </div>
            </div>

            {/* Bottom: Copyright */}
            <div className="text-center text-gray-500 text-xs mt-8">
                © {new Date().getFullYear()} MovieApp. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
