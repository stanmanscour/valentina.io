import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store/store';

import About from './components/About.vue';
import Main from './components/Main.vue';
import Login from './components/Login.vue';
import Signup from './components/Signup.vue';
import Explorer from './components/Explorer.vue';
import Library from './components/Library.vue';
import Account from './components/Account.vue';

Vue.use(VueRouter);

export const routes = [{
    path: '',
    component: Main,
    children: [{
        path: 'explorer',
        component: Explorer,
        beforeEnter(to, from, next) {
            if (!store.getters['user/isAuthenticated']) {
                next('/login');
            } else {
                next();
            }
        }
    }, {
        path: 'library',
        component: Library
    }, {
        path: 'account',
        component: Account
    }]
}, {
    path: '/about',
    component: About
}, {
    path: '/login',
    component: Login
}, {
    path: '/signup',
    component: Signup
}];

export default new VueRouter({
    routes,
    //mode: 'history'
});