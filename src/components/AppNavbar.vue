<template>
    <div>
        <b-navbar
            toggleable="lg"
            type="dark"
            variant="dark">
            <b-collapse
                class="flex-xl-row justify-content-center"
                id="nav-collapse"
                is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/">All</b-nav-item>
                    <b-nav-item to="/table">Table</b-nav-item>
                    <b-nav-item to="/chart">Chart</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: "AppNavbar"
}
</script>

<style scoped>

</style>