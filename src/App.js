import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

//f8dbda76

const api_url = 'http://www.omdbapi.com?apikey=f8dbda76';

// const movie1 = {
//     "Title": "Game of Thrones",
//     "Year": "2011–2019",
//     "imdbID": "tt0944947",
//     "Type": "series",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg"
//   }

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${api_url}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Top')
    }, [])
    return (
        <div className='App'>
            <h1>Movieland</h1>
            <div className='search'>
                <input placeholder='Search for movies'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}/>
                <img 
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
                </div>

                {
                    movies?.length > 0 ? (
                        <div className='container'>
                            {movies.map((movie) => 
                                <MovieCard movie={movie} />)}
                        </div>
                    ) :
                    (
                        <div className='empty'>
                            <h2>No movies found</h2> 
                        </div>
                    )
                }
            </div>
        
    );
}

export default App