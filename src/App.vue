<script setup>
import { ref, computed } from 'vue'
// Importujemy przygotowany plik JSON
import daneSklepu from './assets/dane.json'

const dane = ref(daneSklepu)
const wybraneMiasto = ref('Wszystkie')

// Wyciągamy unikalne miasta do menu filtrowania
const miasta = computed(() => {
  return ['Wszystkie', ...new Set(dane.value.map(item => item.miasto))]
})

// Filtrujemy dane "w locie" na podstawie wybranego miasta
const przefiltrowaneDane = computed(() => {
  if (wybraneMiasto.value === 'Wszystkie') return dane.value
  return dane.value.filter(item => item.miasto === wybraneMiasto.value)
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Panel Statystyk</h1>
    
    <div class="mb-4">
      <label class="mr-2 font-medium">Filtruj po mieście:</label>
      <select v-model="wybraneMiasto" class="border p-1 rounded">
        <option v-for="m in miasta" :key="m" :value="m">{{ m }}</option>
      </select>
    </div>

    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">Data</th>
          <th class="border p-2">Miasto</th>
          <th class="border p-2">Efektywność</th>
          <th class="border p-2">PTOD</th>
          <th class="border p-2">Forecast Error</th>
          <th class="border p-2">Ilość zamówień</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in przefiltrowaneDane" :key="index" class="text-center hover:bg-gray-50">
          <td class="border p-2">{{ row.data }}</td>
          <td class="border p-2">{{ row.miasto }}</td>
          <td class="border p-2">{{ row.efektywnosc }}%</td>
          <td class="border p-2">{{ row.ptod }}h</td>
          <td class="border p-2 text-red-600">{{ row.forecast_error }}%</td>
          <td class="border p-2 font-semibold">{{ row.ilosc_zamowien }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
