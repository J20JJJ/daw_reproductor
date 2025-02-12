import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useHistoryStore = defineStore('historyStore', () => {
    const history = ref([]);

    const addToHistory = (song) => {
        history.value.unshift(song);
        // if (history.value.length > 10) history.value.pop();
    };

    return { history, addToHistory };
});
