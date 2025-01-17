import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../redux/store.js"; // Import the action
import validator from "validator"; // Import the validator library

const ReferCandidateModal = () => {
  const dispatch = useDispatch(); // Initialize dispatch

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    resume: null,
  });
  const [errors, setErrors] = useState({});

  // Close the modal and dispatch `closeModal` action
  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: validator.trim(value), // Sanitize input
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (validator.isEmpty(formData.firstName)) {
      newErrors.firstName = "First name is required";
    } else if (!validator.isAlpha(formData.firstName)) {
      newErrors.firstName = "First name must contain only letters";
    }

    if (validator.isEmpty(formData.lastName)) {
      newErrors.lastName = "Last name is required";
    } else if (!validator.isAlpha(formData.lastName)) {
      newErrors.lastName = "Last name must contain only letters";
    }

    if (!validator.isEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validator.isMobilePhone(formData.phone, "en-IN")) {
      newErrors.phone = "Phone number must be valid";
    }

    if (validator.isEmpty(formData.jobTitle)) {
      newErrors.jobTitle = "Job title is required";
    }

    if (!formData.resume) {
      newErrors.resume = "Resume is required";
    } else if (!formData.resume.name.endsWith(".pdf")) {
      newErrors.resume = "Resume must be a PDF file";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log({
        ...formData,
        email: validator.normalizeEmail(formData.email), // Sanitize email
        phone: validator.whitelist(formData.phone, "0-9"), // Remove unwanted characters
      });
      closeModalHandler(); // Close the modal after submission
    }
  };

  return (
    <div>
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md w-96">
          <h2 className="text-xl font-semibold mb-4">Refer a Candidate</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <select
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Job Title</option>
                <option value="Hired">Hired</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Pending">Pending</option>
              </select>
              {errors.jobTitle && (
                <p className="text-sm text-red-500">{errors.jobTitle}</p>
              )}
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Resume (PDF only)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.resume && (
                <p className="text-sm text-red-500">{errors.resume}</p>
              )}
            </div>

            {/* Submit and Close Buttons */}
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={closeModalHandler}
                className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReferCandidateModal;
