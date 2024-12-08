
import { useLoaderData, Link } from 'react-router-dom';
import { useState } from 'react';

const AllCampaigns = () => {
    const campaigns = useLoaderData();
    const [loadedCampaigns] = useState(campaigns);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center">All Campaigns</h1>
            <p className="text-center text-gray-600 mt-2">Total campaigns: {campaigns.length}</p>

            <div className="overflow-x-auto mt-6">
                <table className="table-auto w-full border border-gray-300 shadow-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-2 px-4 border border-gray-300">Title</th>
                            <th className="py-2 px-4 border border-gray-300">Type</th>
                            <th className="py-2 px-4 border border-gray-300">Description</th>
                            <th className="py-2 px-4 border border-gray-300">Minimum Donation</th>
                            <th className="py-2 px-4 border border-gray-300">Deadline</th>
                            <th className="py-2 px-4 border border-gray-300">Creator</th>
                            <th className="py-2 px-4 border border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadedCampaigns.map((campaign, index) => (
                            <tr
                                key={campaign._id}
                                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
                            >
                                <td className="py-2 px-4 border border-gray-300">{campaign.title}</td>
                                <td className="py-2 px-4 border border-gray-300">{campaign.type}</td>
                                <td className="py-2 px-4 border border-gray-300">{campaign.description}</td>
                                <td className="py-2 px-4 border border-gray-300">${campaign.minimumDonation}</td>
                                <td className="py-2 px-4 border border-gray-300">{campaign.deadline}</td>
                                <td className="py-2 px-4 border border-gray-300">{campaign.userName} ({campaign.userEmail})</td>
                                <td className="py-2 px-4 border border-gray-300">
                                    <Link to={`/campaign/${campaign._id}`}>
                                        <button className="btn bg-green-500 hover:bg-green-400">See More</button>
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
