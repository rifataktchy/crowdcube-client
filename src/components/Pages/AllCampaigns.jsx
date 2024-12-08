import { useLoaderData, Link } from 'react-router-dom';
import { useState } from 'react';

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
            <p className="text-center text-gray-600 mt-2">Total campaigns: {campaigns.length}</p>

            {/* Sort Button */}
            <div className="flex justify-end mt-4">
                <button
                    onClick={handleSort}
                    className="btn bg-green-500 text-white hover:bg-green-400 px-4 py-2 rounded"
                >
                    Sort by Minimum Donation ({isAscending ? "Ascending" : "Descending"})
                </button>
            </div>

            <div className="overflow-x-auto mt-6">
                <table className="table-auto w-full border border-gray-300 shadow-lg">
                    <thead className="bg-green-500 text-white">
                        <tr>
                            <th className="py-2 px-4 border border-gray-300 text-xs sm:text-sm">Title</th>
                            <th className="py-2 px-4 border border-gray-300 text-xs sm:text-sm">Type</th>
                            <th className="py-2 px-4 border border-gray-300 text-xs sm:text-sm">Description</th>
                            <th className="py-2 px-4 border border-gray-300 text-xs sm:text-sm">Minimum Donation</th>
                            <th className="py-2 px-4 border border-gray-300 text-xs sm:text-sm">Deadline</th>
                            <th className="py-2 px-4 border border-gray-300 text-xs sm:text-sm">Creator</th>
                            <th className="py-2 px-4 border border-gray-300 text-xs sm:text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadedCampaigns.map((campaign, index) => (
                            <tr
                                key={campaign._id}
                                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 text-black`}
                            >
                                <td className="py-2 px-4 border border-gray-300 text-xs sm:text-sm">{campaign.title}</td>
                                <td className="py-2 px-4 border border-gray-300 text-xs sm:text-sm">{campaign.type}</td>
                                <td className="py-2 px-4 border border-gray-300 text-xs sm:text-sm">{campaign.description}</td>
                                <td className="py-2 px-4 border border-gray-300 text-xs sm:text-sm">${campaign.minimumDonation}</td>
                                <td className="py-2 px-4 border border-gray-300 text-xs sm:text-sm">{campaign.deadline}</td>
                                <td className="py-2 px-4 border border-gray-300 text-xs sm:text-sm">{campaign.userName} ({campaign.userEmail})</td>
                                <td className="py-2 px-4 border border-gray-300">
                                    <Link to={`/campaign/${campaign._id}`}>
                                        <button className="btn bg-green-500 hover:bg-green-400 text-xs sm:text-sm">See More</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllCampaigns;

