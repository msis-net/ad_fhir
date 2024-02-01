import { persistentAtom } from '@nanostores/persistent';
import { atom } from 'nanostores';

const currentDate = persistentAtom('currentDate','');
//export const statusStore = persistentAtom('');

export type SettingsValue = {
    correntDate:'',
    Hospinf: {},
    authdata: {},
    vByoto: {},
    vSrynaiyo: {},
  }

const valData = persistentAtom('valdata', '')

export { currentDate ,valData }