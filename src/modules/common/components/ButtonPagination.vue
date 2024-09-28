<template>


    <div class="flex justify-center py-10 bg-gray-10 space-x-3">

        <!-- :disabled="isFirstPage" -->
        <button
            :disabled="page === 1"
            @click="$router.push({ query: { page: page - 1 }})"
            class="flex items-center space-x-1.5 px-4 py-1.5 text-white rounded-lg bg-blue-500 disabled:bg-gray-100 hover:bg-blue-600 transition-all">
            <arrow-left-icon></arrow-left-icon>
            <span>Anteriores</span>
        </button>
        <button
            :disabled="hasMoreData"
            @click="$router.push({ query: { page: page + 1 }})"
            class="flex items-center space-x-1.5 px-4 py-1.5 text-white rounded-lg bg-blue-500 disabled:bg-gray-100 hover:bg-blue-600 transition-all">
            <span>Siguientes</span>
            <arrow-right-icon></arrow-right-icon>
        </button>

    </div>
</template>


<script lang="ts" setup>
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue';
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue';



interface Props {
    page: number;
    // isFirstPage: boolean;
    hasMoreData: boolean;
}


defineProps<Props>();




</script>