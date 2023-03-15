import './App.scss';
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import Layout from 'common/Layout';
import SocialLoginProvider from 'common/SocialLogin/provider';
import useAppInitialize from 'hooks/useAppInitialize';
import PATHS from 'utils/paths';

const Home = React.lazy(() => import('common/Navigation/home'));
const ProductDetail = React.lazy(() => import('pages/ProductDetail'));
const Page = React.lazy(() => import('common/Navigation/page'));
const CollectionDetail = React.lazy(() => import('pages/CollectionDetail'));
const MaterialDetail = React.lazy(() => import('pages/MaterialDetail'));
const NewsDetail = React.lazy(() => import('pages/NewsDetail'));
// const NewsByHashtag = React.lazy(() => import('pages/NewsByHashtag'));
const NotFound = React.lazy(() => import('pages/NotFound'));
const NewsCategory = React.lazy(() => import('pages/NewsCategory'));
const Sale = React.lazy(() => import('pages/Sale'));
const VNPAY = React.lazy(() => import('pages/RedirectPayment/vnpay'));
const MOMO = React.lazy(() => import('pages/RedirectPayment/momo'));
// const Layout = React.lazy(() => import('common/Layout'));

const App: React.FC = () => {
  useAppInitialize();
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route index element={<Home />} />
        <Route path={PATHS.PAGE} element={<Page />} />
        <Route path={PATHS.COLLECTION_DETAIL_WITH_SLUG(':slug')} element={<CollectionDetail />} />
        <Route path={PATHS.NEWS_DETAIL_WITH_SLUG(':slug')} element={<NewsDetail />} />
        <Route path={PATHS.MATERIAL_DETAIL_WITH_SLUG(':slug')} element={<MaterialDetail />} />
        <Route path={PATHS.PRODUCT_DETAIL_WITH_SLUG(':category', ':slug')} element={<ProductDetail />} />
        <Route path={PATHS.NEWS_CATEGORY} element={<NewsCategory />}>
          <Route path=":slug" element={null} />
        </Route>
        <Route path={PATHS.SALE_OFF} element={<Sale />}>
          <Route path=":slug" element={null} />
        </Route>
        <Route path={PATHS.VNPAY} element={<VNPAY />} />
        <Route path={PATHS.MOMO} element={<MOMO />} />
        <Route
          path="*"
          element={(
            <Layout>
              <NotFound />
            </Layout>
          )}
        />
      </Routes>
    </Suspense>
  );
};

const AppWrapper: React.FC = () => (
  <QueryClientProvider client={new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
      }
    }
  })}
  >
    <HelmetProvider>
      <SocialLoginProvider>
        <div id="fb-root" />
        <div id="fb-customer-chat" className="fb-customerchat" />
        <App />
      </SocialLoginProvider>
    </HelmetProvider>
  </QueryClientProvider>
);
export default AppWrapper;
