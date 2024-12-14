import React from "react";

const CookiePolicy: React.FC = () => {
  return (
    <>
      <div className="gap"></div>
      <div className="container">
        <h1>Cookie Policy</h1>

        <p>
          Le Flaneur Amsterdam (&apos;we&apos;, &apos;our&apos;, &apos;us&apos;)
          uses cookies on leflaneuramsterdam.com (the &apos;Website&apos;). By
          using the Website, you consent to the use of cookies as described in
          this policy.
        </p>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device to collect standard
          internet log information and visitor behavior information. When you
          visit our Website, we may collect information from you automatically
          through cookies or similar technology.
        </p>

        <h2>How We Use Cookies</h2>
        <p>We use cookies to:</p>
        <ul>
          <li>Ensure the proper functioning of our Website</li>
          <li>Remember your preferences and settings</li>
          <li>Analyze how you use our Website</li>
          <li>Provide you with personalized content and ads</li>
        </ul>

        <h2>Types of Cookies We Use</h2>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Necessary for the Website to
            function and cannot be switched off in our systems.
          </li>
          <li>
            <strong>Performance Cookies:</strong> Collect information about how
            visitors use our Website (e.g., Google Analytics).
          </li>
          <li>
            <strong>Functionality Cookies:</strong> Remember choices you make
            (e.g., language preferences) to provide a more personalized
            experience.
          </li>
          <li>
            <strong>Advertising Cookies:</strong> Track your online activity to
            help advertisers deliver more relevant ads or to limit the number of
            times you see an ad.
          </li>
        </ul>

        <h2>Managing Cookies</h2>
        <p>
          You can control and manage cookies in various ways. Please remember
          that removing or blocking cookies can impact your user experience and
          some functionality may no longer be available.
        </p>
        <ul>
          <li>
            <strong>Browser Settings:</strong> Most browsers allow you to manage
            cookies through their settings preferences. Refer to your
            browser&apos;s help section to learn more about how to adjust your
            cookie settings.
          </li>
          <li>
            <strong>Opt-Out Links:</strong> Some third-party cookies used for
            interest-based advertising can be opted out through industry groups
            such as the Digital Advertising Alliance (DAA) or the European
            Interactive Digital Advertising Alliance (EDAA).
          </li>
        </ul>
      </div>
    </>
  );
};

export default CookiePolicy;
