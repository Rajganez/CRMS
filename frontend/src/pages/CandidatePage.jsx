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
        <Suspense>
          <CandidatesProfileCard
          //  searchTerm={searchTerm}
          //  filterStatus={filterStatus}
          />
        </Suspense>
      </div>
    </>
  );
};

export default CandidatePage;
