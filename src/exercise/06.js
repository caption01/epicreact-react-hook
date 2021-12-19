// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import { useState } from 'react'
import { useEffect } from 'react'

import { PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!pokemonName) return
    
    setPokemon(null)

    fetchPokemon(pokemonName).then((pokemon) => {
      setPokemon(pokemon)
    }).catch((err) => {
      setPokemon(null)
      setError(err)
    })
  }, [pokemonName, setPokemon])
  

  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  if (!pokemonName) return 'Submit a pokemon'

  if (error) {
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    ) 
  }

  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  if (pokemonName && !pokemon) return <PokemonInfoFallback name={pokemonName} />

  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
