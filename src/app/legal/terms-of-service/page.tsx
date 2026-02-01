import { Callout } from "@/components/docs/callout";

export default function TermsOfServicePage() {
  return (
    <>
      <h1>Terms of Service</h1>
      <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
      
      <Callout>
        This is a template. Please replace this with your own Terms of Service. You should consult with a legal professional to ensure your policies are compliant and suit your needs.
      </Callout>

      <p>
        Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the [Your Website URL] website (the "Service") operated by LaunchBase ("us", "we", or "our").
      </p>
      <p>
        Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
      </p>

      <h2 id="accounts">1. Accounts</h2>
      <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
      <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>

      <h2 id="subscriptions">2. Subscriptions & Billing</h2>
      <p>Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.</p>
      <p>At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or we cancel it. You may cancel your Subscription renewal either through your online account management page or by contacting customer support.</p>
      
      <h2 id="acceptable-use">3. Acceptable Use</h2>
      <p>As a condition of your use of the Service, you agree not to use the Service for any purpose that is unlawful or prohibited by these Terms. You may not use the Service in any manner that could damage, disable, overburden, or impair any of our servers, or the network(s) connected to any of our servers.</p>

      <h2 id="ip">4. Intellectual Property</h2>
      <p>The Service and its original content, features and functionality are and will remain the exclusive property of LaunchBase and its licensors. The Service is protected by copyright, trademark, and other laws of both the [Your Country] and foreign countries.</p>

      <h2 id="termination">5. Termination</h2>
      <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
      <p>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.</p>

      <h2 id="disclaimer">6. Disclaimers</h2>
      <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>

      <h2 id="limitation-of-liability">7. Limitation of Liability</h2>
      <p>In no event shall LaunchBase, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

      <h2 id="governing-law">8. Governing Law</h2>
      <p>These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
      
       <h2 id="contact-us">9. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us at <code className="font-mono">legal@example.com</code>.</p>
    </>
  );
}
