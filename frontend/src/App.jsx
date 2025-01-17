import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import ScrollToTopButton from "./components/ScrollToTop";
const CandidatePage = lazy(() => import("./pages/CandidatePage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <AuthPage /> },
    { path: "/candidates", element: <CandidatePage /> },
  ]);
  return (
    <>
    
      {/* <div className="text-center text-3xl text-black">Ayyappa!</div> */}
      <Suspense>
        <ScrollToTopButton/>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
}

export default App;

