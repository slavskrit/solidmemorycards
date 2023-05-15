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
          _card.id === card.id ? { ..._card, isOpened: true } : _card
        )));
        setTimeout(() => {
          setCards(cards().map((_card) => (
            _card.id === card.id ? { ..._card, isOpened: false } : _card
          )));
          setCards(cards().map((_card) => (
            _card.id === openedCard.id ? { ..._card, isOpened: false, canBeOpened: true } : _card
          )));
        }, 400);
      }
      setOpenedCards([]);
    }
  };

  return (
    <div class="app">
      <div class="text-center">
        <button onClick={[setFieldSize, 2]} class="m-5 drop-shadow-md bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          2x2
        </button>
        <button onClick={[setFieldSize, 4]} class="m-5 drop-shadow-md bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          4x4
        </button>
        <button onClick={[setFieldSize, 6]} class="m-5 drop-shadow-md bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          6x6
        </button>
      </div>
      <div class="flex items-center justify-center">
        <div class={`cards-${fieldSize()}`} >
          <For each={cards()}>{card => {
            return <>
              <div class="card p-1 drop-shadow-md cursor-pointer"
                onClick={() => card.canBeOpened ? toggle(card) : console.log('Could not open')}>
                {card.isOpened ?
                  <img class="w-full aspect-square rounded-lg" src={card.imageUrl} alt={ `image with id ${card.id}`}/> :
                  <div class="w-full card-back aspect-square rounded-lg"></div> 
              } 
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