import HomePage from './pages/home-page';
import BookDetailPage from './pages/book-detail-page';
import ShoppingCartPage from './pages/shopping-cart-page';
import OrderListPage from './pages/order-list-page';
import OrderDetailPage from './pages/order-detail-page';
import UserCenterPage from './pages/user-center-page';
import LoginPage from './pages/login-page';

export default [
    {
        path: '/user/login',
        component: LoginPage
    },
    {
        path: '/user',
        component: UserCenterPage
    },

    {
        path: '/',
        component: HomePage
    },
    {
        path: '/detail/:book_id',
        component: BookDetailPage
    },
    {
        path: '/shopping-cart',
        component: ShoppingCartPage
    },
    {
        path: '/orders',
        component: OrderListPage
    },
    {
        path: '/order/:order_id',
        component: OrderDetailPage
    },
]