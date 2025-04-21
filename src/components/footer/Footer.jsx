import React from "react";

const Footer = () => {
  return (
    <footer className="footer flex flex-col items-center gap-2 p-4 bg-base-200 text-base-content mt-10">
      <div>
        <p>
          © {new Date().getFullYear()} Stellar Beauty Hub. All rights reserved.
        </p>
      </div>
      <div>
        <p>
          Made with <span>💜</span> by{" "}
          <a
            href="https://github.com/subha-guchait"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            Subhankar
          </a>
        </p>
      </div>
      <div>
        <p className="text-sm text-center">
          📍 Stellar Beauty Hub, 25 Park Street, Kolkata, West Bengal 700016
        </p>
      </div>
    </footer>
  );
};

export default Footer;
