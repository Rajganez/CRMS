const UserNavbar = () => {
  console.log("Navbar rendered");

  return (
    <div className="flex items-center justify-evenly bg-blue-950 shadow-md md:p-4 p-2 rounded-md">
      {/* Profile Section */}
      <div className="flex items-center md:space-x-4 space-x-2">
        {/* Profile Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center md:text-xl text-sm font-bold text-white">
          U
        </div>
        {/* User Info */}
        <div>
          <h2 className="md:text-lg text-sm font-semibold text-gray-100">
            John Doe
          </h2>
          <p className="md:text-sm text-xs text-gray-400">Recruiter</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex md:space-x-4 space-x-2">
        {/* Hired Box */}
        <div className="text-center">
          <div className="md:w-20 md:h-16 w-15 h-15 bg-green-400 rounded-md flex flex-col items-center justify-center md:text-2xl text-sm md:font-semibold text-black">
            10
            <p className="text-sm md:font-medium md:mt-1 md:p-0 p-1">Hired</p>
          </div>
        </div>
        {/* Reviewed Box */}
        <div className="text-center">
          <div className="md:w-20 md:h-16 w-15 h-15 bg-orange-400 rounded-md flex flex-col items-center justify-center md:text-2xl text-sm md:font-semibold text-black">
            5
            <p className="text-sm md:font-medium md:mt-1 md:p-0 p-1">
              Reviewed
            </p>
          </div>
        </div>
        {/* Pending Box */}
        <div className="text-center">
          <div className="md:w-20 md:h-16 w-15 h-15 bg-yellow-400 rounded-md flex flex-col items-center justify-center md:text-2xl text-sm md:font-semibold text-black">
            5
            <p className="text-sm md:font-medium md:mt-1 md:p-0 p-1">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
