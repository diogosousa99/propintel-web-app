import { lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom';
import { Suspense } from '../components/suspense.component';

const Login = lazy(() => import('../views/auth/login/login.view'));
const Register = lazy(() => import('../views/auth/register/register.view'));
const Home = lazy(() => import('../views/home/home.view'));
const Dashboard = lazy(() => import('../views/home/dashboard/dashboard.view'));
const PropertyId = lazy(() => import('../views/home/property-id/property-id.view'));
const MyPropertiesList = lazy(() => import('../views/home/my-properties/list/my-properties-list.view'));
const MyPropertyDetails = lazy(() => import('../views/home/my-properties/details/my-property-details.view'));
const MyPropertiesExpenses = lazy(() => import('../views/home/my-properties/details/tabs/expenses/expenses.view'));
const PropertyDocuments = lazy(() => import('../views/home/my-properties/details/tabs/documents/documents.view'));
const MyDocuments = lazy(() => import('../views/home/my-documents/my-documents.view'));
const RentabilidadeVenda = lazy(() => import('../components/sale-simulator.component'));
const RentabilidadeArrendamento = lazy(() => import('../components/rent-simulator.component'));
const Benchmarking = lazy(() => import('../views/home/benchmarking/benchmarking.view'));
const Simulator = lazy(() => import('../views/home/simulator/simulator.view'));

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Outlet />}>
            <Route path="login" element={Suspense(<Login />)} />
            <Route path="register" element={Suspense(<Register />)} />
            <Route path="home" element={<Home>{Suspense(<Outlet />)}</Home>}>
                <Route path="dashboard" element={<Dashboard />} index />
                <Route path="property-id" element={<PropertyId />} />
                <Route path="my-properties" element={<MyPropertiesList />} />
                <Route path="my-properties/:propertyId" element={<MyPropertyDetails />}>
                    <Route path="expenses" element={<MyPropertiesExpenses />} index />
                    <Route path="documents" element={<PropertyDocuments />} index />
                </Route>
                <Route path="my-documents" element={<MyDocuments />} index />
                <Route path="rentabilidade-venda" element={<RentabilidadeVenda />} />
                <Route path="rentabilidade-arrendamento" element={<RentabilidadeArrendamento />} />
                <Route path="benchmarking" element={<Benchmarking />} />
                <Route path="simulator" element={<Simulator />} />
            </Route>
        </Route>,
    ),
);
