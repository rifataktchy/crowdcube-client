import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/provider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCampaigns = () => {
  const { user } = useContext(AuthContext); // Get logged-in user
  const [myCampaigns, setMyCampaigns] = useState([]);

  // Fetch campaigns based on user email
  useEffect(() => {
    const fetchMyCampaigns = async () => {
      try {
        const response = await fetch(`http://localhost:5000/campaigns?email=${user.email}`);
        const data = await response.json();
        console.log(data);
        setMyCampaigns(data);
      } catch (error) {
        console.error("Failed to fetch user campaigns:", error);
      }
    };

    if (user?.email) {
      fetchMyCampaigns();
    }
  }, [user?.email]);

  // Handle deletion of a campaign
  const handleDelete = async (campaignId) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/campaigns/${campaignId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    // Remove the campaign from the state
                    setMyCampaigns(myCampaigns.filter((campaign) => campaign._id !== campaignId));

                    Swal.fire("Deleted!", "Your campaign has been deleted.", "success");
                } else {
                    Swal.fire("Error!", "Failed to delete the campaign.", "error");
                }
            } catch (error) {
                console.error("Error deleting campaign:", error);
                Swal.fire("Error!", "Something went wrong. Try again later.", "error");
            }
        }
    });
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">My Campaigns</h1>
      {myCampaigns.length === 0 ? (
        <p className="text-center text-gray-600 mt-4">You have not created any campaigns yet.</p>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="table-auto w-full border border-gray-300 shadow-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border border-gray-300">Title</th>
                <th className="py-2 px-4 border border-gray-300">Type</th>
                <th className="py-2 px-4 border border-gray-300">Description</th>
                <th className="py-2 px-4 border border-gray-300">Min Donation</th>
                <th className="py-2 px-4 border border-gray-300">Deadline</th>
                <th className="py-2 px-4 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCampaigns.map((campaign, index) => (
                <tr
                  key={campaign._id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
                >
                  <td className="py-2 px-4 border border-gray-300 text-center">{campaign.title}</td>
                  <td className="py-2 px-4 border border-gray-300 text-center">{campaign.type}</td>
                  <td className="py-2 px-4 border border-gray-300 text-center">{campaign.description}</td>
                  <td className="py-2 px-4 border border-gray-300 text-center">${campaign.minimumDonation}</td>
                  <td className="py-2 px-4 border border-gray-300 text-center">{campaign.deadline}</td>
                  <td className="py-2 px-4 border border-gray-300 text-center">
                    <div className="card-actions justify-end join join-vertical">
                      {/* Edit button */}
                      <Link to={`/updatecampaigns/${campaign._id}`}>
                        <button className="btn join-item bg-green-500 hover:bg-green-400">Update</button>
                      </Link>
                      {/* Delete button */}
                      <button
                        onClick={() => handleDelete(campaign._id)} // Use _id here to delete by unique identifier
                        className="btn join-item bg-green-500 hover:bg-green-400"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyCampaigns;
