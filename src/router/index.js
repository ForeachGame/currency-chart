import Vue from "vue";
import VueRouter from "vue-router";
import All from "../views/All";
import Table from "../views/Table";
import Chart from "../views/Chart";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "All",
        component: All
    },
    {
        path: "/table",
        name: "Table",
        component: Table,
    },
    {
        path: "/chart",
        name: "Chart",
        component: Chart
    },
];

const router = new VueRouter({
    routes
});

export default router;
