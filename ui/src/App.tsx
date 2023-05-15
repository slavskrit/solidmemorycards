import { For, createSignal, onCleanup, mapArray, onMount } from 'solid-js';
import type { Component } from 'solid-js';

const CARD_BACK_IMAGE_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0OBaos0R931ThGU9zdI9LMG2ymV6st1R0RxOI9pI-_Qy35Yy0b8vjv9hsz3B_KVpvijU&usqp=CAU';

type Card = {
  id: number;
  isOpened: boolean;
  canBeOpened: boolean;
  imageUrl: string;
};

const App: Component = () => {

  const [fieldSize, setFieldSize] = createSignal(4);
  const [cards, setCards] = createSignal([]);

  onMount(() => {
    const newCards: Card[] = [];
    
    for (let i = 0; i < fieldSize(); i++) {
      for (let j = 0; j < fieldSize(); j++) {
        newCards.push({
          id: i * fieldSize() + j,
          isOpened: false,
          imageUrl: '',
          canBeOpened: true,
        });
      };
    };
    let uberIndex = newCards.map((card) => card.id); 
    let uniquePairPictureId = randomIntFromInterval(0, 200);
    shuffle(uberIndex);
    for (let i = 0; i < uberIndex.length; i++) {
      if (i % 2 == 0) {
        uniquePairPictureId = randomIntFromInterval(0, 200);
      }
      const curentCard = newCards[uberIndex[i]];
      curentCard.imageUrl = `https://picsum.photos/id/${uniquePairPictureId}/200/300`;
    }
    setCards(newCards);
  });
    
  const toggle = (card) => {
    setCards(cards().map((_card) => (
      _card.id === card.id ? { ..._card, isOpened: true } : _card
    )));
  };

  return (
    <div class="cards">
      <For each={cards()}>{card => {
        return <>
          <div class="card" onClick={() => toggle(card)}>
            <img src={!card.isOpened ? card.imageUrl : CARD_BACK_IMAGE_URL} title={card.id} />
          </div>
        </>
      }}
      </For>
    </div>
  );
};

export default App;



function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
}