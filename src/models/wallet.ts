export interface Balance {
	available: string;
	total: string;
	fiat: string;
	fiatCurrency: string;
}

export interface Wallet {
	coin: string;
	name: string;
	canWithdraw: boolean;
	balance: Balance;
}
