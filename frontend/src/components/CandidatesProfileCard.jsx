import { useEffect, useState } from "react";
import { clientAPI } from "../api/api-axios.js";
import {
  CANDIDATE_ROUTES,
  REMOVE_CANDIDATE_ROUTES,
  STATUS_CHANGE_ROUTES,
} from "../api/constants.js";
import { useSelector } from "react-redux";

const CandidatesProfileCard = () => {
  const [candidateData, setCandidateData] = useState([]);
  const [candidateSearchData, setCandidateSearchData] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null); // Track selected status
  const [selectedId, setSelectedId] = useState(null); // Track selected candidate ID
  const [candidateToRemove, setCandidateToRemove] = useState(null); // Track the candidate to be removed

  const getSearchTerms = useSelector((state) => state.search);

  // API Call to get the candidate data from the DB
  const getCandidatesData = async () => {
    try {
      const response = await clientAPI.get(CANDIDATE_ROUTES);
      if (response.status === 200) {
        setCandidateData(response.data);
        setCandidateSearchData(response.data); // Initialize with all data
      }
    } catch (error) {
      console.error("Error fetching candidate data:", error);
      if (error.response) {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    getCandidatesData();
  }, []);

  useEffect(() => {
    let filteredData = candidateData;

    // Filter by status if applicable
    if (
      getSearchTerms.filteredValue &&
      getSearchTerms.filteredValue !== "none"
    ) {
      filteredData = filteredData.filter(
        (candidate) => candidate.status === getSearchTerms.filteredValue
      );
    }
    if (getSearchTerms.filteredValue === "none") {
      // Reset search term when status filter changes
      setCandidateSearchData(filteredData);
    }
    // Filter by name if applicable
    if (getSearchTerms.nameSearch) {
      filteredData = filteredData.filter((candidate) =>
        candidate.name
          .toLowerCase()
          .includes(getSearchTerms.nameSearch.toLowerCase())
      );
    }
    setCandidateSearchData(filteredData);
  }, [candidateData, getSearchTerms]);

  // API to change the status of the selected candidate
  const changeCandidateStatus = async () => {
    try {
      const response = await clientAPI.put(
        `${STATUS_CHANGE_ROUTES}${selectedId}/status`,
        { status: selectedStatus }
      );
      if (response.status === 200) {
        // Update the local state with the new status
        setCandidateData((prevData) =>
          prevData.map((candidate) =>
            candidate._id === selectedId
              ? { ...candidate, status: selectedStatus }
              : candidate
          )
        );
        setCandidateSearchData((prevData) =>
          prevData.map((candidate) =>
            candidate._id === selectedId
              ? { ...candidate, status: selectedStatus }
              : candidate
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update the status. Please try again.");
    }
  };

  const onStatusUpdate = (e, id) => {
    if (e.target.value !== "Select") {
      setSelectedStatus(e.target.value);
      setSelectedId(id);
      setOpenConfirmModal(true);
    }
  };

  const handleConfirm = async () => {
    await changeCandidateStatus(); // Call the API to update the status
    setOpenConfirmModal(false);
  };

  const handleCancel = () => {
    setOpenConfirmModal(false);
  };

  const handleRemoveCancel = () => {
    setOpenRemoveModal(false);
  };

  // To Remove the candidate from the DB
  const onRemove = (id) => {
    setCandidateToRemove(id); // Set the candidate to remove when clicked
    setOpenRemoveModal(true); // Show the confirmation modal
  };

  const handleRemoveConfirm = async () => {
    try {
      // API call to delete the candidate by id
      const response = await clientAPI.delete(
        `${REMOVE_CANDIDATE_ROUTES}/${candidateToRemove}`
      );
      if (response.status === 200) {
        // Remove the candidate from the local state after successful deletion
        setCandidateData((prevData) =>
          prevData.filter((candidate) => candidate._id !== candidateToRemove)
        );
        setCandidateSearchData((prevData) =>
          prevData.filter((candidate) => candidate._id !== candidateToRemove)
        );
        setOpenRemoveModal(false);
      }
    } catch (error) {
      console.error("Error removing candidate:", error);
      alert("Failed to remove candidate. Please try again.");
    }
    setOpenConfirmModal(false); // Close the modal after removal
  };

  // // To Remove the candidate from the DB
  // const onRemove = async (id) => {
  //   try {
  //     // API call to delete the candidate by id
  //     const response = await clientAPI.delete(
  //       `${REMOVE_CANDIDATE_ROUTES}/${id}`
  //     );
  //     if (response.status === 200) {
  //       // Remove the candidate from the local state after successful deletion
  //       setCandidateData((prevData) =>
  //         prevData.filter((candidate) => candidate._id !== id)
  //       );
  //       setCandidateSearchData((prevData) =>
  //         prevData.filter((candidate) => candidate._id !== id)
  //       );
  //       console.log("Candidate removed successfully");
  //     }
  //   } catch (error) {
  //     console.error("Error removing candidate:", error);
  //     alert("Failed to remove candidate. Please try again.");
  //   }
  // };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {candidateSearchData.map((profile) => (
        <div
          key={profile.phone}
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4 border border-gray-200"
        >
          {/* Name and Job Title */}
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

          {/* Actions */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Change Status:
            </label>
            <select
              className="px-4 py-2 text-sm border rounded-md bg-gray-50 
            text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => onStatusUpdate(e, profile._id)}
            >
              <option value="Select">Select</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Hired">Hired</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
              View Resume
            </button>
            <button
              className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
              onClick={() => onRemove(profile._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Status Change Confirm Modal */}
      {openConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to change the status?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm text-white bg-gray-600 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Confirm Modal */}
      {openRemoveModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to remove this candidate?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleRemoveCancel}
                className="px-4 py-2 text-sm text-white bg-gray-600 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveConfirm}
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
