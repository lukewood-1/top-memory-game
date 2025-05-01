export default function ScoreCounter({score, deck, lang}){
  return (
    <div className='score-counter'>
      <p>{lang === 'en' ? 'Score' : 'Pontuação'}: <span>{score.current}/{deck.length}</span></p>
      <hr />
      <p>{lang === 'en' ? 'Record' : 'Recorde'}: <span>{`${score.record}/${deck.length}`}</span></p>
      <hr />
      <p>{lang === 'en' ? 'Wins' : 'Vitórias'}: <span>{score.wins}</span></p>
    </div>
  )
}
