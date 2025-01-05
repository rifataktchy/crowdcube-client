import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

const AllCampaigns = () => {
  const campaigns = useLoaderData();
  const [loadedCampaigns, setLoadedCampaigns] = useState(campaigns);
  const [isAscending, setIsAscending] = useState(true); // Track sort direction

  // Function to sort campaigns by minimum donation
  const handleSort = () => {
    const sortedCampaigns = [...loadedCampaigns].sort((a, b) => {
      if (isAscending) {
        return a.minimumDonation - b.minimumDonation; // Ascending
      } else {
        return b.minimumDonation - a.minimumDonation; // Descending
      }
    });
    setLoadedCampaigns(sortedCampaigns);
    setIsAscending(!isAscending); // Toggle sort direction
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center">All Campaigns</h1>
      <p className="text-center text-gray-600 mt-2">
        Total campaigns: {campaigns.length}
      </p>

      {/* Sort Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSort}
          className="btn bg-green-500 text-white hover:bg-green-400 px-4 py-2 rounded"
        >
          Sort by Minimum Donation ({isAscending ? "Ascending" : "Descending"})
        </button>
      </div>

      {/* Card Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {loadedCampaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-300 hover:shadow-xl transition-shadow duration-300"
          >
            <img src={campaign.image} alt="Campaign" className="w-100 h-80 object-cover" />
            <h2 className="text-xl font-bold text-green-500">
              {campaign.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              <strong>Type:</strong> {campaign.type}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
              {campaign.description}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              <strong>Minimum Donation:</strong> ${campaign.minimumDonation}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              <strong>Deadline:</strong> {campaign.deadline}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              <strong>Creator:</strong> {campaign.userName} (
              {campaign.userEmail})
            </p>
            <Link to={`/campaign/${campaign._id}`} className="mt-4 block">
              <button className="w-full bg-[#3c7f39] hover:bg-green-400 text-white font-bold py-2 px-4 rounded">
                See More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCampaigns;
