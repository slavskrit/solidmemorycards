import { For, createSignal, onCleanup, onMount } from 'solid-js';
import type { Component } from 'solid-js';
import * as bootstrap from 'bootstrap';


type Card = {
  id: number;
  isOpened: boolean;
  imageUrl: string;
};

const App: Component = () => {

  const [fieldSize, setFieldSize] = createSignal(0);
  const [cards, setCards] = createSignal([
    
  ]);

  onMount(() => {
    const field = new Array<number>(fieldSize());
    console.log(fieldSize());
    setCards([1, 2, 3]);
    // window.addEventListener('hashchange', setActiveItem);
  });
    
  return (
    <>
    <For each={cards()}>{(cat, i) =>
      <li>
        <a target="_blank" href={`https://www.youtube.com/watch?v=${cat.id}`}>
          {i() + 1}: {cat.name}
        </a>
      </li>
      }
      </For>
    </>
  );
};

export default App;
