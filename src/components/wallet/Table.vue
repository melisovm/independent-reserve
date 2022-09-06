<template>
  <div class="table-container min-w-full">
    <div class="header min-w-full">
      <h1 class="text--title-1">
        Wallets
      </h1>
      <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-grey-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input v-model="searchQuery" type="text" id="input-group-1" class="border text-grey-100 focus:border-transparent text-sm rounded-lg block w-full pl-10 p-2.5" placeholder="Search">
      </div>
    </div>
    <table class="table-auto min-w-full table">
      <thead>
        <tr class="text-left">
          <th>Fiat/Crypto</th>
          <th>Available</th>
          <th>Total</th>
          <th>Value (AUD)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(wallet, index) in filteredWallets"
          :key="index"
          :class="{ '-even': index % 2 === 0 }"
          class="table-row"
        >
          <td>
            <div class="flex items-center">
              <div class="image-block flex items-center justify-center">
                <img :src="getImage(wallet)" :alt="wallet.name">
              </div>
              <span class="font-bold">
                {{ wallet.coin.toUpperCase() }} | &nbsp;
              </span>
              <span> {{ wallet.name }} </span>
            </div>
          </td>
          <td>{{ wallet.balance.available }}</td>
          <td>{{ wallet.balance.total }}</td>
          <td>{{ wallet.balance.fiatCurrency }} {{ wallet.balance.fiat }}</td>
          <td v-if="wallet.canWithdraw" class="text-right">
            <span class="button">
              Withdraw
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, ref} from 'vue';
import { useWalletStore } from '../../stores/wallet';
import { Wallet } from '../../models/wallet';

const walletStore = useWalletStore();

const searchQuery = ref('');

onBeforeMount(async () => {
  await walletStore.fetchWalletList();
})

const wallets = computed(() => walletStore.getWallets);

const filteredWallets = computed(() => {
  if (searchQuery.value) {
    return wallets.value.filter(({ name, coin }) =>
      name.toLowerCase().includes(searchQuery.value.toLowerCase())
      || coin.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return wallets.value;
})

const getImage = ({ coin }: Wallet) => {
  return new URL(`../../assets/${coin}.svg`, import.meta.url).href;
};
</script>

<style scoped lang="scss">
.table-container {
  > .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > .table {
    .image-block {
      border-radius: 50%;
      padding: 10px;
      background: #F7F8F9;
      width: 50px;
      height: 50px;
      margin: 0 20px 0 0;
    }

    td, th {
      padding-top:12px;
      padding-bottom:12px;
    }

    td:first-child, th:first-child {
      padding-left: 20px;
    }

    td:last-child, th:last-child {
      padding-right: 20px;
    }

    .table-row {
      &.-even {
        background: #F7F8F9;

        .image-block {
          background: #ffffff;
        }
      }

      .button {
        color: #0F66BD;
        user-select: none;
        cursor: pointer;
      }
    }
  }
}
</style>
