import { derived } from 'svelte/store';
import { fire } from './firebase.js';
import { getDatabase } from '@firebase/database';
export const rdb = derived(fire, ($fire) => $fire && getDatabase());
