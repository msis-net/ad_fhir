import { persistentAtom } from '@nanostores/persistent';

export const statusStore = persistentAtom<'loggedOut' | 'loggedIn' | 'Other'>('loginStatus', 'loggedOut');
//export const statusStore = persistentAtom('');


