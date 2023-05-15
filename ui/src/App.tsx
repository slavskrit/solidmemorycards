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

  const [fieldSize, setFieldSize] = createSignal(2);
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
      curentCard.imageUrl = `https://picsum.photos/id/${uniquePairPictureId}/200/300`;
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
        if (fieldSize() * fieldSize() === cards().filter((card) => card.isOpened === true).length) {
          if (confirm('You won! Play again?')) {
            buildCards()
          } else {
            console.log('Game over');
          }
        }
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
      <div class="grid gap-4 mb-1 md:grid-cols-4">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="tentacles">Enter number of cards (2-10), it will be squared 🤪:</label>
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="number"
        id="tentacles"
        name="tentacles"
        min="2"
          max="10"
          value={fieldSize()}
        onInput={(e) => setFieldSize(+e.target.value)}
      >
        </input>
        </div>

      <div class="cards" >
        <For each={cards()}>{card => {
          return <>
            <div class="card" onClick={() => card.canBeOpened ? toggle(card) : console.log('Could not open')}>
              <img src={card.isOpened ? card.imageUrl : CARD_BACK_IMAGE_URL} title={card.id} />
            </div>
          </>
        }}
        </For>
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