<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Crypto Prices</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Crypto Prices</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <CryptoListItem v-for="crypto in cryptos" :key="crypto.id" :crypto="crypto" />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import CryptoListItem from '@/components/CryptoListItem.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const cryptos = ref<any[]>([]);

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.coinlore.net/api/tickers/');
    cryptos.value = (response.data as { data: any[] }).data;
    console.log('Fetched cryptos:', cryptos.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});

function refresh(event: any) {
  axios.get('https://api.coinlore.net/api/tickers/')
    .then((response: any) => {
      cryptos.value = (response.data as { data: any[] }).data;
      console.log('First item:', cryptos.value[0]);
      // event.target.complete() is required by Ionic refresher
      if (event && event.target && typeof event.target.complete === 'function') {
        event.target.complete();
      }
    })
    .catch((err: any) => {
      console.error('Refresh error:', err);
      if (event && event.target && typeof event.target.complete === 'function') {
        event.target.complete();
      }
    });
}
</script>