import { lazy, Suspense, useCallback, useState } from "react";
import WelcomeCoverImage from "../assets/welcome_cover.jpg";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, openModal } from "../redux/store.js";
import validator from "validator"; // Import the validator library

const ReferCandidateModal = lazy(() =>
  import("../components/ReferCandidateModal")
);

const WelcomeCover = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [errors, setErrors] = useState("");

  const isModalOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  // Validate and sanitize search term
  const validateAndSanitizeSearch = (value) => {
    const sanitizedValue = validator.trim(value);

    if (
      sanitizedValue &&
      !validator.isAlpha(sanitizedValue, "en-US", { ignore: " " })
    ) {
      setErrors("Search term must contain only alphabetic characters");
    } else {
      setErrors("");
    }

    return sanitizedValue;
  };

  // Memoized handleSearchChange
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      const sanitizedValue = validateAndSanitizeSearch(value);

      // Update the search term regardless of validation
      setSearchTerm(value);

      // Dispatch only valid search terms
      if (sanitizedValue) {
        dispatch(
          setSearch({
            nameSearch: sanitizedValue,
            filteredValue: filterStatus, // Keep the current filter value
          })
        );
      }
    },
    [dispatch, filterStatus] // Dependency array includes filterStatus
  );

  // Memoized handleFilterClick
  const handleFilterClick = useCallback(
    (status) => {
      setFilterStatus(status);
      dispatch(
        setSearch({
          nameSearch: searchTerm, // Keep the current search term
          filteredValue: status,
        })
      );
      setIsDropdownVisible(false);
    },
    [dispatch, searchTerm] // Dependency array includes searchTerm
  );

  const handleOpenModal = useCallback(() => {
    dispatch(openModal());
  }, [dispatch]);

  return (
    <>
      <div className="relative w-screen md:h-[200px] h-[150px]">
        {/* Background Cover Image */}
        <img
          src={WelcomeCoverImage}
          alt="Welcome Cover"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Overlay Container */}
        <div className="absolute inset-0 bg-black bg-opacity-50">
          {/* Centered Welcome Text */}
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="md:text-3xl text-lg font-bold text-white">
              Welcome to Candidate Referral!
            </h1>
            <div>
              <div className="md:flex flex-row">
                <div>
                  <form className="flex md:space-x-4 space-x-1 mt-4">
                    {/* Search Bar */}
                    <div>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search candidates..."
                        className="md:p-2 rounded-md text-black"
                      />
                      {errors && (
                        <p className="text-sm text-red-500">{errors}</p>
                      )}
                    </div>
                    {/* Filter Button with Icon */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                        className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                      >
                        <FaFilter className="mr-2" />{" "}
                        {filterStatus === "Clear" || !filterStatus
                          ? "Filter"
                          : filterStatus}
                      </button>
                      {isDropdownVisible && (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-40 z-10">
                          <button
                            type="button"
                            onClick={() => handleFilterClick("none")}
                            className="absolute left-24 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
                          >
                            Clear
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFilterClick("Hired")}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
                          >
                            Hired
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFilterClick("Reviewed")}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
                          >
                            Reviewed
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFilterClick("Pending")}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
                          >
                            Pending
                          </button>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
                <div className="flex space-x-4 mt-2 ml-4">
                  <button
                    onClick={handleOpenModal}
                    className="text-sm mt-2 font-medium text-white bg-blue-600 md:px-4 md:py-2 p-1 rounded-md hover:bg-blue-700 cursor-pointer"
                  >
                    Refer a Candidate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <ReferCandidateModal />
        </Suspense>
      )}
    </>
  );
};

export default WelcomeCover;
