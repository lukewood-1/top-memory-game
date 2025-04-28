import { useState } from 'react'
import Settings from './Settings.jsx'
import CardContainer from './CardContaner.jsx'

export default function App(){
  const [difficulty, setDifficulty] = useState('easy');
  const [suit, setSuit] = useState('S');

  function handleDifficulty(e){
    setDifficulty(e.currentTarget.value);
  }

  function handleSuit(e){
    setSuit(e.target.value)
  }

  return (<>
      <header>
        <a href="https://github.com/lukewood-1/top-memory-game" target='_blank' rel='noopener noreferrer'>
          <img className='link_github' src='https://cdn.simpleicons.org/github'  alt="Lukewood's gitHub" />
        </a>
        <img src='/logo_artistic.png' className='logo' alt="logo" />
        <Settings difficulty={difficulty} suit={suit} onDifficultyChange={handleDifficulty} onSuitChange={handleSuit} />
      </header>
      <main>
        <CardContainer difficulty={difficulty} suit={suit} onDifficultyChange={handleDifficulty}/>
      </main>
      <footer>
        <p>made by LukeWood - <a href="https://github.com/lukewood-1/" target="_blank" rel="noopener noreferrer">my github</a></p>
      </footer>
    </>
  )
}