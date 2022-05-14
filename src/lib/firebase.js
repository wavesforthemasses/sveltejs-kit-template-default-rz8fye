import { readable } from 'svelte/store';
import { browser } from '$app/env';
import { initializeApp } from '@firebase/app';

export const fire = readable(
	browser
		? initializeApp({
				apiKey: 'AIzaSyCmCs8fk_97mNFBQA6Vb8R6uIXMQR7ZF30',
				authDomain: 'di-vento.firebaseapp.com',
				databaseURL: 'https://di-vento-default-rtdb.europe-west1.firebasedatabase.app/',
				projectId: 'di-vento',
				storageBucket: 'di-vento.appspot.com',
				messagingSenderId: '535521618528',
				appId: '1:535521618528:web:8c16f3882620ee8a943105',
				measurementId: 'G-NKSES0E9SX'
		  })
		: null
);
