import { lazy } from 'react';

// Pages are lazy-loaded so only the current page's JS is downloaded.
// Code for CRM, BlogAdmin etc. is never sent to regular visitors.
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogAdmin = lazy(() => import('./pages/BlogAdmin'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const CRM = lazy(() => import('./pages/CRM'));
const ClientPortal = lazy(() => import('./pages/ClientPortal'));
const Home = lazy(() => import('./pages/Home'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Retreat = lazy(() => import('./pages/Retreat'));
const RetreatAdmin = lazy(() => import('./pages/RetreatAdmin'));

export const PAGES = {
    "About": About,
    "Blog": Blog,
    "BlogAdmin": BlogAdmin,
    "BlogPost": BlogPost,
    "CRM": CRM,
    "ClientPortal": ClientPortal,
    "Home": Home,
    "Pricing": Pricing,
    "Retreat": Retreat,
    "RetreatAdmin": RetreatAdmin,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};
