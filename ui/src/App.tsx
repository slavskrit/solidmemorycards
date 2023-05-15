import { For, createSignal, onCleanup, mapArray, onMount } from 'solid-js';
import type { Component } from 'solid-js';
import * as bootstrap from 'bootstrap';


type Card = {
  id: number;
  isOpened: boolean;
  imageUrl: string;
};

const App: Component = () => {

  const [fieldSize, setFieldSize] = createSignal(3);
  const [cards, setCards] = createSignal([
    
  ]);

  onMount(() => {
    const newCards: Card[][] = [];
    for (let i = 0; i < fieldSize(); i++) {
      console.log('i', i);
      const cardsRow: Card[] = [];
      for (let j = 0; j < fieldSize(); j++) {
        cardsRow.push({
          id: i * fieldSize() + j,
          isOpened: false,
          imageUrl: 'https://picsum.photos/id/237/200/200',
        });
      };
      newCards.push(cardsRow);
    };
    setCards(newCards);
  });
    
  return (
    <>
      <For each={cards()}>{cardsRow => {
        return <>
                  <For each={cardsRow}>{card => {
                    return <><img src={card.imageUrl}/></>
                    }}
                  </For>
              </>
      }}
      </For>
    </>
  );
};

export default App;
