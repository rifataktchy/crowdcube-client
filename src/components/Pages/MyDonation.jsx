import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../components/provider/AuthProvider";
import Swal from "sweetalert2";

const MyDonations = () => {
    const { user } = useContext(AuthContext); // Get logged-in user details
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://crowdcube-server-eight.vercel.app/donation?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setDonations(data);
                })
                .catch((err) => {
                    console.error("Error fetching donations:", err);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to load donations. Please try again later.",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                });
        }
    }, [user]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center">My Donations</h1>
            <p className="text-center text-gray-600 mt-2">
                Total Donations: {donations.length}
            </p>

            {donations.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">No donations found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {donations.map((donation) => (
                        <div
                            key={donation._id}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                        >
                            <div className="p-4">
                                <h2 className="text-xl font-bold">{donation.campaignTitle}</h2>
                                <p className="mt-2 text-gray-600">
                                    <strong>Donated Amount:</strong> $
                                    {donation.donationAmount}
                                </p>
                                <p className="mt-1 text-gray-600">
                                    <strong>Donated On:</strong>{" "}
                                    {new Date(donation.donatedAt).toLocaleDateString()}
                                </p>
                                <p className="mt-1 text-gray-600">
                                    <strong>Campaign ID:</strong> {donation.campaignId}
                                </p>
                                <p className="mt-1 text-gray-600">
                                    <strong>Username:</strong> {donation.userName}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyDonations;
