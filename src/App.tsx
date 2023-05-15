import { For, createSignal, onCleanup, mapArray, onMount, createEffect } from 'solid-js';
import type { Component } from 'solid-js';

const CARD_BACK_IMAGE_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0OBaos0R931ThGU9zdI9LMG2ymV6st1R0RxOI9pI-_Qy35Yy0b8vjv9hsz3B_KVpvijU&usqp=CAU';

type Card = {
  id: number;
  isOpened: boolean;
  canBeOpened: boolean;
  imageUrl: string;
};

const App: Component = () => {

  const [fieldSize, setFieldSize] = createSignal(6);
  const [cards, setCards] = createSignal([]);
  const [openedCards, setOpenedCards] = createSignal([]);

  createEffect(() => buildCards());

  function buildCards() {
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
      curentCard.imageUrl = `https://picsum.photos/id/${uniquePairPictureId}/300/300`;
    }
    setCards(newCards);
  }

  onMount(() => {
    buildCards()
  });
    
  const toggle = (card) => {
    if (openedCards().length === 0) {
      openedCards().push(card);
      setCards(cards().map((_card) => (
        _card.id === card.id ? { ..._card, isOpened: true } : _card
      )));
      setOpenedCards([openedCards()]);
    } else {
      const openedCard = openedCards()[0][0]; // TODO: fix this.
      if (openedCard.imageUrl === card.imageUrl) {
        setCards(cards().map((_card) => (
          _card.id === card.id ? { ..._card, isOpened: true, canBeOpened: false } : _card
        )));
        setTimeout(() => {
          if (fieldSize() * fieldSize() === cards().filter((card) => card.isOpened === true).length) {
            if (confirm('You won! Play again?')) {
              buildCards()
            } else {
              console.log('Game over');
            }
          }
        }, 100);
      } else {
        setCards(cards().map((_card) => (
          _card.id === openedCard.id ? { ..._card, isOpened: false, canBeOpened: true } : _card
        )));
      }
      setOpenedCards([]);
    }
  };

  return (
    <div class="app">
      <div class="container p-5">
        <button onClick={[setFieldSize, 2]} class="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          2x2
        </button>
        <button onClick={[setFieldSize, 4]} class="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          4x4
        </button>
        <button onClick={[setFieldSize, 6]} class="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          6x6
        </button>
      </div>
      <div class="min-h-screen flex items-center justify-center">
        <div class={`grid 
        grid-cols-${fieldSize()} 
        sm:grid-cols-${fieldSize()} 
        md:grid-cols-${fieldSize()} 
        lg:grid-cols-${fieldSize()} 
        xl:grid-cols-${fieldSize()}
        2xl:grid-cols-${fieldSize()} gap-4`} >
          <For each={cards()}>{card => {
            return <>
              <div class={`w-1/${fieldSize()} w-40 h-40`} onClick={() => card.canBeOpened ? toggle(card) : console.log('Could not open')}>
                <img class="w-full aspect-square" src={card.isOpened ? card.imageUrl : CARD_BACK_IMAGE_URL} title={card.id} />
              </div>
            </>
          }}
          </For>
          </div>
        </div>
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