<template>
    <div>
      <h1>Lista de Sonidos</h1>
      
      <ul>
        <li v-for="sound in sounds" :key="sound.id">
          {{ sound.name }}
        </li>
      </ul>
  
      <div ref="loadMoreTrigger" class="observer"></div>
  
      <p v-if="loading">Cargando más sonidos...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick } from "vue";
  import soundService from "@/services/soundService";
  
  const sounds = ref([]);
  const page = ref(1);
  const loading = ref(false);
  const searchQuery = ref("nature");
  const loadMoreTrigger = ref(null);
  
  const loadSounds = async () => {
    if (loading.value) return;
    loading.value = true;
  
    const response = await soundService.getSounds(searchQuery.value, page.value);
  
    if (response?.results) {
      sounds.value = [...sounds.value, ...response.results];
      page.value++;
    }
    
    loading.value = false;
  };
  
  const setupObserver = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadSounds();
        }
      },
      { rootMargin: "100px" }
    );
    if (loadMoreTrigger.value) {
      observer.observe(loadMoreTrigger.value);
    }
  };
  
  onMounted(async () => {
    await loadSounds();
    nextTick(() => setupObserver());
  });
  </script>
  
  <style>
  .observer {
    height: 20px;
  }
  </style>
  