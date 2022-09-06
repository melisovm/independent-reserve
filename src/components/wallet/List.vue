<template>
  <div class="wallet-list">
    <div
      v-for="(wallet, index) in wallets"
      :key="index"
      class="wallet flex items-center select-none cursor-pointer"
      @click="onWallet(wallet)"
    >
      <div class="image-block flex items-center justify-center">
        <img :src="getImageUrl(wallet)" :alt="wallet.name">
      </div>
      <div class="text-block">
        <div class="name">
          <span class="font-bold">
            {{ wallet.coin.toUpperCase() }} |&nbsp;
          </span>
          <span> {{ wallet.name }} </span>
        </div>
        <div class="balance">
          <span class="font-bold"> Total: </span>
          <span> {{ wallet.balance.total }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { getImageUrl } from "../../helpers/wallet";
import {useWalletStore} from "../../stores/wallet";
import {Wallet} from "../../models/wallet";
import {useRouter} from "vue-router";

const walletStore = useWalletStore();
const router = useRouter();

const wallets = computed(() => walletStore.getWallets);

const onWallet = (wallet: Wallet) => {
  if (!wallet.canWithdraw) {
    return;
  }

  router.push({ name: 'Withdraw', params: { coin: wallet.coin, type: 'password' } })
}
</script>

<style lang="scss" scoped>
.wallet-list {
  margin: 32px 0 0;

  > .wallet {
    margin: 0 0 28px;

    > .image-block {
      border-radius: 50%;
      width: 50px;
      max-width: 50px;
      min-width: 50px;
      height: 50px;
      max-height: 50px;
      min-height: 50px;
      background: #F7F8F9;
      margin: 0 20px 0 0;
    }
  }
}
</style>
