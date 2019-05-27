import HomePage from './pages/home-page';
import BookDetailPage from './pages/book-detail-page';
import ShoppingCartPage from './pages/shopping-cart-page';
import OrderListPage from './pages/order-list-page';
import OrderDetailPage from './pages/order-detail-page';
import UserCenterPage from './pages/user-center-page';
import LoginPage from './pages/login-page';
import AgentApplyPage from './pages/agent-apply-page';
import UploadBookPage from './pages/upload-book-page';
import UploadBookList from './pages/upload-book-list';
import UploadBookPayPage from './pages/upload-book-pay-page';
import UploadBookDetailPage from './pages/upload-book-detail-page';

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
    {
        path: '/agent/apply',
        component: AgentApplyPage
    },
    {
        path: '/books/upload',
        component: UploadBookPage
    },
    {
        path: '/books/upload/list',
        component: UploadBookList
    },
    {
        path: '/books/upload/pay/:upload_id',
        component: UploadBookPayPage
    },
    {
        path: '/books/upload/detail/:upload_id',
        component: UploadBookDetailPage
    }
]