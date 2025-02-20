import { useEffect, useState, useMemo } from "react";
import { clientAPI } from "../api/api-axios.js";
import {
  CANDIDATE_ROUTES,
  REMOVE_CANDIDATE_ROUTES,
  STATUS_CHANGE_ROUTES,
} from "../api/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { updateStats } from "../redux/store.js";

const CandidatesProfileCard = () => {
  const [candidateData, setCandidateData] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [candidateToRemove, setCandidateToRemove] = useState(null);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getSearchTerms = useSelector((state) => state.search);
  const getAddedCandidate = useSelector((state) => state.add);

  const dispatch = useDispatch();

  // Calculate stats function
  const calculateStats = (data) => {
    return data.reduce((acc, candidate) => {
      acc[candidate.status] = (acc[candidate.status] || 0) + 1;
      return acc;
    }, {});
  };

  // Fetch candidate data from API
  const getCandidatesData = async () => {
    setLoading(true);
    try {
      const response = await clientAPI.get(`${CANDIDATE_ROUTES}`);
      if (response.status === 200) {
        setCandidateData(response.data);
        dispatch(updateStats(calculateStats(response.data)));
        // setCurrentPage(response.data.currentPage);
        // setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching candidate data:", error);
      alert(
        "An unexpected error occurred in loading candidate. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCandidatesData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAddedCandidate]);

  // Filter candidates based on search terms
  const filteredCandidates = useMemo(() => {
    let filteredData = candidateData;

    if (
      getSearchTerms.filteredValue &&
      getSearchTerms.filteredValue !== "none"
    ) {
      filteredData = filteredData.filter(
        (candidate) => candidate.status === getSearchTerms.filteredValue
      );
    }

    if (getSearchTerms.nameSearch) {
      filteredData = filteredData.filter((candidate) =>
        candidate.name
          .toLowerCase()
          .includes(getSearchTerms.nameSearch.toLowerCase())
      );
    }

    return filteredData;
  }, [candidateData, getSearchTerms]);

  // Update candidate status
  const changeCandidateStatus = async () => {
    try {
      const response = await clientAPI.put(
        `${STATUS_CHANGE_ROUTES}${selectedId}/status`,
        { status: selectedStatus }
      );
      if (response.status === 200) {
        const updatedCandidates = candidateData.map((candidate) =>
          candidate._id === selectedId
            ? { ...candidate, status: selectedStatus }
            : candidate
        );
        setCandidateData(updatedCandidates);
        dispatch(updateStats(calculateStats(updatedCandidates)));
        setOpenConfirmModal(false);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update the status. Please try again.");
    }
  };

  // Remove candidate
  const removeCandidate = async () => {
    try {
      const response = await clientAPI.delete(
        `${REMOVE_CANDIDATE_ROUTES}/${candidateToRemove}`
      );
      if (response.status === 200) {
        const updatedCandidates = candidateData.filter(
          (candidate) => candidate._id !== candidateToRemove
        );
        setCandidateData(updatedCandidates);
        dispatch(updateStats(calculateStats(updatedCandidates)));
        setOpenRemoveModal(false);
      }
    } catch (error) {
      console.error("Error removing candidate:", error);
      alert("Failed to remove candidate. Please try again.");
    }
  };

  // Handlers
  const handleStatusUpdate = (e, id) => {
    if (e.target.value !== "Select") {
      setSelectedStatus(e.target.value);
      setSelectedId(id);
      setOpenConfirmModal(true);
    }
  };

  const handleResume = (resume) => {
    // Check if the resume URL exists and is valid
    if (resume) {
      // Open the resume link in a new tab
      window.open(resume, "_blank");
    } else {
      // Optionally, handle the case when the resume is not available
      alert("Resume not available");
    }
  };

  const handleRemove = (id) => {
    setCandidateToRemove(id);
    setOpenRemoveModal(true);
  };

  // const handlePageChange = (page) => {
  //   if (page >= 1 && page <= totalPages) {
  //     setCurrentPage(page);
  //   }
  // };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {filteredCandidates.map((profile) => (
            <div
              key={profile._id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4 border border-gray-200"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Name: {profile.name}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Job Title: {profile.jobTitle}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Status: {profile.status}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Change Status:
                </label>
                <select
                  className="px-4 py-2 text-sm border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => handleStatusUpdate(e, profile._id)}
                >
                  <option value="Select">Select</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Hired">Hired</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 text-sm text-white bg-blue-600 
            rounded-md hover:bg-blue-700"
                  onClick={() => handleResume(profile.resumeLink)}
                >
                  View Resume
                </button>
                <button
                  className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                  onClick={() => handleRemove(profile._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {/* <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <p className="px-2">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div> */}

      {/* Confirm Modals */}
      {openConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to change the status?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setOpenConfirmModal(false)}
                className="px-4 py-2 text-sm text-white bg-gray-600 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={changeCandidateStatus}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {openRemoveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to remove this candidate?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setOpenRemoveModal(false)}
                className="px-4 py-2 text-sm text-white bg-gray-600 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={removeCandidate}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatesProfileCard;
