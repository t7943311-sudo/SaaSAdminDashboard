import { Callout } from "@/components/docs/callout";

export default function AcceptableUsePage() {
  return (
    <>
      <h1>Acceptable Use Policy</h1>
      <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
      
      <Callout>
        This is a template. Please replace this with your own Acceptable Use Policy. You should consult with a legal professional to ensure your policies are compliant and suit your needs.
      </Callout>

      <p>
        This Acceptable Use Policy ("AUP") governs your use of the services ("Services") provided by LaunchBase ("we," "us," or "our") and is incorporated by reference into our Terms of Service. By using our Services, you agree to this AUP.
      </p>

      <h2 id="prohibited-activities">Prohibited Activities</h2>
      <p>
        You may not use the Services for any illegal, harmful, or fraudulent activities, or to transmit, store, display, distribute or otherwise make available content that is illegal, harmful, or fraudulent. Prohibited activities or content include:
      </p>
      <ul>
        <li><strong>Illegal, Harmful, or Fraudulent Activities.</strong> Any activities that are illegal under applicable law, that are harmful to others, or that would subject us to liability, including, but not limited to, activities that are fraudulent, defamatory, or deceptive.</li>
        <li><strong>Infringing Content.</strong> Content that infringes or misappropriates the intellectual property or proprietary rights of others.</li>
        <li><strong>Offensive Content.</strong> Content that is defamatory, obscene, abusive, invasive of privacy, or otherwise objectionable, including content that constitutes child pornography or that is adult in nature.</li>
        <li><strong>Harmful Content.</strong> Content or other computer technology that may damage, interfere with, surreptitiously intercept, or expropriate any system, program, or data, including viruses, Trojan horses, worms, time bombs, or cancelbots.</li>
        <li><strong>Spam.</strong> Unsolicited commercial email or other forms of "spam". This includes any activities that violate the CAN-SPAM Act of 2003.</li>
      </ul>

      <h2 id="system-abuse">System Abuse</h2>
      <p>
        You may not use the Services to violate the security or integrity of any network, computer or communications system, software application, or network or computing device (each, a "System"). Prohibited activities include:
      </p>
      <ul>
        <li><strong>Unauthorized Access.</strong> Accessing or using any System without permission, including attempting to probe, scan, or test the vulnerability of a System or to breach any security or authentication measures used by a System.</li>
        <li><strong>Interception.</strong> Monitoring of data or traffic on a System without permission.</li>
        <li><strong>Falsification of Origin.</strong> Forging TCP-IP packet headers, email headers, or any part of a message describing its origin or route.</li>
      </ul>

      <h2 id="enforcement">Enforcement</h2>
      <p>
        We reserve the right, but do not assume the obligation, to investigate any violation of this AUP or misuse of the Services. We may:
      </p>
      <ul>
        <li>Investigate violations of this AUP or misuse of the Services;</li>
        <li>Remove, disable access to, or modify any content or resource that violates this AUP or any other agreement we have with you for use of the Services;</li>
        <li>Report any activity that we suspect violates any law or regulation to appropriate law enforcement officials, regulators, or other appropriate third parties; or</li>
        <li>Suspend or terminate your access to the Services.</li>
      </ul>

      <h2 id="reporting-violations">Reporting Violations</h2>
      <p>
        If you become aware of any violation of this AUP, you will immediately notify us and provide us with assistance, as requested, to stop or remedy the violation. To report any violation, please contact us at <code className="font-mono">legal@example.com</code>.
      </p>
    </>
  );
}
