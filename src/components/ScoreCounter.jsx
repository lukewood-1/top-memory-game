export default function ScoreCounter({score, deck}){
  return (
    <div className='score-counter'>
      <p>Score: <span>{score.current}/{deck.length}</span></p>
      <hr />
      <p>Record: <span>{score.record === 0 ? 'none' : `${score.record}/${deck.length}`}</span></p>
    </div>
  )
}
