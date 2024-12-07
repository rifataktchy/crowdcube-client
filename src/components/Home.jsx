// pages/Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // npm install react-slick slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Fetch campaigns from the database
    fetch("http://localhost:5000/campaigns") // Replace with your API endpoint
      .then((res) => res.json())
      .then((data) => {
        const runningCampaigns = data.filter(
          (campaign) => new Date(campaign.deadline) > new Date()
        );
        setCampaigns(runningCampaigns.slice(0, 6)); // Show only the first 6 running campaigns
      });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <div className="home">
      {/* Banner / Slider */}
      <section className="banner mb-12">
        <Slider {...sliderSettings}>
          <div className="relative">
            <img
              src="/images/slide1.jpg"
              alt="Slide 1"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-50 px-8">
              <h2 className="text-white text-3xl font-bold mb-2">
                Support Innovative Projects
              </h2>
              <p className="text-white text-lg">
                Join campaigns to fund creative ideas and impactful causes.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/slide2.jpg"
              alt="Slide 2"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-50 px-8">
              <h2 className="text-white text-3xl font-bold mb-2">
                Make a Difference
              </h2>
              <p className="text-white text-lg">
                Your small contribution can create a big change.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/slide3.jpg"
              alt="Slide 3"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-50 px-8">
              <h2 className="text-white text-3xl font-bold mb-2">
                Join Our Community
              </h2>
              <p className="text-white text-lg">
                Be a part of a passionate community of backers.
              </p>
            </div>
          </div>
        </Slider>
      </section>

      {/* Running Campaign Section */}
      <section className="running-campaigns px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Running Campaigns
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <div
                className="campaign-card border rounded-lg overflow-hidden shadow-lg"
                key={campaign._id}
              >
                <img
                  src={`/images/campaigns/${campaign.image}.jpg`} // Replace with your image path logic
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{campaign.title}</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    {campaign.description.slice(0, 50)}...
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong>Type:</strong> {campaign.type}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong>Minimum Donation:</strong> ${campaign.minimumDonation}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Deadline:</strong>{" "}
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/campaigns/${campaign._id}`}
                    className="block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  >
                    See More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">Loading campaigns...</p>
          )}
        </div>
      </section>

      {/* Extra Section 1 */}
      <section className="extra-section bg-gray-100 py-12 px-4 mt-12">
        <h2 className="text-3xl font-bold text-center mb-4">
          Why Choose CrowdCube?
        </h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto">
          CrowdCube empowers creators and donors to make meaningful connections.
          Back creative ideas or bring your own to life!
        </p>
      </section>

      {/* Extra Section 2 */}
      <section className="extra-section py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
        <ol className="list-decimal list-inside max-w-2xl mx-auto text-gray-700 space-y-2">
          <li>Explore running campaigns and projects.</li>
          <li>Donate or pledge support to campaigns you believe in.</li>
          <li>Watch the impact your contributions make.</li>
        </ol>
      </section>
    </div>
  );
};

export default Home;
