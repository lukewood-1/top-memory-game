import { useState, useEffect } from 'react'
import Card from './Card.jsx'
import ScoreCounter from './ScoreCounter.jsx'
import WinScreen from './WinScreen.jsx'
import LoadingScreen from './LoadingScreen.jsx'

export default function CardContainer({difficulty, suit, onDifficultyChange, language}){
  const [deck, setDeck] = useState([]);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState({
    current: 0,
    record: 0,
    wins: 0
  });
  const [selectedCards, setSelectedCards] = useState([])

  function shuffleDeck(){
    const mockDeck = [...deck];
    const randomPick = () => Math.floor(Math.random() * deck.length);

    for(let i = 0; i < deck.length; i++){
      let idx = randomPick();
      while(idx === i){
        idx = randomPick();
      }
      const temp = mockDeck[i];
      mockDeck[i] = mockDeck[idx];
      mockDeck[idx] = temp;
    }

    setDeck(mockDeck);
  };

  function handleCardClick(e){
    const card = e.target.alt;
    if(selectedCards.includes(card)){
      setSelectedCards([]);
      setScore(prev => ({...prev, current: 0}));
    } else {
      setSelectedCards([...selectedCards, card]);
      setScore(prev => ({...prev, current: prev.current + 1}));
    }
  }

  function resetGame(){
    setSelectedCards([]);
    setScore(prev => ({...prev, current: 0, record: 0}));
    if(score.current === deck.length){
      setScore(prev => ({...prev, wins: score.wins + 1}))
    }
  }

  useEffect(() => {
    if(score.current > score.record){
      setScore(prev => ({...prev, record: prev.current}))
    }
    shuffleDeck();
    const winScreen = document.querySelector('.win-screen');
    if(score.current === deck.length && deck.length !== 0){
      if(!winScreen.open){
        winScreen.showModal()
      }
    } else {
      if(winScreen.open){
        winScreen.close()
      }
    }
  }, [score.current])

  const getCards = async (fetchController, didFetch = false) => {
    const cardData = {difficulty, suit, cards: []};
    try {

      // suits: D(diamonds), H(hearts), C(Clubs) and S(Spades)
      const suitChoices = ['D', 'H', 'C', 'S'];
      const cardChoices = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'J', 'Q', 'K'];
      const pick = choice => choice[Math.floor(Math.random() * choice.length)];
      const R = suitChoices[Math.floor(Math.random() * suitChoices.length)];

      // Define what suit the cards are gonna be, user-defined
      let cardsPath = [];
      const drawAmount = (
        difficulty === 'easy' ? 12
      : difficulty === 'medium' ? 18
      : difficulty === 'hard' ? 24
      : 12);

      if(difficulty === 'easy' && suit){
        cardsPath = `2${suit},3${suit},4${suit},5${suit},6${suit},7${suit},8${suit},9${suit},0${suit},J${suit},Q${suit},K${suit}`;
      } else {
        function defineSuitsLength(num){
          if(num >= suitChoices.length) {
            return;
          } else {
            suitChoices.splice(suitChoices.indexOf(pick(suitChoices)), 1);
            return defineSuitsLength(num);
          }
        };
        if(difficulty === 'medium'){
          defineSuitsLength(2);
        }
        while(cardsPath.length < drawAmount){
          let temp = `${pick(cardChoices)}${pick(suitChoices)}`;
          while(cardsPath.includes(temp)){
            temp = `${pick(cardChoices)}${pick(suitChoices)}`;
          }
          cardsPath.push(temp)
        }
      }
      console.log(suitChoices, `${cardsPath}`)

      // Create the deck
      const source = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?cards=${cardsPath}`, {
        signal: fetchController.signal
      });
      const sourceJson = await source.json();
      const deck = sourceJson.deck_id;

      // Draw cards from the deck
      const draw = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=${drawAmount}`, {
        signal: fetchController.signal
      });
      const drawJson = await draw.json();

      // List the drawn cards
      const capitalize = (target) => {
        if(language === 'en'){
          return `${target.value.slice(0,1)}${target.value.slice(1).toLowerCase()} of ${target.suit.slice(0,1)}${target.suit.slice(1).toLowerCase()}`
        } else if(language === 'br'){
          const str = `${target.value.slice(0,1)}${target.value.slice(1).toLowerCase()} de ${target.suit.slice(0,1)}${target.suit.slice(1).toLowerCase()}`;
          const replacements = {
            'Spades': 'Espadas',
            'Diamonds': 'Ouros',
            'Hearts': 'Copas',
            'Clubs': 'Paus',
            'Jack': 'Valete',
            'Queen': 'Rainha',
            'King': 'Rei',
            'Ace': 'Ás'
          };
          const regex = /Spades|Diamonds|Hearts|Clubs|Jack|Queen|King|Ace/g;
          const translated = str.replace(regex, match => replacements[match])

          return translated
        }
      };
      const list = drawJson.cards;
      setReady(true);
      setLoading(false);

      // populate array to set initial deck state - store images in localStorage
      for(let card of list){
        cardData.cards.push({
          id: card.code,
          image: card.image,
          name: capitalize(card)
        })
      }
      setDeck([...cardData.cards]);

      localStorage.setItem('memory-game_deck', JSON.stringify(cardData))
      didFetch = true;

    } catch (err) {
      console.warn(err);
      fetchController.abort();
    }
  }

  useEffect(() => {
    const connectionKiller = new AbortController();
    let didFetch = false;

    getCards(connectionKiller, didFetch);

    return (() => {
      if(didFetch){
        connectionKiller.abort();
      }
    })
  }, [language])

  useEffect(() => {
    const fetchController = new AbortController();
    let didFetch = false;

    setLoading(true);
    const stored = localStorage.getItem('memory-game_deck');
    const parsed = JSON.parse(stored);
    if(stored && parsed.difficulty === difficulty && parsed.suit === suit){
      setReady(true);
      setLoading(false);
      setDeck([...parsed.cards]);
    } else {
      getCards(fetchController, didFetch);
    }

    return (()=> {
      if(didFetch){
        fetchController.abort();
      }
    })
  }, [difficulty, suit]);

  function showCards(){
    if(ready){
      const renderFrom = (from, to) => deck.slice(from,to).map(
        card => <Card key={card.id} data={card} onCardClick={handleCardClick} />
      );
      const renderShuffleBtn = () => <button key='shuffleCard' className='shuffle-deck-btn' onClick={shuffleDeck}>shuffle Deck</button>;
      return (<>
        {renderFrom(0,3)}
        {renderShuffleBtn()}
        {renderFrom(3,6)}
      </>)
    }
  }

  return (<>
    <LoadingScreen loading={loading} language={language} />
    <ScoreCounter score={score} deck={deck} lang={language} />
    <div className='card-container'>
      {showCards()}
    </div>
    <WinScreen onReset={resetGame} difficulty={difficulty} onDifficultyChange={onDifficultyChange} language={language} />
  </>)
}
