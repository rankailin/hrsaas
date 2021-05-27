import router from './router'
import store from '@/store'
const whitePage = ['/login', '/404']
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    to.path === '/login'.toLowerCase() ? next('/') : next()
  } else {
    whitePage.includes(to.path.toLowerCase()) ? next() : next('/login')
    // if (whitePage.includes(to.path.toLowerCase())) {
    //   next()
    // } else {
    //   next('/login')
    // }
  }
})

router.afterEach(() => {

})
