import React,{useCallback} from 'react';
import { useGlobalContext } from '../context';

const url ='https://api.themoviedb.org/3/search/movie?api_key=35703dca2837ef4cd5b1fd4ca47151ce&query=';
const url2 = 'https://api.themoviedb.org/3/movie/popular?api_key=35703dca2837ef4cd5b1fd4ca47151ce';

const SearchForm = () => {
    const {setMovieList,setLoading,setSearchMovie} = useGlobalContext();
    const searchValue = React.useRef('');

    const fetchData = useCallback(async(val)=>{
    setLoading(true);
    try{
      
      const response = await fetch( val?`${url}${val}`:`${url2}`);
      // console.log(searchMovie);
      const data = await response.json();
      // console.log(data);
      const {results} = data;
      if(results){
        const movies = results.map((result)=>{
          const {backdrop_path,id,original_title,vote_average} = result;
          return {image:backdrop_path,id:id,title:original_title,rating:vote_average}
        })
        setMovieList(movies);
        // console.log(movies)
      }
      else{
        setMovieList([]);
      }
      setLoading(false);
    }
    catch(error){
      // console.log('error here');
      setLoading(false);
    }

    },[setMovieList,setLoading])


    const handleSubmit = (e) =>{
        e.preventDefault();
        fetchData()
    }

    const handleChange =(e)=>{
        setSearchMovie(searchValue.current.value);
        const val= searchValue.current.value;
        fetchData(val);
    }
    
    return (
      <div className='searchForm'>
         <form onSubmit={(e)=>handleSubmit(e)}>
            <input type='text' ref={searchValue} onChange={handleChange} placeholder='Search Movie...'/>
        </form>
        <div>
          
        </div>
     </div>
    )
}

export default SearchForm
