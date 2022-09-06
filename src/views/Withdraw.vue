<template>
  <div class="withdraw-container flex">
    <app-sidebar>
      <h3 class="text--title-1">
        Wallets
      </h3>

      <wallet-list></wallet-list>
    </app-sidebar>
    <div class="withdraw-block p-8">
      <div class="flex items-center">
        <h2 class="text--title-1">
          Withdraw {{ currentWallet?.name }}
        </h2>

        <div v-if="viewState === WithdrawViewState.result" class="status ml-4 px-4 py-2 rounded-2xl bg-grey-200 flex items-center select-none">
          <div class="w-2 h-2 rounded-full bg-alert-orange mr-2" />
          <div class="text-alert-orange">Pending</div>
        </div>
      </div>
      <div v-if="viewState !== WithdrawViewState.result" class="withdraw-form grid grid-cols-1 md:grid-cols-5 items-center mt-12">
        <div>Amount ({{ walletCode }})</div>
        <div class="col-start-2 col-end-6">
          <div class="relative">
            <input v-model="form.amount" class="block p-4 w-full text-sm bg-transparent rounded-lg border border-grey-300 outline outline-0 focus:outline-0">
            <button type="button" class="text-white absolute right-2.5 bottom-2.5 rounded-lg text-sm px-4 py-2 bg-primary" @click="onMax">Max</button>
          </div>
        </div>
        <div class="col-start-2 col-end-6">
          <div class="mb-6 mt-2.5 text-grey-100 text-sm">
            A withdrawal fee of {{ walletCode }} 0.0004 applies.
          </div>
        </div>

        <div class="mb-6">Destination address</div>
        <div class="mb-6 col-start-2 col-end-6">
          <input v-model="form.address" class="block p-4 w-full text-sm bg-transparent rounded-lg border border-grey-300 outline outline-0 focus:outline-0">
        </div>

        <template v-if="viewState === WithdrawViewState.details">
          <div class="self-start mt-4">Comment</div>
          <div class="col-start-2 col-end-6">
            <textarea v-model="form.comment" rows="3" class="resize-none block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-grey-300 outline outline-0 focus:outline-0" />
          </div>
        </template>

        <template v-else-if="WithdrawViewState.confirmation">
          <template v-if="confirmationType === WithdrawConfirmationType.password">
            <div class="my-8 -mx-8 px-8 bg-blue-light flex items-center h-full"> Password </div>
            <div class="my-8 -mx-8 px-8 col-start-2 col-end-6 bg-blue-light h-full flex items-center">
              <input type="password" class="block p-4 w-full text-sm bg-transparent rounded-lg border border-grey-300 outline outline-0 focus:outline-0">
            </div>
          </template>
          <template v-else-if="confirmationType === WithdrawConfirmationType.tfa">
            <div class="my-8 -mx-8 px-8 bg-blue-light flex items-center h-full"> 2FA </div>
            <div class="my-8 -mx-8 px-8 col-start-2 col-end-6 bg-blue-light h-full flex items-center">
              <input type="text" class="block p-4 w-full text-sm bg-transparent rounded-lg border border-grey-300 outline outline-0 focus:outline-0">
            </div>
          </template>
        </template>
      </div>
      <div v-else class="mt-12">
        <span>
          A withdrawal for {{ walletCode }} {{ form.amount }} is pending, and will be processed shortly.
        </span>

        <div class="grid grid-cols-1 md:grid-cols-5 items-center mt-12">
          <div>Amount ({{ walletCode }})</div>
          <div class="col-start-2 col-end-6 p-4 rounded rounded-md bg-grey-200">
            {{ form.amount }}
          </div>
        </div>
      </div>
      <div class="withdraw-footer block text-center pt-12">
        <AppButton class="bg-primary text-white" @click="onWithdraw" v-if="viewState === WithdrawViewState.details">
          Withdraw
        </AppButton>
        <template v-else-if="viewState === WithdrawViewState.confirmation">
          <AppButton class="bg-transparent text-primary mr-4" @click="setViewState(WithdrawViewState.details)">
            Cancel
          </AppButton>
          <AppButton class="bg-primary text-white" @click="onConfirm">
            Confirm
          </AppButton>
        </template>
        <AppButton v-else class="bg-primary text-white" @click="onOk">
          OK
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useWalletStore } from '../stores/wallet';
import { Wallet } from '../models/wallet';
import { WithdrawConfirmationType, WithdrawViewState } from '../models/withdraw';

import { AppButton, AppSidebar } from '../components/ui';
import { WalletList } from '../components';


const walletStore = useWalletStore();
const route = useRoute();

const FORM = {
  address: '',
  amount: '',
  comment: '',
};

const currentWallet = ref() as Ref<null | Wallet>;
const viewState = ref(WithdrawViewState.details);
const confirmationType = ref(WithdrawConfirmationType.password);
const form = ref({ ...FORM });

const walletCode = computed(() => (currentWallet as Ref<Wallet>).value.coin.toUpperCase())

onBeforeMount(async () => {
  const { params: { coin: paramsCoin, type: paramsType } } = route;
  await walletStore.fetchWalletList();

  currentWallet.value = walletStore.getWallets.find(({ coin }) => coin === paramsCoin) as Wallet;
  confirmationType.value = paramsType as WithdrawConfirmationType;
})

const setViewState = (state: WithdrawViewState) => {
  viewState.value = state;
}

const onWithdraw = () => {
  if (!form.value.amount || !form.value.address) return;

  setViewState(WithdrawViewState.confirmation);
}

const onMax = () => {
  form.value.amount = currentWallet.value?.balance.available as string;
}

const onConfirm = () => {
  setViewState(WithdrawViewState.result);
}

const onOk = () => {
  form.value = { ...FORM };

  setViewState(WithdrawViewState.details);
}
</script>

<style lang="scss" scoped>
.withdraw-block {
  width: 100%;
  background: #ffffff;
  border-radius: 5px;
}
</style>
