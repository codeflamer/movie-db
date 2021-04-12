import React,{useState,useContext,useCallback,useEffect} from 'react'

const url ='https://api.themoviedb.org/3/movie/popular?api_key=';
const key = '35703dca2837ef4cd5b1fd4ca47151ce';
const AppContext = React.createContext();

const AppProvider = ({children}) => {

  const [loading,setLoading] = useState(true);
  const [movieList,setMovieList] = useState([]);
  const [searchMovie,setSearchMovie] = useState(''); 
  const [movieCategory,setMovieCategory] = useState('Popular Movies');

  const fetchData = useCallback(async()=>{
    setLoading(true);
   
    try{
      const response = await fetch(`${url}${key}`);
      const data = await response.json();
      const {results} = data;
      if(results){
        const movies = results.map((result)=>{
          const {backdrop_path,id,original_title,vote_average} = result;
          return {image:backdrop_path,id:id,title:original_title,rating:vote_average}
        })
        setMovieList(movies);
        // setMovieCategory();
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
    
  },[])


  useEffect(()=>{
    fetchData();
  },[fetchData])

  return <AppContext.Provider value={
    {
      loading,
      movieList,
      setSearchMovie,
      searchMovie,
      setLoading,
      setMovieList,
      setMovieCategory,
      movieCategory
    }
  }>
            {children}
          </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export {AppContext,AppProvider}
