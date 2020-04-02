import React from 'react';

import './Table.css';

function Table({ data, onClickRow }) {
  return (
    <table className="table pokemon-list">
      <thead>
        <tr>
          <th scope="col">Resim</th>
          <th scope="col">İsim</th>
          <th scope="col">Süper Tip</th>
          <th scope="col">Evrim</th>
          <th scope="col">HP</th>
          <th scope="col">Enderlik</th>
        </tr>
      </thead>
      <tbody> 
        {data.map((item, i)=> <tr key={i} onClick={() => onClickRow(item)}>
          <td>
            <img src={item.imageUrl} height="75px" alt='' />
          </td>
          <td>{item.name}</td>
          <td>{item.supertype}</td>
          <td>{item.evolvesFrom}</td>
          <td>{item.hp}</td>
          <td>{item.rarity}</td>
        </tr>)}
      </tbody>
    </table>
  )
}

export default Table;
