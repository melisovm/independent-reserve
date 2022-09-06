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
		//params: force - for send GET request despite are exist wallets or not(only for optimisation purposes)
		async fetchWalletList(force = false) {
			if (!force && this.wallets.length) {
				return;
			}
			
			this.wallets = await getWallets();
		},
	},
});
