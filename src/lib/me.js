import { writable } from 'svelte/store';

export const settings = writable({
	color: '#990000',
	id: 'a5T7TjP'
});

export const me = writable({
	id: parseInt(Math.random() * 10000)
});
