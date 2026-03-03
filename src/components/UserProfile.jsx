import React from "react";

function UserProfile({ data, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-96 shadow-xl">

        <h2 className="text-lg font-bold mb-4 text-center">User Profile</h2>

        <div className="flex justify-center mb-4">
          <img
            src={data?.photo || "https://via.placeholder.com/100"}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
        </div>

        <div className="space-y-2 text-sm">

          <p>
            <span className="font-bold">Name :</span> {data?.name || "N/A"}
          </p>

          <p>
            <span className="font-bold">Email :</span> {data?.email || "N/A"}
          </p>

          <p>
            <span className="font-bold">Employee ID :</span>{" "}
            {data?.employee_id || "N/A"}
          </p>

        </div>

=        <button
          onClick={onClose}
          className="mt-6 w-full bg-sky-500 text-white py-2 rounded-lg"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default UserProfile;