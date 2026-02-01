import { Callout } from "@/components/docs/callout";

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
      
      <Callout>
        This is a template. Please replace this with your own Privacy Policy. You should consult with a legal professional to ensure your policies are compliant and suit your needs.
      </Callout>

      <p>
        LaunchBase ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
      </p>

      <h2 id="data-we-collect">1. Information We Collect</h2>
      <p>We may collect information about you in a variety of ways. The information we may collect on the Service includes:</p>
      <ul>
        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Service.</li>
        <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Service, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Service.</li>
        <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Service. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor (e.g., Stripe), and you are encouraged to review their privacy policy and contact them directly for responses to your questions.</li>
      </ul>

      <h2 id="how-we-use-data">2. How We Use Your Information</h2>
      <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:</p>
      <ul>
        <li>Create and manage your account.</li>
        <li>Process your payments and refunds.</li>
        <li>Email you regarding your account or order.</li>
        <li>Monitor and analyze usage and trends to improve your experience with the Service.</li>
        <li>Notify you of updates to the Service.</li>
        <li>Offer new products, services, and/or recommendations to you.</li>
      </ul>

      <h2 id="cookies">3. Cookies and Tracking Technologies</h2>
      <p>
        We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Service to help customize the Service and improve your experience. When you access the Service, your personal information is not collected through the use of tracking technology.
      </p>
      
      <h2 id="data-retention">4. Data Retention</h2>
      <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).</p>

      <h2 id="user-rights">5. Your Rights</h2>
      <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>
      <ul>
        <li>The right to access, update or to delete the information we have on you.</li>
        <li>The right of rectification.</li>
        <li>The right to object.</li>
        <li>The right of restriction.</li>
        <li>The right to data portability.</li>
        <li>The right to withdraw consent.</li>
      </ul>

      <h2 id="contact-us">6. Contact Us</h2>
      <p>If you have questions or comments about this Privacy Policy, please contact us at: <code className="font-mono">legal@example.com</code>.</p>
    </>
  );
}
