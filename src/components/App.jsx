import { useEffect, useState } from 'react'
import Settings from './Settings.jsx'
import CardContainer from './CardContaner.jsx'

export default function App(){
  const [difficulty, setDifficulty] = useState('easy');
  const [suit, setSuit] = useState('S');
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('memory-cards_lang');
    if(storedLang){
      setLang(storedLang);
    }
  }, [])

  function handleDifficulty(e){
    setDifficulty(e.currentTarget.value);
  }

  function handleSuit(e){
    setSuit(e.currentTarget.value)
  }

  function handleLang(e){
    setLang(e.target.value);
    localStorage.setItem('memory-cards_lang', e.target.value)
  }

  return (<>
      <header>
        <a href="https://github.com/lukewood-1/top-memory-game" target='_blank' rel='noopener noreferrer'>
          <img className='link_github' src='https://cdn.simpleicons.org/github'  alt="Lukewood's gitHub" />
        </a>
        <img src='/logo_artistic.png' className='logo' alt="logo" />
        <Settings difficulty={difficulty} suit={suit} onDifficultyChange={handleDifficulty} onSuitChange={handleSuit} language={lang} onLangChange={handleLang}/>
      </header>
      <main>
        <CardContainer difficulty={difficulty} suit={suit} onDifficultyChange={handleDifficulty} language={lang} />
      </main>
      <footer>
        <p>{lang === 'en' ? 'made by' : 'feito por'} LukeWood - <a href="https://github.com/lukewood-1/" target="_blank" rel="noopener noreferrer">{lang === 'en' ? 'my' : 'meu'} github</a></p>
      </footer>
    </>
  )
}