

const Footer = () => {
  return (
    <footer className="bg-green-500 text-white py-10">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: About */}
          <div className='text-white'>
            <h4 className="text-xl font-semibold">About Us</h4>
            <p className="mt-2 text-white">
            CrowdCube empowers creators and donors to make meaningful connections. 
    Whether you're a visionary seeking support or a passionate backer, CrowdCube brings your goals to life.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-2 text-white">
              <li><a href="/" className=" hover:underline">Home</a></li>
              <li><a href="/campaigns" className=" hover:underline">Campaigns</a></li>
              <li><a href="/howtohelp" className=" hover:underline">How to Help</a></li>
              <li><a href="/dashboard" className=" hover:underline">Dashboard</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-xl font-semibold">Contact Us</h4>
            <p className="mt-2 text-white">
              Have any questions or want to get involved? Reach out to us at:
            </p>
            <ul className="mt-2 space-y-2">
            <li>Phone: <a href="facebook.com" className="text-white hover:underline">www.facebook.com</a></li>
              <li>Email: <a href="mailto:support@clothdonations.com" className="text-white hover:underline">support@clothdonations.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="text-white hover:underline">+1 234 567 89000</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-base-300 mt-8 pt-6 text-center">
          <p className="text-sm text-white font-bold">© 2024 Crowd Cube Donation Campaign. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;