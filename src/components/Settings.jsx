import { useState, useEffect } from 'react';

export default function Settings({difficulty, suit, onDifficultyChange, onSuitChange}){
  const [showWindow, setShowWindow] = useState(false);

  useEffect(() => {
    const settingsWindow = document.querySelector('.settingsWindow');

    if(showWindow){
      settingsWindow.showModal();
    } else {
      settingsWindow.close();
    }
  }, [showWindow]);

  function handleSettingsWindow(){
    setShowWindow(!showWindow)
  }

  return (<>
    <button className='settings-btn' onClick={handleSettingsWindow}>Settings</button>
    <dialog className='settingsWindow'>
      <div>
        <h3>Select difficulty</h3>
        <button className='dif-close-btn' onClick={handleSettingsWindow}>X</button>
      </div>
      <div className="difficulty-wrapper">
        <div>
          <button className={difficulty === 'easy' ? 'btn-selected' : ''} value='easy' onClick={onDifficultyChange}>
            <p>Easy</p>
            <hr />
            <ul>
              <li>12 cards</li>
              <li>1 suit</li>
            </ul>
          </button>
          <button className={difficulty === 'medium' ? 'btn-selected' : ''} value='medium' onClick={onDifficultyChange}>
            <p>Medium</p>
            <hr />
            <ul>
              <li>18 cards</li>
              <li>2 suits</li>
            </ul>
          </button>
          <button className={difficulty === 'hard' ? 'btn-selected' : ''} value='hard' onClick={onDifficultyChange}>
            <p>Hard</p>
            <hr />
            <ul>
              <li>24 cards</li>
              <li>4 suits</li>
            </ul>
          </button>
        </div>
      </div>
      {difficulty === 'easy' && <div className="suit-wrapper">
        <h3>Select the suit of the cards</h3>
        <div className='suits-div'>
          <button className={suit === 'C' && difficulty === 'easy' ? 'btn-selected suit-btn clubs' : 'suit-btn clubs'} value='C' onClick={onSuitChange} disabled={difficulty !== 'easy'}>Clubs</button>
          <button className={suit === 'D' && difficulty === 'easy' ? 'btn-selected suit-btn diamonds' : 'suit-btn diamonds'} value='D' onClick={onSuitChange} disabled={difficulty !== 'easy'}>Diamonds</button>
          <button className={suit === 'H' && difficulty === 'easy' ? 'btn-selected suit-btn hearts' : 'suit-btn hearts'} value='H' onClick={onSuitChange} disabled={difficulty !== 'easy'}>Hearts</button>
          <button className={suit === 'S' && difficulty === 'easy' ? 'btn-selected suit-btn spades' : 'suit-btn spades'} value='S' onClick={onSuitChange} disabled={difficulty !== 'easy'}>Spades</button>
          <button className={suit === '' && difficulty === 'easy' ? 'btn-selected suit-btn no-suit' : 'suit-btn no-suit'} value={null} onClick={onSuitChange} disabled={difficulty !== 'easy'}>Random</button>
        </div>
      </div>}
      <p>Note: selecting difficulty{difficulty === 'easy' &&' or suit'} will start a new game.</p>
    </dialog>
  </>)
}