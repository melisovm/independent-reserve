import { Wallet } from '../models/wallet';

const wallets: Wallet[] = [
	{
		coin: 'btc',
		name: 'Bitcoin',
		canWithdraw: true,
		balance: {
			available: '1.003000000',
			total: '1.203000000',
			fiat: '76,107.77',
			fiatCurrency: '$',
		},
	},
	{
		coin: 'eth',
		name: 'Ethereum',
		canWithdraw: true,
		balance: {
			available: '3.123456780000000000',
			total: '3.123456780000000000',
			fiat: '13,565.48',
			fiatCurrency: '$',
		},
	},
	{
		coin: 'xrp',
		name: 'Ripple',
		canWithdraw: true,
		balance: {
			available: '1,240000000',
			total: '1,240000000',
			fiat: '13,565.48',
			fiatCurrency: '$',
		},
	},
];

export const getWallets = (): Promise<Wallet[]> => {
	return new Promise(resolve => resolve(wallets))
}

