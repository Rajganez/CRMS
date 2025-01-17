import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal, toggleAdd } from "../redux/store.js";
import validator from "validator";
import { clientAPI } from "../api/api-axios.js";
import { ADD_CANDIDATE_ROUTES } from "../api/constants.js";

const ReferCandidateModal = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "",
    jobTitle: "",
    resume: null,
  });
  const [errors, setErrors] = useState({});

  const jobTitlesArray = [
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "DevOps Engineer",
    "Full Stack Developer",
    "Cloud Architect",
    "Data Scientist",
    "System Administrator",
    "QA Engineer",
    "Mobile App Developer",
    "AI Engineer",
    "Security Analyst",
    "Software Engineer",
    "Blockchain Developer",
    "Database Administrator",
    "Software Architect",
    "Network Engineer",
    "Web Developer",
    "IT Support Specialist",
    "Game Developer",
  ];

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: validator.trim(value),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, resume: file }));
  };

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

    if (validator.isEmpty(formData.status)) {
      newErrors.status = "Status is required";
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
    return Object.keys(newErrors).length === 0;
  };

  const addCandidate = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.firstName + " " + formData.lastName);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("status", formData.status);
      form.append("jobTitle", formData.jobTitle);
      form.append("resume", formData.resume);

      const response = await clientAPI.post(ADD_CANDIDATE_ROUTES, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        dispatch(toggleAdd());
      } else alert("Candidate not referred please try again");
    } catch (error) {
      console.error("Error adding candidate:", error);
      alert("Failed to add candidate. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      addCandidate(); // Perform API call
      closeModalHandler(); // Close the modal
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white h-screen sm:h-auto sm:max-h-screen sm:overflow-hidden w-full sm:max-w-lg rounded-md">
        <div className="h-full flex flex-col sm:max-h-screen">
          <header className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Refer a Candidate
            </h2>
          </header>
          <div className="p-4 flex-1 overflow-y-auto">
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

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select status</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Pending">Pending</option>
                  <option value="Hired">Hired</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-red-500">{errors.status}</p>
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
                  <option value="">Select Job title</option>
                  {jobTitlesArray.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
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
    </div>
  );
};

export default ReferCandidateModal;
