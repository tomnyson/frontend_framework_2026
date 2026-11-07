<script setup>
const props = defineProps({
    mota: {
        type: String,
        required: true
    }
})
</script>

<template>
    <p>{{ mota }}</p>
</template>

<style scoped>
</style>