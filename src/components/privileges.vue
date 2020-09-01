<template>
    <v-card>
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
            :items="user_privileges"
            :search="search"
            >            
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    name: 'Privileges',
    data () {
        return {
            user_privileges: [],
            search: '',
            headers: [
                {
                    text: 'Name',
                    value: 'label',
                    sortable: true,
                    width: 100
                },
                {
                    text: 'Description',
                    value: 'description',
                    sortable: true,
                    width: 100
                }
            ]
        }
    },
    created() {
        //load privileges list
        this.user_privileges = globalVariable.users_info.privileges;
    }
}
</script>
