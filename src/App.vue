<script setup>
import { ref, computed } from 'vue'
import daneSklepu from './assets/dane.json'

const dane = ref(daneSklepu)

// Nawigacja: 'home' lub 'miasta'
const aktualnaZakladka = ref('home')

// Wybrane miasto (null oznacza, że jesteśmy w widoku kafelków)
const wybraneMiasto = ref(null)

// Wyciągamy unikalne miasta do wygenerowania kafelków (bez 'Wszystkie')
const listaMiast = computed(() => {
  return [...new Set(dane.value.map(item => item.miasto))]
})

// Filtrujemy dane dla konkretnego, klikniętego miasta
const daneDlaMiasta = computed(() => {
  if (!wybraneMiasto.value) return []
  return dane.value.filter(item => item.miasto === wybraneMiasto.value)
})

// Wyliczamy globalne statystyki na stronę główną (Home)
const ogolnaIloscZamowien = computed(() => {
  return dane.value.reduce((sum, item) => sum + item.ilosc_zamowien, 0)
})

const sredniaEfektywnosc = computed(() => {
  const sum = dane.value.reduce((sum, item) => sum + item.efektywnosc, 0)
  return (sum / dane.value.length).toFixed(1)
})
</script>

<template>
  <component :is="'script'" src="https://cdn.tailwindcss.com"></component>

  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
    
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 sm:px-8 flex h-16 items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">📊 DataCore</span>
        </div>
        
        <div class="flex gap-1">
          <button 
            @click="aktualnaZakladka = 'home'"
            :class="aktualnaZakladka === 'home' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-100 font-medium'"
            class="px-4 py-2 rounded-xl text-sm transition-all"
          >
            Home
          </button>
          <button 
            @click="aktualnaZakladka = 'miasta'; wybraneMiasto = null"
            :class="aktualnaZakladka === 'miasta' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-100 font-medium'"
            class="px-4 py-2 rounded-xl text-sm transition-all"
          >
            Wyniki miast
          </button>
        </div>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto px-4 sm:px-8 py-8">
      
      <div v-if="aktualnaZakladka === 'home'" class="space-y-6">
        <div class="bg-gradient-to-r from-gray-900 to-indigo-950 p-8 rounded-3xl text-white shadow-lg">
          <h2 class="text-3xl font-extrabold mb-2">Witaj w Panelu Analitycznym</h2>
          <p class="text-indigo-200 text-sm max-w-xl">Dane są automatycznie synchronizowane z Google BigQuery raz na dobę. Wybierz zakładkę "Wyniki miast", aby wejść w szczegóły regionalne.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Łączny Wolumen Zamówień</p>
            <p class="text-3xl font-black text-gray-900 mt-2">{{ ogolnaIloscZamowien.toLocaleString('pl-PL') }}</p>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Średnia Efektywność Sieci</p>
            <p class="text-3xl font-black text-blue-600 mt-2">{{ sredniaEfektywnosc }}%</p>
          </div>
        </div>
      </div>

      <div v-if="aktualnaZakladka === 'miasta'">
        
        <div v-if="!wybraneMiasto">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Wybierz miasto, aby zobaczyć szczegóły</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div 
              v-for="miasto in listaMiast" 
              :key="miasto"
              @click="wybraneMiasto = miasto"
              class="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400 cursor-pointer transition-all group flex flex-col justify-between h-40"
            >
              <span class="text-2xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">{{ miasto }}</span>
              <div class="flex items-center text-sm font-semibold text-blue-600 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Zobacz raport ➔
              </div>
            </div>

          </div>
        </div>

        <div v-else class="space-y-6">
          <button 
            @click="wybraneMiasto = null"
            class="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm transition-colors"
          >
            ⬅ Powrót do wyboru miast
          </button>

          <div class="flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 class="text-2xl font-black text-gray-950">Raport szczegółowy: <span class="text-blue-600">{{ wybraneMiasto }}</span></h2>
          </div>

          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th scope="col" class="px-6 py-4 font-semibold text-gray-600">Data</th>
                    <th scope="col" class="px-6 py-4 font-semibold text-gray-600 text-right">Efektywność</th>
                    <th scope="col" class="px-6 py-4 font-semibold text-gray-600 text-right">PTOD</th>
                    <th scope="col" class="px-6 py-4 font-semibold text-gray-600 text-right">Forecast Error</th>
                    <th scope="col" class="px-6 py-4 font-semibold text-gray-600 text-right">Ilość zamówień</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="(row, index) in daneDlaMiasta" :key="index" class="hover:bg-gray-50/70 transition-colors">
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ row.data }}</td>
                    <td class="px-6 py-4 text-right font-semibold text-gray-900">{{ row.efektywnosc }}%</td>
                    <td class="px-6 py-4 text-right text-gray-600">{{ row.ptod }}h</td>
                    <td class="px-6 py-4 text-right">
                      <span :class="row.forecast_error > 5 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'">
                        {{ row.forecast_error }}%
                      </span>
                    </td>
                    <td class="px-6 py-4 text-right font-bold text-gray-900">{{ row.ilosc_zamowien.toLocaleString('pl-PL') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>
