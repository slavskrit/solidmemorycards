import { For, createSignal, onCleanup, mapArray, onMount } from 'solid-js';
import type { Component } from 'solid-js';
import * as bootstrap from 'bootstrap';


type Card = {
  id: number;
  isOpened: boolean;
  imageUrl: string;
};

const App: Component = () => {

  const [fieldSize, setFieldSize] = createSignal(4);
  const [cards, setCards] = createSignal([
    
  ]);

  onMount(() => {
    const newCards: Card[][] = [];
    
    for (let i = 0; i < fieldSize(); i++) {
      const cardsRow: Card[] = [];
      for (let j = 0; j < fieldSize(); j++) {
        cardsRow.push({
          id: i * fieldSize() + j,
          isOpened: false,
          imageUrl: '',
        });
      };
      newCards.push(cardsRow);
    };
    // 
    let uberIndex = new Array<number>(fieldSize() * fieldSize());
    let uniquePairPictureId = randomIntFromInterval(0, 200);
    for (let i = 0; i < uberIndex.length; i++) {
      if (i % 2 == 0) {
        uniquePairPictureId = randomIntFromInterval(0, 200);
      }
      const curentCard = newCards[Math.floor(i / fieldSize())][i % fieldSize()];
      console.log(curentCard);
      curentCard.imageUrl = `https://picsum.photos/id/${uniquePairPictureId}/200/200`;
    }
    setCards(newCards);
  });
    
  return (
    <>
      <For each={cards()}>{cardsRow => {
        return <>
                  <For each={cardsRow}>{card => {
            return <>
              <img src={card.imageUrl} title={card.id} />
            </>
                    }}
                  </For>
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
