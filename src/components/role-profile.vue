<template>
  <v-card>
    <v-toolbar color="white elevation-0">
      <v-btn icon light @click="goBack()">
        <v-icon color="grey darken-2">arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="grey--text text--darken-4">Role Profile</v-toolbar-title>
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
                        Label:
                    </v-flex>
                    <v-flex xs9>
                      {{role_form.label}}
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap class="mb-3">
                    <v-flex xs12 sm3 class="font-weight-bold">
                        Theme:
                    </v-flex>
                    <v-flex xs9>
                        <v-avatar tile :style="'background:' + role_form.color" size="20"></v-avatar>
                        {{role_form.color}}
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap class="mb-3">
                    <v-flex xs12 sm3 class="font-weight-bold">
                        Privileges:
                    </v-flex>
                    <v-flex xs9>
                      <div v-for="item in role_privileges" :key="item.id">
                        <v-chip small color="blue lighten-5 mb-1" text-color="black">  {{item.label}} </v-chip>
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
                    <v-card class="elevation-0">
                      <v-card-text> 
                          <v-text-field
                            v-model="role_form.label"
                            label="Role"
                            :rules="nameRules"
                            required
                          ></v-text-field>

                          <div class="input-group--required mb-2">
                              <label class="v-label black--text">Role Theme</label>
                          </div>  
                            <v-menu offset-y>
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  :color="role_form.color"
                                  dark
                                  v-on="on">
                                  {{role_form.color}}
                                </v-btn>
                              </template>
                              <v-color-picker
                                :value="role_form.color"
                                v-model="role_form.color"
                                hide-canvas 
                                hide-inputs 
                                show-swatches
                                class="mx-auto"
                              ></v-color-picker>
                            </v-menu>
                          <div class="input-group--required mt-5">
                              <label class="v-label black--text">Privileges</label>
                          </div>         
                          <template v-for="item in all_privileges">
                            <v-checkbox v-model="role_form.privileges" 
                              :label="item.label" 
                              :value="item.id"
                              required
                              :key="item.id"
                              :class="checkboxErrors(role_form.privileges)? 'v-input--has-state error--text' : ''"
                              class="mt-0"
                              ></v-checkbox>
                            
                        </template>
                        <div class="v-text-field__details" v-if="checkboxErrors(role_form.privileges)">
                          <div class="v-messages theme--light error--text">
                            <div class="v-messages__wrapper">
                              <div class="v-messages__message">Select at least one Role</div>
                            </div>
                          </div>
                        </div>
            
                      </v-card-text>
                    </v-card>
                  </v-flex>
            </v-layout>
            <v-layout row wrap class="mb-3" >      
              <v-flex class="offset-md3 sm12 md6 pa-4">
                  <v-btn :disabled="!valid" color="success" class="mr-2" @click="saveInfo">
                      Save
                  </v-btn>
                  <v-btn color="default" @click="loadRoleInfo" >
                    Cancel
                  </v-btn>
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
    name: 'RoleProfile',
    data () {
        return {
          disabled: false,
          valid: true,
          tabs: null,
          roles_list: [],
          role_form: null,
          onEdit: false,
          snackbar: false,
          role_privileges: [],
          all_privileges: [],
          role_index: null,
          nameRules: [
            v => !!v || 'Name is required'
          ],
        }
    },
    created() {
      let role_id = this.$route.params.id;
      //load roles list
      const roles_list = globalVariable.users_info.roles;
      
      if(role_id == 0) {
        // role_id = 0, means new role
        this.createRole();
      } 
      else {
        // existing role
        this.loadRoleInfo();
      }
      // call privileges for this role
      this.rolePrivileges();
    },

    methods: {
      goBack() {
        history.back();
      },
      createRole(){
        // load roles list
        const roles_list = globalVariable.users_info.roles;
        var newid;
        if (roles_list.length === 0) {
          newid = 1;
        }
        else {
          // last role id + 1
          var i = roles_list.length - 1;
          var index = roles_list[i].id;
          newid = ++index;
        }
        // newRole object
        let newRole = {
          id: newid,
          label: '',
          color: '#7417BE',
          privileges: []
        }
        // set onEdit to access the form 
        this.onEdit = true;
        // store the newRole in role_form
        this.role_form = newRole;
      },
      loadRoleInfo(){
        let role_id = this.$route.params.id;
        //load roles list
        const roles_list = globalVariable.users_info.roles;

        if(role_id == 0) {
          this.goBack();
        }
        else {
          let index = roles_list.findIndex(item => item.id == role_id); // get role's index from the main roles list 
          let original_role_form = roles_list[index]; // role's object
          this.role_form = JSON.parse(JSON.stringify(original_role_form)); // stringify the data and store it in user_form
          this.role_index = index;
          this.onEdit = false;
          this.rolePrivileges();
        }
      },      
      rolePrivileges(){
        const all_privileges = globalVariable.users_info.privileges;;
        this.all_privileges = all_privileges;

        this.role_privileges=[];
        let role_privileges = this.role_form.privileges;
     
        let item;
        for(var i = 0; i < role_privileges.length; i++) {
          item = all_privileges.filter(item => item.id == role_privileges[i]); // filter main privileges list, match it with role's privileges
          this.role_privileges.push(item[0]); // push privilege's details in to role_privileges
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
        const roleList = globalVariable.users_info.roles;
        this.rolePrivileges();

        if (this.$refs.form.validate()) { // form validated 
          if (this.$route.params.id == 0) {
            roleList.push(this.role_form);
          } else {
            roleList[this.role_index] = this.role_form; // save changes to the main roles list
          }
          this.snackbar = true; // show snackbar
          this.onEdit = false; // hide form
        }
      }
    },
    
}
</script>
