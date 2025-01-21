import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const fileAtom = atom<File | null>(null);
export const recentSearchAtom = atomWithStorage<string[]>('recentSearch', []);
