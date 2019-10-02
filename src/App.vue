<template>
  <div>
    <keep-alive>
      <nav-component />
    </keep-alive>
    <keep-alive>
      <header-component />
    </keep-alive>
    <router-view />
  </div>
</template>
