import React, { useState, useEffect } from 'react';

function Pokemon() {

  const [pokemonName, setPokemonName] = useState(null);
  const [pokemonData, setPokemonData] = useState(null);

  const [error, setError] = useState('');
  useEffect(() => {
  const fetchPokemon = () => {
    if (!pokemonName) return;
    setError('');

  const PokemonAPi = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

    fetch(PokemonAPi)
    .then(res => res.ok ? res.json() : Promise.reject('Pokemon not found'))
    .then(setPokemonData)
    .catch(setError);
  };

    fetchPokemon();
  },);

  return (
    <div className="pokemon-container">
      <h2>What is your Pokemon?</h2>
      <input
        type="text"
        placeholder="Enter Pokemon name"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      
      {error && <p className="error-message">{error}</p>}

      {pokemonData && (
        <div>
          <h3>{pokemonData.name.toUpperCase()}</h3>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Base Experience: {pokemonData.base_experience}</p>
          
    <p>Type: {pokemonData.types?.map(t=>t.type.name).join(',')}</p>

          <p>Abilities: {pokemonData.abilities?.map(a => a.ability.name).join(', ')}</p>
          <p>Moves: {pokemonData.moves?.slice(0, 3).map(m => m.move.name).join(', ')}...</p>
          <table className="stat-table">
          <h4>Stats:</h4>
<table border="2" cellPadding="8" cellSpacing="2">
  <thead>
    <tr>
      <th>Stat Name</th>
      <th>Base Value</th>
    </tr>
  </thead>
  <tbody>
    {pokemonData.stats.map(stat => (
      <tr key={stat.stat.name}>
        <td>{stat.stat.name.toUpperCase()}</td>
        <td>{stat.base_stat}</td>
      </tr>
    ))}
  </tbody>
</table>

  </table>

          <p>Total Stats: {pokemonData.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}</p>
          <h4>Sprites:</h4>
          <img src={pokemonData.sprites.back_default} alt="Back Default" />
          <img src={pokemonData.sprites.front_shiny} alt="Front Shiny" />
          <img src={pokemonData.sprites.back_shiny} alt="Back Shiny" />
        </div>
      )}
    </div>
  );
}

export default Pokemon;
