<template>
    <div id="app">
        <AppNavbar />
        <AppFilter />
        <router-view />
    </div>
</template>

<style>

</style>
<script>
import AppNavbar from "./components/AppNavbar";
import AppFilter from "./components/AppFilter";

export default {

    components: {
        AppNavbar,
        AppFilter
    },
}
</script>