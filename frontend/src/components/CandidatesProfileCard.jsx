import { useState } from "react";

const profiles = [
  {
    name: "Alice Johnson",
    jobTitle: "Frontend Developer",
    status: "Pending",
    email: "alice.johnson@example.com",
    phone: "+1 555-1234",
  },
  {
    name: "Bob Smith",
    jobTitle: "Backend Developer",
    status: "Reviewed",
    email: "bob.smith@example.com",
    phone: "+1 555-5678",
  },
  {
    name: "Clara Brown",
    jobTitle: "UI/UX Designer",
    status: "Hired",
    email: "clara.brown@example.com",
    phone: "+1 555-8765",
  },
  {
    name: "David Lee",
    jobTitle: "DevOps Engineer",
    status: "Pending",
    email: "david.lee@example.com",
    phone: "+1 555-4321",
  },
  {
    name: "Eva Green",
    jobTitle: "Full Stack Developer",
    status: "Reviewed",
    email: "eva.green@example.com",
    phone: "+1 555-3456",
  },
  {
    name: "Frank Miller",
    jobTitle: "Cloud Architect",
    status: "Hired",
    email: "frank.miller@example.com",
    phone: "+1 555-6543",
  },
  {
    name: "Grace Wilson",
    jobTitle: "Data Scientist",
    status: "Pending",
    email: "grace.wilson@example.com",
    phone: "+1 555-7890",
  },
  {
    name: "Harry Scott",
    jobTitle: "System Administrator",
    status: "Reviewed",
    email: "harry.scott@example.com",
    phone: "+1 555-9876",
  },
  {
    name: "Isabella Martinez",
    jobTitle: "QA Engineer",
    status: "Hired",
    email: "isabella.martinez@example.com",
    phone: "+1 555-4320",
  },
  {
    name: "Jack Taylor",
    jobTitle: "Mobile App Developer",
    status: "Pending",
    email: "jack.taylor@example.com",
    phone: "+1 555-8764",
  },
  {
    name: "Katherine Adams",
    jobTitle: "AI Engineer",
    status: "Reviewed",
    email: "katherine.adams@example.com",
    phone: "+1 555-6542",
  },
  {
    name: "Liam Clark",
    jobTitle: "Security Analyst",
    status: "Hired",
    email: "liam.clark@example.com",
    phone: "+1 555-3210",
  },
  {
    name: "Megan Harris",
    jobTitle: "Software Engineer",
    status: "Pending",
    email: "megan.harris@example.com",
    phone: "+1 555-4567",
  },
  {
    name: "Noah Roberts",
    jobTitle: "Blockchain Developer",
    status: "Reviewed",
    email: "noah.roberts@example.com",
    phone: "+1 555-6789",
  },
  {
    name: "Olivia Walker",
    jobTitle: "Database Administrator",
    status: "Hired",
    email: "olivia.walker@example.com",
    phone: "+1 555-2345",
  },
  {
    name: "Peter Young",
    jobTitle: "Software Architect",
    status: "Pending",
    email: "peter.young@example.com",
    phone: "+1 555-3457",
  },
  {
    name: "Quinn Perez",
    jobTitle: "Network Engineer",
    status: "Reviewed",
    email: "quinn.perez@example.com",
    phone: "+1 555-2346",
  },
  {
    name: "Rachel King",
    jobTitle: "Web Developer",
    status: "Hired",
    email: "rachel.king@example.com",
    phone: "+1 555-5679",
  },
  {
    name: "Samuel Lee",
    jobTitle: "IT Support Specialist",
    status: "Pending",
    email: "samuel.lee@example.com",
    phone: "+1 555-6780",
  },
  {
    name: "Tessa Moore",
    jobTitle: "Game Developer",
    status: "Reviewed",
    email: "tessa.moore@example.com",
    phone: "+1 555-3458",
  },
];

const CandidatesProfileCard = () => {
  const [candidateData,] = useState(profiles);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {candidateData.map((profile) => (
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
    </>
  );
};

export default CandidatesProfileCard;
