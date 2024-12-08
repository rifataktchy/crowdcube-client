import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../components/provider/AuthProvider';

const DetailPage = () => {
    const campaign = useLoaderData(); // Get the campaign details
    console.log(campaign)
    const { user } = useContext(AuthContext); // Get logged-in user details

    const handleDonate = async () => {
        if (!user) {
            Swal.fire({
                title: "Error!",
                text: "You need to log in to donate!",
                icon: "error",
                confirmButtonText: "Ok",
            });
            return;
        }

        const donationData = {
            campaignId: campaign._id,
            campaignTitle: campaign.title,
            userEmail: user.email,
            userName: user.displayName,
            donationAmount: campaign.minimumDonation,
            donatedAt: new Date(),
        };

        try {
            const response = await fetch(`http://localhost:5000/donation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(donationData),
            });

            const data = await response.json();

            if (data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Thank you for your donation!",
                    icon: "success",
                    confirmButtonText: "Ok",
                });
            }
        } catch (error) {
            console.error("Error making a donation:", error);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "Ok",
                confirmButtonColor: "#28a745",
            });
        }
    };

    return (
        <div className="p-6 flex flex-col items-center justify-center">
      <img src={campaign.image} alt="Campaign" className="w-100 h-100 object-cover" />
            <h1 className="text-3xl font-bold text-center">{campaign.title}</h1>
            <p className="text-center text-gray-600 mt-2">{campaign.description}</p>
           


            <div className="mt-6 flex flex-col gap-4">
         
                <p><strong>Minimum Donation:</strong> ${campaign.minimumDonation}</p>
                <p><strong>Deadline:</strong> {campaign.deadline}</p>
                <p><strong>Creator:</strong> {campaign.userName} ({campaign.userEmail})</p>
                
            </div>

            <div className="text-center mt-6">
                <button onClick={handleDonate} className="btn btn-primary">Donate</button>
            </div>
        </div>
    );
};

export default DetailPage;
