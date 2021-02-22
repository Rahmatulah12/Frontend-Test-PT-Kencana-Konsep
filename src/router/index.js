import Vue from 'vue';
import VueRouter from 'vue-router';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(VueRouter);
Nprogress.configure({ easing: 'ease', speed: 800 });

const routes = [

  { // Auth Login & Registration
    path: '/',
    redirect: '/login',
    name: 'Authentication',
    component: () => import('../components/Auth.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/auths/Login.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem('token') != null)
          {
            next({name: "Student"});
          }
          next();
        }
      },
      {
        path: 'registration',
        name: 'Registration',
        component: () => import('../views/auths/Registration.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem('token') != null)
          {
            next({name: "Student"});
          }
          next();
        }
      },
    ],
  },

  { // Student
    path: '/',
    redirect: '/student',
    name: 'Main',
    component: () => import('../components/Main.vue'),
    children: [

      {
        path: 'student',
        name: 'Student',
        component: () => import('../views/students/Index.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem('token') == null)
          {
            next({name: "Login"});
          }
          next();
        }
      },

      {
        path: 'add-student',
        name: 'Add Student',
        component: () => import('../views/students/Form.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem('token') == null)
          {
            next({name: "Login"});
          }
          next();
        }
      },

      {
        path: 'edit-student/:id',
        name: 'Edit Student',
        component: () => import('../views/students/Form.vue'),
        beforeEnter: (to, from, next) => {
          if(localStorage.getItem('token') == null)
          {
            next({name: "Login"});
          }
          next();
        }
      },

    ],
  },

  {
    path: '*',
    name: '404 Error',
    component: () => import('../views/404.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  Nprogress.start();
  next();
});

router.afterEach((to, from, next) => {
  Nprogress.done();
});

export default router
