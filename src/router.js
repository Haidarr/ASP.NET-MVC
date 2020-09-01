import Users from './components/users';
import UserProfile from './components/user-profile';
import RoleProfile from './components/role-profile';
import Roles from './components/roles';
import Privileges from './components/privileges';
import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [
    {
        path: '/users',
        component: Users,
        name: 'Users'
    },
    {
        path: '/roles',
        component: Roles,
        name: 'Roles'
    },
    {
        path: '/privileges',
        component: Privileges,
        name: 'Privileges'
    },
    {
        path: '/user-profile/:id',
        component: UserProfile,
        name: 'UserProfile'
    },
    {
        path: '/role-profile/:id',
        component: RoleProfile,
        name: 'RoleProfile'
    }
];

Vue.use(VueRouter);

let router = new VueRouter({
    mode: 'history',
    routes
})

export default router
