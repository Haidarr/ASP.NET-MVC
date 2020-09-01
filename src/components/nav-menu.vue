<template>
    <div>
        <v-toolbar color="blue-grey lighten-5">
                <span class="hidden-md-and-down" :class="drawer? 'drawer-spacing' : ''"></span>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                    <v-toolbar-title> 
                    <v-icon  class="pink--text mr-1 mb-1">business_center</v-icon> 
                    <span class="pink--text">My</span><span class="blue-grey--text text--darken-2">Project</span>
                    </v-toolbar-title>
        </v-toolbar>
        
            <v-navigation-drawer 
                app
                absolute
                v-model="drawer"           
            >
                <v-list shaped>
                    <v-list-item-group color="primary">
                        <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                            :to="{name: item.route}"
                            v-ripple
                        >
                            <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tabs: 'Users',
            drawer: null,
            items: [
                { text: 'Users', route: 'Users', icon: 'group' },
                { text: 'User Roles', route: 'Roles', icon: 'assignment_ind' },
                { text: 'Privileges', route: 'Privileges', icon: 'verified_user' }
            ]
        };
    }
}
</script>

