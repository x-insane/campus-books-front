<!-- app.vue -->

<template>
    <!-- Main Framework7 App component where we pass Framework7 params -->
    <f7-app :params="f7params">
        <f7-statusbar></f7-statusbar>
        <!-- initial page is specified in routes.js -->
        <f7-view main :push-state="true" url="/"></f7-view>
    </f7-app>
</template>

<script>
    import routes from './routes.js';

    export default {
        data() {
            return {
                // Framework7 parameters that we pass to <f7-app> component
                f7params: {
                    // Array with app routes
                    routes,
                    // App Name
                    name: '校园二手书交易平台',
                    // App id
                    id: 'com.xinsane.campus_books',
                    // ...
                }
            }
        }
    }
</script>