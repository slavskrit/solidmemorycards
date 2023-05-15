import { For, createSignal, onCleanup, mapArray, onMount } from 'solid-js';
import type { Component } from 'solid-js';
import * as bootstrap from 'bootstrap';


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
    let uberIndex = new Array<number>(fieldSize() * fieldSize());
    let uniquePairPictureId = randomIntFromInterval(0, 200);
    for (let i = 0; i < uberIndex.length; i++) {
      if (i % 2 == 0) {
        uniquePairPictureId = randomIntFromInterval(0, 200);
      }
      const curentCard = newCards[i];
      curentCard.imageUrl = `https://picsum.photos/id/${uniquePairPictureId}/200/200`;
    }
    setCards(newCards);
  });
    
  const toggle = (card) => {
    setCards(cards().map((_card) => (
      _card.id === card.id ? { ..._card, isOpened: true } : _card
    )));
  };

  return (
    <>
      <For each={cards()}>{card => {
        return <>
              <div onClick={() => toggle(card)}>
                <img src={card.imageUrl} title={card.id} />
              </div>
            </>
      }}
      </For>
    </>
  );
};

export default App;



function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
