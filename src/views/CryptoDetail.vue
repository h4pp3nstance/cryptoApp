<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <!-- Method 1: Router Link -->
          <ion-button router-link="/home" router-direction="back" class="back-button">
            <ion-icon slot="start" :icon="arrowBackIcon"></ion-icon>
            Back
          </ion-button>
        </ion-buttons>
        <ion-title>{{ crypto?.name || 'Loading...' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list v-if="!loading && crypto">
        <ion-item>
          <ion-label>
            <h2>{{ crypto.name }} ({{ crypto.symbol }})</h2>
            <p>Rank #{{ crypto.rank }}</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p>Price USD</p>
            <h2>${{ formatPrice(crypto.price_usd) }}</h2>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p>Price BTC</p>
            <h3>{{ crypto.price_btc }}</h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p>Market Cap</p>
            <h3>${{ formatNumber(crypto.market_cap_usd) }}</h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p>Volume 24h</p>
            <h3>${{ formatNumber(crypto.volume24) }}</h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p>Circulating Supply</p>
            <h3>{{ formatNumber(crypto.csupply) }} {{ crypto.symbol }}</h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p>Total Supply</p>
            <h3>{{ crypto.tsupply ? formatNumber(crypto.tsupply) : '—' }}</h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p>Max Supply</p>
            <h3>{{ crypto.msupply ? formatNumber(crypto.msupply) : '—' }}</h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p>Change 1h</p>
            <h3 :class="getChangeClass(crypto.percent_change_1h)">
              <ion-icon :icon="crypto.percent_change_1h >= 0 ? 'trending-up' : 'trending-down'"></ion-icon>
              {{ crypto.percent_change_1h }}%
            </h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p>Change 24h</p>
            <h3 :class="getChangeClass(crypto.percent_change_24h)">
              <ion-icon :icon="crypto.percent_change_24h >= 0 ? 'trending-up' : 'trending-down'"></ion-icon>
              {{ crypto.percent_change_24h }}%
            </h3>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <p>Change 7d</p>
            <h3 :class="getChangeClass(crypto.percent_change_7d)">
              <ion-icon :icon="crypto.percent_change_7d >= 0 ? 'trending-up' : 'trending-down'"></ion-icon>
              {{ crypto.percent_change_7d }}%
            </h3>
          </ion-label>
        </ion-item>
      </ion-list>

      <div v-else-if="loading" class="loading-wrap">
        <p>Loading...</p>
      </div>

      <div v-else class="loading-wrap">
        <p>Crypto not found.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import {
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButton,
} from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';

const route = useRoute();
const crypto = ref<any>(null);
const loading = ref(true);

const formatPrice = (price: string) => {
  return parseFloat(price).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatNumber = (num: string | number) => {
  if (num === null || num === undefined || num === '') return '—';
  return parseFloat(num.toString()).toLocaleString('en-US');
};

const getChangeClass = (change: string | number) => {
  return parseFloat(change as any) >= 0 ? 'positive-change' : 'negative-change';
};

onMounted(async () => {
  try {
    const id = route.params.id;
    const response = await axios.get(`https://api.coinlore.net/api/ticker/?id=${id}`);
    crypto.value = (response.data as any[])[0];
    console.log('Crypto detail:', crypto.value);
  } catch (error) {
    console.error('Error fetching crypto detail:', error);
  } finally {
    loading.value = false;
  }
});

// expose icon for template
const arrowBackIcon = arrowBack;

// goBack removed — using router-link on header button instead
</script>

<style scoped>
.positive-change {
  color: #28a745;
}
.negative-change {
  color: #dc3545;
}
ion-item {
  --padding-start: 16px;
}
.loading-wrap {
  padding: 16px;
  text-align: center;
}
</style>