import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../Config"; // your firebase config
import { getFirestore, collection, query, where, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { getPopularMovies } from "../services/api"; // your TMDb API functions
import { onAuthStateChanged } from "firebase/auth";


const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

const db = getFirestore();

export const MovieProvider = ({ children }) => {

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setFavorites([]);
                setLoading(false);
                return;
            }

            try {
                const favsRef = collection(db, "favorites");
                const q = query(favsRef, where("userId", "==", user.uid));
                const snapshot = await getDocs(q);

                const movieIds = snapshot.docs.map((doc) => ({
                    movieId: doc.data().movieId,
                    docId: doc.id,
                }));

                const movieDetails = await Promise.all(
                    movieIds.map(async ({ movieId, docId }) => {
                        const res = await fetch(
                            `https://api.themoviedb.org/3/movie/${movieId}?api_key=47a902e75b21466b9486e2e26bf1c5c5`
                        );
                        const data = await res.json();
                        return { ...data, _docId: docId };
                    })
                );

                setFavorites(movieDetails);
            } catch (err) {
                console.error("Error loading favorites:", err);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe(); // clean up the listener
    }, []);


    // const currentUser = auth.currentUser;

    // 🧠 Fetch favorites from Firestore on mount
    // useEffect(() => {
    //     // if (!currentUser) return;

    //     const fetchFavorites = async () => {
    //     try {
    //         const favsRef = collection(db, "favorites");
    //         const q = query(favsRef, where("userId", "==", currentUser.uid));
    //         const snapshot = await getDocs(q);
    //         const movieIds = snapshot.docs.map((doc) => ({
    //         movieId: doc.data().movieId,
    //         docId: doc.id, // useful for delete
    //         }));

    //         // Fetch full movie data from TMDb using movieIds
    //         const movieDetails = await Promise.all(
    //         movieIds.map(async ({ movieId, docId }) => {
    //             const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=47a902e75b21466b9486e2e26bf1c5c5`);
    //             const data = await res.json();
    //             return { ...data, _docId: docId };
    //         })
    //         );

    //         setFavorites(movieDetails);
    //         setLoading(false);
    //     } catch (err) {
    //         console.error("Error loading favorites:", err);
    //     }
    //     };

    //     fetchFavorites();
    // }, [currentUser]);

    // ✅ Add to Firestore
    // ✅ Declare these BEFORE the return statement
    const addToFavorites = async (movie) => {
        const user = auth.currentUser;
        if (!user) return;

        const exists = favorites.some((m) => m.id === movie.id);
        if (exists) return;

        try {
        const docRef = await addDoc(collection(db, "favorites"), {
            userId: user.uid,
            movieId: movie.id,
        });

        setFavorites((prev) => [...prev, { ...movie, _docId: docRef.id }]);
        } catch (err) {
        console.error("Error adding favorite:", err);
        }
    };
    // const addToFavorites = async (movie) => {
    //     if (!currentUser) return;

    //     const exists = favorites.some((m) => m.id === movie.id);
    //     if (exists) return;

    //     try {
    //     const docRef = await addDoc(collection(db, "favorites"), {
    //         userId: currentUser.uid,
    //         movieId: movie.id,
    //     });

    //     setFavorites((prev) => [...prev, { ...movie, _docId: docRef.id }]);
    //     } catch (err) {
    //     console.error("Error adding favorite:", err);
    //     }
    // };


    // ✅ Remove from Firestore
    const removeFromFavorites = async (movieId) => {
        const fav = favorites.find((m) => m.id === movieId);
        if (!fav || !fav._docId) return;

        try {
            await deleteDoc(doc(db, "favorites", fav._docId));
            setFavorites((prev) => prev.filter((m) => m.id !== movieId));
        } catch (err) {
            console.error("Error removing favorite:", err);
        }
    };

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        loading,
    };

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};