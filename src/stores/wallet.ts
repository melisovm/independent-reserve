import { defineStore } from 'pinia';
import { getWallets } from '../mocks/wallet-list';
import { Wallet } from '../models/wallet';

interface WalletState {
	wallets: Wallet[],
}

export const useWalletStore = defineStore('wallet', {
	state: (): WalletState => ({
		wallets: [],
	}),
	
	getters: {
		getWallets: ({ wallets }) => wallets,
	},
	
	actions: {
		async fetchWalletList() {
			this.wallets = await getWallets();
		},
	},
});
