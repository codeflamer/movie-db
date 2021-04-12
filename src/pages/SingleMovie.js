import React,{useState,useCallback,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Loading from '../components/Loading';
import './SingleMovie.css';

const url = 'https://api.themoviedb.org/3/movie/';
const key_det ='?api_key=35703dca2837ef4cd5b1fd4ca47151ce';

const SingleMovie = () => {
    const {id} = useParams();
    const [loading,setLoading]= useState(true);
    const [movieDetail,setMovieDetail] = useState();

    // const mystyle = {
    //   color: "white",
    //   backgroundColor: "DodgerBlue",
    //   padding: "10px",
    //   fontFamily: "Arial"
    // };


    const fetchData = useCallback(async()=>{
        setLoading(true);
        try{
            const response = await fetch(`${url}${id}${key_det}`);
            const data =  await response.json();
            // console.log(data);
            if(data){
                const {backdrop_path,genres,original_language,original_title,overview,
                      popularity,production_countries,release_date,spoken_languages,vote_average,runtime,status} = data;
                const details = {image:backdrop_path,genres:genres,lan:original_language,title:original_title
                                ,overview:overview,popularity:popularity,country:production_countries,
                                date:release_date,spoken:spoken_languages,rating:vote_average,time:runtime,status:status}
                setMovieDetail(details);
                // console.log(details);
            }
            else{
                setMovieDetail({})
            }
            setLoading(false);

        }
        catch(error){
            setMovieDetail([])
            setLoading(false);
        }
    },[id,setLoading,setMovieDetail])
    
    useEffect(()=>{
        fetchData()
    },[id,fetchData])

    if(loading){
    return <Loading/>
    }
    if(!movieDetail){
        return <> Your movie cannot be found</>
    }

    const {image,genres,lan,title,overview,popularity,country,date,spoken,rating,time,status} = movieDetail;
    return (
        <div className='over' style={{backgroundImage:`https://image.tmdb.org/t/p/w500/${image}`,
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'cover'}}>
        <div className='film-details-container container'>
            <div className='row'>
                <div className='image-sec col-md-3'>
                    <img src={`https://image.tmdb.org/t/p/w500/${image}`}  alt={title}/><br/>
                </div>
                <div className='movie-det col-md-9'>
                    <h4>{title}</h4>
                    {genres.map((genre,index)=>{
                        return <span key={index}>{genre.name} </span> ;
                    })}<br/><br/>
                    <h5>Plot</h5>
                    {overview}<br/><br/>
                    <span>Language</span>: {lan} <br/>
                    <span>Popularity</span>:{popularity}<br/>
                    { {country}.length > 1 ? 'countries' : 'country' }: {country.map((coun,index)=>{
                                                                        return <span key={index}>{coun.name} </span>
                                                                        })}<br/>
                    <span>Date</span>:{date}<br/>
                    <span>Spoken Language(s)</span>: {spoken.map((sp,index)=>{
                                            return <span key={index}>{sp.name} </span>
                                        })}<br/>
                    <span>Rating</span>:{rating}<br/>
                    <span>Duration</span>:{time} mins<br/>
                    <span>Status</span>:{status}
                </div>
            </div>
        </div>
        </div>
    )
}

export default SingleMovie
