<template>
    <v-card>
        <v-btn color="blue" dark fab fixed right bottom router-link
            :to="{name: 'UserProfile', params:{id: 0}}">
            <v-icon dark>person_add</v-icon>
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
                :items="user_list"
                :search="search"
                >
            <template v-slot:item.name="{ item }">
                <v-flex class="v-list-item--link" @click="viewUser(item.id)">
                    <v-avatar class="mr-2 white--text hidden-xs-only text-uppercase" :class="mycolor(item.name)" size="30">{{user_avatar(item.name)}}</v-avatar>
                    {{item.name}}
                </v-flex>
            </template>
            <template v-slot:item.active="{ item }">
                <v-chip small :color="item.active? 'green' : 'red' " text-color="white">{{item.active? 'Active' : 'Not Active'}}</v-chip>
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
                            <v-list-item @click.stop="viewUser(item.id)" >
                                <v-list-item-title>
                                    Edit User
                                </v-list-item-title>
                                <v-icon>edit</v-icon>
                            </v-list-item>
                            <v-list-item @click.stop="dialog = true, user_id = item.id, user_name= item.name" >
                                <v-list-item-title>
                                    Delete User
                                </v-list-item-title>
                                <v-icon>delete</v-icon>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-flex>
            </template>
        </v-data-table>
        <v-dialog v-model="dialog" max-width="400">
            <v-card>
                <v-card-title class="headline">Delete User</v-card-title>
                <v-card-text>
                    Are you sure you want to delete <span class="font-weight-bold">{{user_name}}</span>?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        color="red darken-1"
                        text
                        @click="deleteUser()"
                    >
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
export default {
    name: 'Users',
    data () {
        return {
            user_list: [],
            search: '',
            user_id: null,
            user_name: '',
            dialog: false,
            headers: [
                {
                    text: 'Name',
                    value: 'name',
                    sortable: true
                },
                {
                    text: 'Status',
                    value: 'active',
                    sortable: true
                },
                {
                    text: 'Email Address',
                    value: 'email',
                    sortable: true
                },
                {
                    text: '',
                    value: 'action',
                    sortable: false
                }
            ]
        }
    },
    created() {
        //load users list
        this.user_list = globalVariable.users_info.users;
    },
    methods:{
        user_avatar(name){
            return name.charAt(0)
        },
        mycolor(name){
            // set color for avatar
            var colors = ['red', 'blue', 'yellow', 'green', 'pink','black', 'deep-purple', 'cyan', 'teal', 'lime', 'orange', 'deep-purple'];
            if (name.length >= colors.length ) {
                return colors[1];
            } else {
                return colors[name.length];
            }           
        },

        viewUser(id) {
            this.$router.push({name: 'UserProfile', params: { id: id  }});
        },

        deleteUser() {
            let index = this.user_list.findIndex(item => item.id == this.user_id); // user's index
            if (index >= 0) {
                this.user_list.splice(index, 1); // delete this user
                    index--;
            }
            this.dialog = false;
        }
    }
}
</script>
