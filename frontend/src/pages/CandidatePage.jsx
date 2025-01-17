import { lazy, Suspense } from "react";

const WelcomeCover = lazy(() => import("../components/WelcomeCover"));

const CandidatesProfileCard = lazy(() =>
  import("../components/CandidatesProfileCard")
);
const UserNavbar = lazy(() => import("../components/UserNavbar"));

const CandidatePage = () => {
  return (
    <>
      <WelcomeCover />
      {/* Navbar */}
      <div className="p-1 sticky top-0 z-100 bg-white shadow-md">
        <Suspense>
          <UserNavbar />
        </Suspense>
      </div>
      {/* Profile Cards */}
      <div className="p-4">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
          }
        >
          <CandidatesProfileCard />
        </Suspense>
      </div>
    </>
  );
};

export default CandidatePage;
