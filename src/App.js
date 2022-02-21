import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const URL = 'https://api.spoonacular.com/recipes/complexSearch';
const API_KEY = '';


function App() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => {
    const address = URL + '?apiKey=' + API_KEY + '&query=' + searchQuery;
    
    axios.get(address)
    .then((response) => {
      setRecipes(response.data.results)
      setIsLoaded(true)
    }).catch(error => {
      setError(error);
    });
  }, [searchQuery])
    

  if (error) {
    return <p>{error.message}</p>
  } else if (!isLoaded) {
    return (
      <>
      <h1>Food inspiration</h1>
      <input id='search' name='search' placeholder='Search e.g. by the name of a dish or ingredient'/>
      <button onClick={e => setSearchQuery(document.getElementById("search").value)}>Search</button>
      <p>Loading...</p>
      </>
    )
  } else if (recipes == '') {
    return (
      <>
      <h1>Food inspiration</h1>
      <input id='search' name='search' placeholder='Search e.g. by the name of a dish or ingredient'/>
      <button onClick={e => setSearchQuery(document.getElementById("search").value)}>Search</button>
      <p>No results. Try another search query!</p>
      </>
    )
  } else {
    return (
      <>
      <h1>Food inspiration</h1>
      <input id='search' name='search' placeholder='Search e.g. by the name of a dish or ingredient'/>
      <button onClick={e => setSearchQuery(document.getElementById("search").value)}>Search</button>
      <div>
        {
          recipes.map(recipe => (
            <div key={recipe.title}>
              <h3>{recipe.title}</h3>
              <img src={recipe.image}/>
            </div>
          ))
        }
      </div>
      </>
    );
  }
}

export default App;