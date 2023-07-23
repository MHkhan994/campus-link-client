import { createBrowserRouter } from "react-router-dom";
import Register from '../pages/Register/Register';
import Admission from '../pages/Admission/Admission.jsx';
import ApplyPage from '../pages/Admission/ApplyPage.jsx';
import PrivateRoute from '../routes/PrivateRoute';
import College from '../pages/Colleges/College.jsx';
import Login from '../pages/Login/Login.jsx';
import Home from '../pages/Home/Home.jsx';
import Colleges from '../pages/Colleges/Colleges.jsx';
import App from '../App'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/colleges',
                element: <Colleges></Colleges>
            },
            {
                path: '/college/:id',
                element: <PrivateRoute><College></College></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/admission',
                element: <Admission></Admission>
            },
            {
                path: 'apply/:id',
                element: <PrivateRoute><ApplyPage></ApplyPage></PrivateRoute>
            }
        ]
    },
]);