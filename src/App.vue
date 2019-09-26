<template>
  <div>
    <keep-alive>
      <nav-component />
    </keep-alive>
    <keep-alive>
      <header-component />
    </keep-alive>


    <div id="nav" class="text-center">
      <router-link to="/">
        Home
      </router-link> |
      <router-link to="/about">
        About
      </router-link>
    </div>
    <router-view />
  </div>
</template>
