<template>
    <button @click="goBack">Revenir</button>
    <h1>Oupss...... Page non trouvé</h1>
</template>

<script>
export default {
    methods:{
        goBack(){
            this.$router.back()
        }
    }
}
</script>


<style scoped>
div{
    text-align: center;
    margin-top: 200px
}
h1 {
    font-size: 7em
}
</style>