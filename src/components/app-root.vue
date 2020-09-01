<template>
    <div id="app">
        <v-app>
            <nav-menu ref="navMenu"></nav-menu>

                <v-main fluid>
                    <keep-alive include="userProfile">
                        <router-view> 
                        </router-view>
                    </keep-alive>
                </v-main>

        </v-app>
    </div>
</template>

<script>
import NavMenu from "./nav-menu";
import {api_data} from '../lib/variables';
export default {
    components: {
        "nav-menu": NavMenu,
    },
    created(){
        window.globalVariable = {
            users_info: api_data
         };
        this.redirecttoHome();
    },
    methods: {
        redirecttoHome(){
            this.$router.push({ name: "Users"}).catch(()=>{});
        }
    },
};
</script>
