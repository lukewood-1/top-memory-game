export default function WinScreen({onReset, difficulty, onDifficultyChange}){
  
  return (
    <dialog className='win-screen'>
      <div>
        <h1>You got all the cards! You win!</h1>
        {difficulty === 'easy' && (<>
          <h2>Maybe try higher difficulties?</h2>
          <div>
            <button value='medium' onClick={(e) => {
              onDifficultyChange(e);
              onReset();
            }}>
              <p>Medium</p>
              <hr />
              <ul>
                <li>X1.5 cards</li>
                <li>X2 suits</li>
              </ul>
            </button>
            <button value='hard' onClick={(e) => {
              onDifficultyChange(e);
              onReset()
            }}>
              <p>Hard</p>
              <hr />
              <ul>
                <li>X2 cards</li>
                <li>X4 suits</li>
              </ul>
            </button>
          </div>
        </>)
        }
        <button onClick={onReset}>Nah, give me another easy one</button> 
      </div>
    </dialog>
  )
}