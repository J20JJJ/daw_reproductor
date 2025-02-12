<template>
    <div class="history-container">
        <h3>Historial de Canciones</h3>
        <div v-if="history.length === 0">No hay canciones en el historial</div>
        <div v-else>
            <div v-for="(song, index) in history" :key="index" class="history-item">
                <img :src="song.img" alt="song image" class="song-image">
                <div class="song-info">
                    <span>{{ song.name }}</span>
                </div>
                <i class="bi bi-play-circle btn-song-play btn-song-play-historial" @click="playSong(song)"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useHistoryStore } from '@/stores/historial';
import { useSoundDataStore } from '@/stores/soundData';

const historyStore = useHistoryStore();
const history = historyStore.history;
const soundDataStore = useSoundDataStore();


const playSong = (song) => {
    soundDataStore.soundName = song.name;
    soundDataStore.soundImg = song.img;
    soundDataStore.soundUrl = song.url;
};
</script>

<style scoped>

</style>
