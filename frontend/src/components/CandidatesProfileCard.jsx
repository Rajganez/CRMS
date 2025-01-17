import { useEffect, useState } from "react";
import { clientAPI } from "../api/api-axios.js";
import { CANDIDATE_ROUTES } from "../api/constants.js";
import { useSelector } from "react-redux";

const CandidatesProfileCard = () => {
  console.log("Card rendered");
  
  const [candidateData, setCandidateData] = useState([]);
  const [candidateSearchData, setCandidateSearchData] = useState([]);

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
            <select className="px-4 py-2 text-sm border rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
            <button className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700">
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidatesProfileCard;
