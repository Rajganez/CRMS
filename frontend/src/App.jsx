import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
const CandidatePage = lazy(() => import("./pages/CandidatePage"));
// const AuthPage = lazy(() => import("./pages/AuthPage"));
const ScrollToTopButton = lazy(() => import("./components/ScrollToTop"));

function App() {
  const router = createBrowserRouter([
    // { path: "/", element: <AuthPage /> },
    { path: "/", element: <CandidatePage /> },
  ]);
  return (
    <>
      {/* <div className="text-center text-3xl text-black">Ayyappa!</div> */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        }
      >
        <ScrollToTopButton />
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
}

export default App;
