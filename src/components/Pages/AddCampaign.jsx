import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const AddCampaign = () => {
  const { user } = useContext(AuthContext); 
  console.log(user);
  // Get the authenticated user from context
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddCampaign = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const title = form.get("title");
    const type = form.get("type");
    const description = form.get("description");
    const minimumDonation = form.get("minimumDonation");
    const deadline = form.get("deadline");
    const image = form.get("image");

    const newCampaign = {
      title,
      type,
      description,
      minimumDonation: parseFloat(minimumDonation),
      deadline,
      image,
      userEmail: user?.email,
      userName: user?.displayName, // userName field will be sent as part of the campaign
    };
    console.log(newCampaign)

    // Save the campaign data to the database
    fetch("http://localhost:5000/campaigns", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCampaign),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.insertedId) {
          alert("Campaign added successfully!");
          navigate("/"); // Redirect to home after successful campaign creation
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl p-10 mb-6">
        <h1 className="text-2xl font-bold text-center">Add New Campaign</h1>
        <form onSubmit={handleAddCampaign} className="card-body">
          {/* Campaign Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Campaign Title</span>
            </label>
            <input name="title" type="text" placeholder="Campaign Title" className="input input-bordered" required />
          </div>

          {/* Campaign Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Campaign Type</span>
            </label>
            <select name="type" className="select select-bordered" required>
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
              className="input input-bordered"
              required
            />
          </div>

          {/* Deadline */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Deadline</span>
            </label>
            <input name="deadline" type="date" className="input input-bordered" required />
          </div>

          {/* Image/Thumbnail */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image/Thumbnail</span>
            </label>
            <input
              name="image"
              type="text"
              placeholder="Image URL"
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
            <button type="submit" className="btn bg-[rgba(164,132,63,0.837)] hover:bg-[rgba(214,180,106,0.837)] text-white">
              Add Campaign
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default AddCampaign;


