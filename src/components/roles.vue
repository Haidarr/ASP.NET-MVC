<template>
    <v-card>
        <v-btn color="blue" dark fab fixed right bottom router-link
            :to="{name: 'RoleProfile', params:{id: 0}}">
            <v-icon dark>add</v-icon>
        </v-btn>
        <v-toolbar color="white elevation-0">
            <v-toolbar-title class="grey--text text--darken-4">{{$route.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            ></v-text-field>
        </v-toolbar>

        <v-data-table
            :headers="headers"
            :items="user_roles"
            :search="search">
            <template v-slot:item.label="{ item }">
                <v-flex class="v-list-item--link" @click="viewRole(item.id)">
                    <v-avatar class="mr-2 white--text hidden-xs-only text-uppercase" :style="'background:' + item.color" size="30">{{user_avatar(item.label)}}</v-avatar>
                    {{item.label}}
                </v-flex>
            </template>
            <template v-slot:item.action ="{ item }">
                <v-flex class="text-right">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                icon
                                v-on="on">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click.stop="viewRole(item.id)" >
                                <v-list-item-title class="mr-2">
                                    Edit Role
                                </v-list-item-title>
                                <v-icon>edit</v-icon>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-flex>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    name: 'Roles',
    data () {
        return {
            user_roles: [],
            search: '',
            headers: [
                {
                    text: 'Name',
                    value: 'label',
                    sortable: true
                },
                {
                    text: '',
                    value: 'action',
                    sortable: false,
                    width: '20'
                }
            ]
        }
    },
    created() {
        //load roles list
        this.user_roles = globalVariable.users_info.roles;
    },
    methods: {
        user_avatar(name){
            return name.charAt(0)
        },
        viewRole(id) {
            this.$router.push({name: 'RoleProfile', params: { id: id  }});
        },
    }
}
</script>
