<template>
  <ion-item :routerLink="'/crypto/' + crypto.id" :detail="false">
    <div slot="start" class="rank-number">
      <h1>{{ crypto.rank }}</h1>
    </div>
    <ion-label>
      <h2>{{ crypto.name }}</h2>
      <h3>{{ crypto.symbol }}</h3>
      <p>USD {{ parseFloat(crypto.price_usd).toFixed(2) }}</p>
    </ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue';

interface Crypto {
  id: string;
  rank: string;
  name: string;
  symbol: string;
  price_usd: string;
}

defineProps<{ crypto: Crypto }>();
</script>

<style scoped>
.rank-number {
  min-width: 50px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
.rank-number h1 {
  margin: 0;
  font-size: 28px;
}
</style>