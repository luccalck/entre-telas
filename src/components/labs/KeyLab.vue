<script setup lang="ts">
import { ref } from 'vue'
const stable = ref(true)
const animals = ref([
  { id: 1, name: 'Luna' },
  { id: 2, name: 'Bento' },
  { id: 3, name: 'Nina' },
])
const generation = ref(0)
function reset() {
  animals.value = [
    { id: 1, name: 'Luna' },
    { id: 2, name: 'Bento' },
    { id: 3, name: 'Nina' },
  ]
  generation.value += 1
}
</script>

<template>
  <div class="lab-shell">
    <h3>O texto pertence a quem?</h3>
    <p>
      Digite uma anotacao no campo de Bento e remova Luna. Compare os modos. Estes campos guardam o
      valor no DOM de proposito, para tornar a diferenca observavel.
    </p>
    <label class="check-control"
      ><input v-model="stable" type="checkbox" @change="reset" /> Usar id estavel como key
      (desmarque para usar a posicao)</label
    >
    <div :key="generation" class="animal-list">
      <label v-for="(animal, index) in animals" :key="stable ? animal.id : index"
        >{{ animal.name
        }}<input type="text" :aria-label="'Anotacao de ' + animal.name" placeholder="Escreva aqui"
      /></label>
    </div>
    <div class="preset-buttons">
      <button class="button" :disabled="animals.length < 2" @click="animals.shift()">
        Remover primeiro animal</button
      ><button class="button secondary" @click="reset">Reiniciar lista</button>
    </div>
    <p class="notice">
      O modo por posicao reproduz a reutilizacao indevida de elementos. No projeto real, use o id
      estavel. O reset limpa os campos ao trocar o modo.
    </p>
  </div>
</template>
