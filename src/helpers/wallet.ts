import { Wallet } from '../models/wallet';

export const getImageUrl = ({ coin }: Wallet) => {
	return new URL(`../assets/${coin}.svg`, import.meta.url).href;
}
