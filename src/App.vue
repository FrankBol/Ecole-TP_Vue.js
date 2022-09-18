<template>
<nav class="navbar navbar-expand-lg navbar-light bg-secondary">
  <a class="navbar-brand mx-5 text-white" href="#">TP-Vue.js</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name: 'home' }">Accueil</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/add">Ajout Sites</router-link>
      </li>
    </ul>
  </div>
</nav>
  <router-view></router-view>
</template>

<script>

export default {
name: 'App',
components: {

  }
}
</script>

<style>
.nav-link {
  color: white!important;
}
.router-link-exact-active {
  color: rgb(214, 205, 205)!important;
}
</style>