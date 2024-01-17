import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

const initialValue = { value: 0 };

const counter = atom(initialValue);


function increaseCounter() {
	counter.set({ value: counter.get().value + 1 });
}

function decreaseCounter() {
	counter.set({ value: counter.get().value - 1 });
}

export { counter, increaseCounter, decreaseCounter };
