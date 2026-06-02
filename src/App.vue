<script setup>
import { ref, computed } from 'vue'
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
  <component :is="'script'" src="https://cdn.tailwindcss.com"></component>

  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased p-4 sm:p-8">
    <div class="max-w-6xl mx-auto">
      
      <header class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-950 tracking-tight">Panel Statystyk Operacyjnych</h1>
          <p class="text-sm text-gray-500 mt-1">Automatyczny raport dzienny z Google BigQuery</p>
        </div>
        
        <div class="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-200">
          <label class="text-sm font-semibold text-gray-600 uppercase tracking-wider">Region:</label>
          <select 
            v-model="wybraneMiasto" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 font-medium min-w-[140px] cursor-pointer transition-colors hover:bg-gray-100"
          >
            <option v-for="m in miasta" :key="m" :value="m">{{ m }}</option>
          </select>
        </div>
      </header>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" class="px-6 py-4 font-semibold text-gray-600">Data</th>
                <th scope="col" class="px-6 py-4 font-semibold text-gray-600">Miasto</th>
                <th scope="col" class="px-6 py-4 font-semibold text-gray-600 text-right">Efektywność</th>
                <th scope="col" class="px-6 py-4 font-semibold text-gray-600 text-right">PTOD</th>
                <th scope="col" class="px-6 py-4 font-semibold text-gray-600 text-right">Forecast Error</th>
                <th scope="col" class="px-6 py-4 font-semibold text-gray-600 text-right">Ilość zamówień</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr 
                v-for="(row, index) in przefiltrowaneDane" 
                :key="index" 
                class="hover:bg-gray-50/70 transition-colors"
              >
                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ row.data }}</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                    {{ row.miasto }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right font-semibold text-gray-900">{{ row.efektywnosc }}%</td>
                <td class="px-6 py-4 text-right text-gray-600">{{ row.ptod }}h</td>
                <td class="px-6 py-4 text-right">
                  <span :class="row.forecast_error > 5 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'">
                    {{ row.forecast_error }}%
                  </span>
                </td>
                <td class="px-6 py-4 text-right font-bold text-gray-900">
                  {{ Number(row.ilosc_zamowien).toLocaleString('pl-PL') }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-if="przefiltrowaneDane.length === 0" class="text-center py-12 text-gray-500 font-medium">
          Brak danych do wyświetlenia dla wybranego filtra.
        </div>
      </div>

    </div>
  </div>
</template>
