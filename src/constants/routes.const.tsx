import { lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom';
import { Suspense } from '@components';

const Login = lazy(() => import('../views/auth/login/login.view'));
const Home = lazy(() => import('../views/home/home.view'));
const Dashboard = lazy(() => import('../views/home/dashboard/dashboard.view'));
const PropertyId = lazy(() => import('../views/home/property-id/property-id.view'));
const MyPropertiesList = lazy(() => import('../views/home/my-properties/list/my-properties-list.view'));
const MyPropertyDetails = lazy(() => import('../views/home/my-properties/details/my-property-details.view'));
const MyPropertiesExpenses = lazy(() => import('../views/home/my-properties/details/tabs/expenses/expenses.view'));
const MyPropertiesKpis = lazy(() => import('../views/home/my-properties/details/tabs/my-property-kpis.view'));
const MyDocuments = lazy(() => import('../views/home/my-documents.view'));

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Outlet />}>
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home>{Suspense(<Outlet />)}</Home>}>
                <Route path="dashboard" element={<Dashboard />} index />
                <Route path="property-id" element={<PropertyId />} />
                <Route path="my-properties" element={<MyPropertiesList />} />
                <Route path="my-properties/:propertyId" element={<MyPropertyDetails />}>
                    <Route path="expenses" element={<MyPropertiesExpenses />} index />
                    <Route path="kpis" element={<MyPropertiesKpis />} />
                </Route>
                <Route path="my-documents" element={<MyDocuments />} index />
            </Route>
        </Route>,
    ),
);
