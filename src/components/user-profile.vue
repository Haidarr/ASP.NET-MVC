<template>
  <v-card>
    <v-toolbar color="white elevation-0">
      <v-btn icon light @click="goBack()">
        <v-icon color="grey darken-2">arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="grey--text text--darken-4">User Profile</v-toolbar-title>
      <template v-slot:extension v-if="onEdit">
        <v-tabs
          v-model="tabs"
          centered
          icons-and-text
          height="70"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#mobile-tabs-5-1">
            Profile
            <v-icon>person</v-icon>
          </v-tab>
          <v-tab href="#mobile-tabs-5-2">
            Roles
            <v-icon>assignment_ind</v-icon>
          </v-tab>
        </v-tabs>
      </template>
      <v-btn
        color="pink" dark absolute bottom right
        small fab v-if="!onEdit" @click="onEdit = true">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="pt-3">
      <template  v-if="!onEdit">
        <v-card-text>
          <v-container fluid grid-list-sm>
            <v-layout row wrap>
              <v-flex offset-md3 sm12 md6>
                <v-layout row wrap class="mb-3">
                  
                  <v-flex xs12 sm3 class="font-weight-bold">
                      Full Name:
                  </v-flex>
                  <v-flex xs9>
                    {{user_form.name}}
                  </v-flex>
                </v-layout>
                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm3 class="font-weight-bold">
                      Email:
                  </v-flex>
                  <v-flex xs9>
                      {{user_form.email}}
                  </v-flex>
                </v-layout>
                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm3 class="font-weight-bold">
                      About:
                  </v-flex>
                  <v-flex xs9>
                      {{user_form.about}}
                  </v-flex>
                </v-layout>
                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm3 class="font-weight-bold">
                      Registered On:
                  </v-flex>

                  <v-flex xs9>
                      {{user_form.registered_on}}
                  </v-flex>
                </v-layout>
                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm3 class="font-weight-bold">
                      Satus:
                  </v-flex>
                  <v-flex xs9>
                    <v-chip small class="mb-1" :color="user_form.active? 'green' : 'red' " text-color="white">{{user_form.active? 'Active' : 'Not Active'}}</v-chip>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm3 class="font-weight-bold">
                      Roles:
                  </v-flex>
                  <v-flex xs9>
                    <div v-for="item in user_roles" :key="item.id">
                      <v-chip small class="mb-1" color="blue lighten-5" text-color="black">  {{item.label}} </v-chip>
                    </div>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </template>
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          v-if="onEdit"
          class="pb-5">
        <v-container fluid grid-list-sm>
          <v-layout row wrap class="mb-3" >
            <v-flex offset-md3 sm12 md6>
              <v-tabs-items v-model="tabs" class="transparent elevation-0" >
                <v-tab-item
                  value="mobile-tabs-5-1"
                >
                  <v-card class="elevation-0">
                    <v-card-text>  
                    
                        <v-text-field
                          v-model="user_form.name"
                          :rules="nameRules"
                          label="Full Name"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="user_form.email"
                          :rules="emailRules"
                          label="E-mail"
                          required
                        ></v-text-field>
                        <v-textarea v-model="user_form.about">
                          <template v-slot:label>
                            <div>
                              About <small>(optional)</small>
                            </div>
                          </template>
                        </v-textarea>
                        <v-switch class="mt-0" v-model="user_form.active">
                          <template v-slot:label>
                              <v-chip small :color="user_form.active? 'green' : 'red' " text-color="white">{{user_form.active? 'Active' : 'Not Active'}}</v-chip>
                          </template>
                        </v-switch>
                        <span class="font-weight-bold"> Registered On:</span> {{user_form.registered_on}}
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item value="mobile-tabs-5-2">
                  <v-card class="elevation-0">
                    <v-card-text> 
                        <template v-for="item in all_roles">
                          <v-checkbox v-model="user_form.role" 
                            :label="item.label" 
                            :value="item.id"
                            required
                            :key="item.id"
                            :class="checkboxErrors(user_form.role)? 'v-input--has-state error--text' : ''"
                            class="mt-0"
                            ></v-checkbox>
                          
                      </template>
                      <div class="v-text-field__details" v-if="checkboxErrors(user_form.role)">
                        <div class="v-messages theme--light error--text">
                          <div class="v-messages__wrapper">
                            <div class="v-messages__message">Select at least one Role</div>
                          </div>
                        </div>
                      </div>
          
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
              <v-flex class="pa-4">
                  <v-btn :disabled="!valid" color="success" @click="saveInfo" class="mr-2">
                    Save
                  </v-btn>
                  <v-btn color="default" @click="loadUserInfo">
                    Cancel
                  </v-btn>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </div>
    <v-snackbar v-model="snackbar">
        Changes saved
        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false">
            Close
          </v-btn>
        </template>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: 'UserProfile',
  data () {
    return {
      valid: true,
      tabs: null,
      user_list: [],
      user_form: null, 
      onEdit: false,
      snackbar: false,
      user_roles: [],
      all_roles: [],
      user_index: null,
      nameRules: [
        v => !!v || 'Name is required'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  created() {
    // get user's ID
    let user_id = this.$route.params.id;
    //load user list
    const user_list = globalVariable.users_info.users;
    
    if(user_id == 0) {
      // user_id = 0, means new user
      this.createUser();
    } 
    else {
      // existing user 
      this.loadUserInfo();
    }
    // call roles for this user
    this.userRoles();
  },
  methods: {
    goBack() {
      history.back();
    },
    createUser(){
      // load users list
      const user_list = globalVariable.users_info.users;
      var newid;
      var date = this.$moment().format('MMMM Do YYYY, h:mm:ss a'); // today's date
      if (user_list.length === 0) {
        newid = 1;
      }
      else {
        // last user id + 1
        var i = user_list.length - 1;
        var index = user_list[i].id;
        newid = ++index;
      }
      // newUser object
      let newUser = {
        id: newid,
        name: '',
        active: true,
        email: '',
        about: '',
        registered_on: date,
        role: []
      }
      // set onEdit to access the form 
      this.onEdit = true;
      // store the newUser in user_form
      this.user_form = newUser;
    },
    loadUserInfo(){
      this.onEdit = false;
      let user_id = this.$route.params.id;
      //load user list
      const user_list = globalVariable.users_info.users;
      if(user_id == 0) {
        this.goBack();
      }
      else {
        let index = user_list.findIndex(item => item.id == user_id); // get user's index from the main users list 
        let original_user_form = user_list[index]; // user's object
        this.user_form = JSON.parse(JSON.stringify(original_user_form)); // stringify the data and store it in user_form
        this.user_index = index;
        this.userRoles();
      }      
    },
    userRoles(){
      const all_roles = globalVariable.users_info.roles;
      this.all_roles = all_roles;

      this.user_roles=[]; 
      let user_roles = this.user_form.role; 
    
      let item;
      for(var i = 0; i < user_roles.length; i++) {
        item = all_roles.filter(item => item.id == user_roles[i]); // filter main roles list, match it with user's roles
        this.user_roles.push(item[0]); // push role's details in to user_roles
      }
    },
    checkboxErrors(role){
      if(role.length == 0){
        this.valid = false;
        return true;
      }
      return false;
    },
    saveInfo(){
      const userList = globalVariable.users_info.users;
      this.userRoles();
      if (this.$refs.form.validate()) { // form validated 
        if (this.$route.params.id == 0) {
        userList.push(this.user_form);
        } else {
          userList[this.user_index] = this.user_form; // save changes to the main users list
        }
        this.snackbar = true; // show snackbar
        this.onEdit = false; // hide form
      }
    }
  }
}
</script>
