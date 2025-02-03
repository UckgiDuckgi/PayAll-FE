import { Purchase, ShopCartItem } from '@/types';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const fileAtom = atom<File | null>(null);
export const recentSearchAtom = atomWithStorage<string[]>('recentSearch', []);
export const shopCartAtom = atom<ShopCartItem>({
  coupang: [],
  '11st': [],
});
export const purchaseAtom = atom<Purchase>({
  purchaseList: [],
  totalPrice: 0,
  totalDiscountPrice: 0,
});
