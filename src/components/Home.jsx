import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // npm install react-slick slick-carousel
import { Player } from "@lottiefiles/react-lottie-player"; // Import Lottie player
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.jpg";
import animationData from "../assets/Animation - 1733677591313.json"; // Replace with your Lottie animation JSON file

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch("https://crowdcube-server-eight.vercel.app/campaigns")
      .then((res) => res.json())
      .then((data) => {
        const runningCampaigns = data.filter(
          (campaign) => new Date(campaign.deadline) > new Date()
        );
        setCampaigns(runningCampaigns.slice(0, 6));
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
              src={slide1}
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
              src={slide2}
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
              src={slide3}
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
          {campaigns.length > 0 || campaigns.length < 6 ? (
            campaigns.map((campaign) => (
              <div
             
                className="campaign-card border overflow:hidden rounded-lg  shadow-lg"
                key={campaign._id}
              >
                <img
                  src={`https://i.ibb.co/VC0YYnG/raj1.jpg`}
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
                    <strong>Minimum Donation:</strong> $
                    {campaign.minimumDonation}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    <strong>Deadline:</strong>{" "}
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/campaign/${campaign._id}`}
                    className="block text-center bg-[#3c7f39] text-white py-2 rounded hover:bg-green-600"
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

      {/* Extra Section with Lottie */}
      <section className="extra-section bg-green-100 py-12 px-4 mt-12 flex flex-col md:flex-row items-center justify-center">
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2">
          <Player
            autoplay
            loop
            src={animationData}
            className="w-full h-full"
          />
        </div>
        {/* Text Content */}
        <div className="text-center md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-bold mb-4">Why Choose CrowdCube?</h2>
          <p className="text-gray-700 mb-6">
            CrowdCube empowers creators and donors to make meaningful
            connections. Whether you're a visionary seeking support or a
            passionate backer eager to fuel innovative ideas, CrowdCube brings
            your goals to life.
          </p>
          <Link
            to="/allcampaigns"
            className="bg-[#3c7f39] text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600"
          >
            Learn More
          </Link>
        </div>
      </section>

          {/* Extra Section 2 */}
          <section className="extra-section py-12 px-4 overflow-hidden">
  <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-gray-700">
    {/* Step 1 */}
    <div className="text-center">
      <div className="rounded-full bg-[#3c7f39] text-white w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
        1
      </div>
      <h3 className="text-xl font-semibold">Explore Campaigns</h3>
      <p className="mt-2">
        Browse campaigns across categories like tech, art, education, and 
        health. Find projects that align with your passion.
      </p>
    </div>
    {/* Step 2 */}
    <div className="text-center">
      <div className="rounded-full bg-[#3c7f39] text-white w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
        2
      </div>
      <h3 className="text-xl font-semibold">Pledge Support</h3>
      <p className="mt-2">
        Make secure donations to campaigns that inspire you. Every contribution, 
        no matter the size, makes a difference.
      </p>
    </div>
    {/* Step 3 */}
    <div className="text-center">
      <div className="rounded-full bg-[#3c7f39] text-white w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
        3
      </div>
      <h3 className="text-xl font-semibold">See the Impact</h3>
      <p className="mt-2">
        Track the progress of campaigns you've supported and witness how your 
        contributions bring ideas to life.
      </p>
    </div>
  </div>
  <div className="mt-8 text-center">
    <Link
      to="/allcampaigns"
      className="bg-[#3c7f39] text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600"
    >
      Start Exploring
    </Link>
  </div>
</section>
    </div>
  );
};

export default Home;
