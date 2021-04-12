import React from 'react'
import Loading from '../components/Loading';
import Movie from '../components/Movie';
import { useGlobalContext } from '../context'


const Home = () => {
    const {loading,movieList} = useGlobalContext();
    
    

    if(loading){
        return <Loading/>
    }
    if(movieList.length === 0){
        return <h2>Please check the input form , the movie you typed cannot be found in our database</h2>
    }
    return (
        movieList.map((movie)=>{
            return <div className='col-md-3'>
                        <Movie key={movie.id} {...movie}/>
                    </div>
        })
        
    )
}

export default Home
