import { useState, useEffect } from 'react';

export default function Settings({difficulty, suit, onDifficultyChange, onSuitChange, language, onLangChange}){
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
    <button className='settings-btn' onClick={handleSettingsWindow}>{language === 'en' ? 'Settings' : 'Configurações'}</button>
    <dialog className='settingsWindow'>
      <div>
        <h3>{language === 'en' ? 'Select difficulty' : 'Escolha a dificuldade'}</h3>
        <button className='dif-close-btn' onClick={handleSettingsWindow}>X</button>
      </div>
      <div className="difficulty-wrapper">
        <div>
          <button className={difficulty === 'easy' ? 'btn-selected' : ''} value='easy' onClick={onDifficultyChange}>
            <p>{language === 'en' ? 'Easy' : 'Fácil'}</p>
            <hr />
            <ul>
              <li>12 {language === 'en' ? 'cards' : 'cartões'}</li>
              <li>1 {language === 'en' ? 'suit' : 'naipe'}</li>
            </ul>
          </button>
          <button className={difficulty === 'medium' ? 'btn-selected' : ''} value='medium' onClick={onDifficultyChange}>
            <p>{language === 'en' ? 'Medium' : 'Média'}</p>
            <hr />
            <ul>
              <li>18 {language === 'en' ? 'cards' : 'cartões'}</li>
              <li>2 {language === 'en' ? 'suits' : 'naipes'}</li>
            </ul>
          </button>
          <button className={difficulty === 'hard' ? 'btn-selected' : ''} value='hard' onClick={onDifficultyChange}>
            <p>{language === 'en' ? 'Hard' : 'Difícil'}</p>
            <hr />
            <ul>
              <li>24 {language === 'en' ? 'cards' : 'cartões'}</li>
              <li>4 {language === 'en' ? 'suits' : 'naipes'}</li>
            </ul>
          </button>
        </div>
      </div>
      {difficulty === 'easy' && <div className="suit-wrapper">
        <h3>{language === 'en' ? 'Select the suit of the cards' : 'Escolha o naipe das cartas'}</h3>
        <div className='suits-div'>
          <button className={suit === 'C' && difficulty === 'easy' ? 'btn-selected suit-btn clubs' : 'suit-btn clubs'} value='C' onClick={onSuitChange} disabled={difficulty !== 'easy'}>{language === 'en' ? 'Clubs' : 'Paus'}</button>
          <button className={suit === 'D' && difficulty === 'easy' ? 'btn-selected suit-btn diamonds' : 'suit-btn diamonds'} value='D' onClick={onSuitChange} disabled={difficulty !== 'easy'}>{language === 'en' ? 'Diamonds' : 'Ouros'}</button>
          <button className={suit === 'H' && difficulty === 'easy' ? 'btn-selected suit-btn hearts' : 'suit-btn hearts'} value='H' onClick={onSuitChange} disabled={difficulty !== 'easy'}>{language === 'en' ? 'Hearts' : 'Copas'}</button>
          <button className={suit === 'S' && difficulty === 'easy' ? 'btn-selected suit-btn spades' : 'suit-btn spades'} value='S' onClick={onSuitChange} disabled={difficulty !== 'easy'}>{language === 'en' ? 'Spades' : 'Espadas'}</button>
          <button className={suit === '' && difficulty === 'easy' ? 'btn-selected suit-btn no-suit' : 'suit-btn no-suit'} value={null} onClick={onSuitChange} disabled={difficulty !== 'easy'}>{language === 'en' ? 'Random' : 'Aleatório'}</button>
        </div>
      </div>}
      <p>{(() => {
        const optionalStr = () => {
          if(difficulty === 'easy'){
            return language === 'en' ? ' or suit' : ' ou naipe'
          }
        }
        return language === 'en' 
        ? `Note: selecting difficulty${optionalStr()} will start a new game.`
        : `Obs: Escolher dificuldade${optionalStr()} reinicia o jogo.`
        })()}</p>
      <div className="langSelect">
        <h3>{language === 'en' ? 'Language' : 'Língua'}</h3>
        <div>
          <button className='btn-en' onClick={onLangChange} value='en'>English</button>
          <button className='btn-br' onClick={onLangChange} value='br'>Portuguẽs</button>
        </div>
      </div>
    </dialog>
  </>)
}