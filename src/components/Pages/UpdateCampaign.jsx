import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider"; // Assuming you are using context to get user info

const UpdateCampaign = () => {
    const campaign = useLoaderData();
    const { user } = useContext(AuthContext); // Get the authenticated user from context
    
    if (!campaign) {
        return <p>Loading...</p>; // Show loading state until data is available
    }

    const handleUpdateCampaign = (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
    
        const updatedCampaign = {
            title: formData.get("title"), // Title of the campaign
            type: formData.get("type"), // Campaign type
            description: formData.get("description"), // Description
            minimumDonation: parseFloat(formData.get("minimumDonation")), // Convert to number
            deadline: formData.get("deadline"), // Deadline
            image: formData.get("image"), // Image URL
            userEmail: formData.get("userEmail"), // User email (added)
            userName: formData.get("userName"), // User name (added)
        };

        console.log("Updated Campaign Data:", updatedCampaign);

        // Send updated data to the server
        fetch(`http://localhost:5000/campaigns/${campaign._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCampaign),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    Swal.fire({
                        title: "Success!",
                        text: "Campaign updated successfully",
                        icon: "success",
                        confirmButtonText: "Ok",
                    });
                    e.target.reset(); // Reset form after successful update
                } else {
                    throw new Error("Campaign update failed");
                }
            })
            .catch((error) => {
                console.error("Error updating campaign:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update campaign.",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            });
    };

    return (
        <div className="lg:w-3/4 mx-auto">
            <div className="text-center p-10">
                <h1 className="text-3xl font-bold">Update Campaign!</h1>
                <p className="py-6">
                    Update the details of your campaign below.
                </p>
            </div>
            <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
                <form onSubmit={handleUpdateCampaign} className="card-body">
                    {/* Campaign Title */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Campaign Title</span>
                        </label>
                        <input
                            name="title"
                            type="text"
                            placeholder="Campaign Title"
                            defaultValue={campaign.title}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    {/* Campaign Type */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Campaign Type</span>
                        </label>
                        <select
                            name="type"
                            className="select select-bordered"
                            defaultValue={campaign.type}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="personal issue">Personal Issue</option>
                            <option value="startup">Startup</option>
                            <option value="business">Business</option>
                            <option value="creative ideas">Creative Ideas</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            name="description"
                            placeholder="Write about your campaign..."
                            defaultValue={campaign.description}
                            className="textarea textarea-bordered"
                            required
                        ></textarea>
                    </div>

                    {/* Minimum Donation Amount */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Minimum Donation Amount</span>
                        </label>
                        <input
                            name="minimumDonation"
                            type="number"
                            placeholder="Minimum Donation Amount"
                            defaultValue={campaign.minimumDonation}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    {/* Deadline */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Deadline</span>
                        </label>
                        <input
                            name="deadline"
                            type="date"
                            defaultValue={campaign.deadline}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    {/* Image URL */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image/Thumbnail</span>
                        </label>
                        <input
                            name="image"
                            type="text"
                            placeholder="Image URL"
                            defaultValue={campaign.image}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    {/* User Email (Read Only) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">User Email</span>
                        </label>
                        <input
                            name="userEmail"
                            type="email"
                            value={user?.email || ""}
                            className="input input-bordered"
                            readOnly
                        />
                    </div>

                    {/* User Name (Read Only) */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">User Name</span>
                        </label>
                        <input
                            name="userName"
                            type="text"
                            value={user?.displayName || ""}
                            className="input input-bordered"
                            readOnly
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-green-500 hover:bg-green-400 text-white">
                            Update Campaign
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCampaign;
