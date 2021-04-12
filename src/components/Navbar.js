import React ,{useCallback} from 'react';
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context';
import SearchForm from './SearchForm';

import './Navbar.css';

const url ='https://api.themoviedb.org/3/movie/';
const key = '35703dca2837ef4cd5b1fd4ca47151ce';

const Navbar = () => {

    const {setMovieList,setLoading,setMovieCategory,movieCategory} = useGlobalContext();

    const fetchData = useCallback(async(func)=>{
        setLoading(true);
    try{
      const response = await fetch(`${url}${func}${'?api_key='}${key}`);
      const data = await response.json();
      const {results} = data;
      if(results){
        const movies = results.map((result)=>{
          const {backdrop_path,id,original_title,vote_average} = result;
          return {image:backdrop_path,id:id,title:original_title,rating:vote_average}
        })
        setMovieList(movies);
        console.log(movies)
      }
      else{
        setMovieList([]);
      }
      setLoading(false);
    }
    catch(error){
      console.log('error here');
      setLoading(false);
    }

    },[setMovieList,setLoading])

    const searchTopRated =()=>{
        fetchData('top_rated');
        setMovieCategory('Top Rated Movies');
    }
    const searchUpcoming =()=>{
        fetchData('upcoming');
        setMovieCategory('UpComing Movies');
    }
    const getPopular =()=>{
        fetchData('popular');
        setMovieCategory('Popular Movies');
    }
    

    return (
      <>
        <nav>
             <Link to='/'>Home</Link> 
            <SearchForm/>
            <div className='searchFilter'>
              <button onClick={searchTopRated}>Top Rated</button>
              <button onClick={searchUpcoming}>upcoimng</button>
              <button onClick={getPopular}>popular</button>
            </div>      
        </nav>
        <div className='container'>
          <h3>{movieCategory}</h3>
        </div>
      </>
    )
}

export default Navbar;
