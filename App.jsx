
import React from "react";
import Search from "./components/Search.jsx";
import {useEffect, useState } from "react";

const API_KEY_URL='https://api.themoviedb.org/3';

const API_KEY= import.meta.env.TOKEN;

const API_OPTION={
  method: 'GET',
  headers:{
    accept:'application/json',
    Authorization:`Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');

const[errorMessage, setErrorMessage ] = useState('');

const[movieList, setMovieList] = useState([]);

const[isLoading , setIsLoading]= useState(false);

const fetchMovies= async()=>{

  setIsLoading(true);
  setErrorMessage('');

  try{
    const endpoint = `${API_KEY_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

    const response = await fetch(endpoint, API_OPTION);
    
    if(!response.ok){
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();

    if(data.Response =='False'){
      setErrorMessage(data.Error || 'Failed to fetch movies.');
      setMovieList([]);
      return;
    }
    setMovieList(data.results || []);

  }catch(error){
    console.error(`Error fetching movies ${error}`);
    setErrorMessage('Error fetching movies. Please try again later.');
  }finally{
    setIsLoading(false);
  }
}


useEffect(()=>{
  fetchMovies();
},[])

  return (
    <main>
      <div className="container">
        <img src="./hero-img.png" alt="no" />
        <header>
          <h1 >
            Find <span>Movies</span> You'll Enjoy<br></br> Without Hasale
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>
        </header>
        
        <section className="all-movies">
           <h2>ALL MOVIES</h2>

           {isLoading? (
            <p className="load">Loading...</p>
           ) : errorMessage ? (
            <p className="error">{errorMessage}</p>
           ): (
            <ul>
              {movieList.map((movie) => (
                <p key={movie.id}>{movie.title}</p>
              ))}
            </ul>
           )}
        </section>
        
      </div>
    </main>
  )
}

export default App

/*import { useEffect, useState } from "react";

const Card = ({title}) =>{
  const[count, setcount ] = useState(0);
  const [hasLiked , sethasLiked] = useState(false);

  useEffect(()=>{
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [hasLiked]);

  return(
  <div className="card" onClick={()=> setcount((prevState)=> prevState+1)}>
      <h4>{title}</h4>

      <button onClick={()=> sethasLiked(!hasLiked)}>
        {hasLiked ? '❤️': '🤍'}
        </button>
     </div>
  )
}

const App =()=>{


  return (<div className="card-container">

  <Card title = "Shubha"></Card>
  <Card title = "Roshan"></Card>
  <Card title= "Pragati"></Card>
  <Card title= "Archi"></Card>
  </div>
  )
}

export default App

*/