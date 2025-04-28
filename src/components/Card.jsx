// import { useEffect, useState } from 'react';

export default function Card({data, onCardClick}){

  return (
    <div className='card'>
      <img src={data.image} alt={data.name} onClick={onCardClick} />
      <p>{data.name}</p>
    </div>
  )
}