import { CheckCircle } from "lucide-react";
import { Callout } from "@/components/docs/callout";

export default function SecurityPage() {
  return (
    <>
      <h1>Security at LaunchBase</h1>
      <p className="lead">
        We take the security of your data very seriously. This page provides an overview of the security measures we have in place to protect your information and ensure the integrity of our platform.
      </p>

      <Callout>
        This page contains template information. The security measures described are best practices that this starter kit is designed to support, but you are responsible for your own implementation and security practices.
      </Callout>

      <h2 id="data-encryption">Data Encryption</h2>
      <ul>
        <li><strong>In Transit:</strong> All data transmitted between you and our servers is encrypted using industry-standard TLS (Transport Layer Security) 1.2 or higher.</li>
        <li><strong>At Rest:</strong> All database data, files, and backups are encrypted at rest using AES-256 encryption.</li>
      </ul>

      <h2 id="authentication-security">Authentication Security</h2>
      <ul>
        <li><strong>Secure Passwords:</strong> We use Firebase Authentication, which stores passwords using secure hashing algorithms.</li>
        <li><strong>Two-Factor Authentication (2FA):</strong> Users can enable 2FA on their accounts for an added layer of security.</li>
        <li><strong>Session Management:</strong> Secure, http-only cookies are used for session management to protect against XSS attacks.</li>
      </ul>

      <h2 id="infrastructure">Infrastructure</h2>
      <ul>
        <li><strong>Cloud Provider:</strong> Our infrastructure is hosted on Google Cloud Platform (GCP), which provides a secure, state-of-the-art physical and network infrastructure.</li>
        <li><strong>Firewalls:</strong> We employ multi-layered firewall and network security rules to control access to our systems.</li>
        <li><strong>Vulnerability Scanning:</strong> We perform regular automated vulnerability scanning of our infrastructure and applications.</li>
      </ul>

      <h2 id="incident-response">Incident Response</h2>
      <p>
        In the event of a security breach, we have an incident response plan in place. We will promptly notify affected users of any unauthorized access to their personal information.
      </p>

      <h2 id="responsible-disclosure">Responsible Disclosure</h2>
      <p>
        If you believe you have discovered a security vulnerability in our platform, please let us know. We are committed to working with security researchers to verify and address any potential vulnerabilities.
      </p>
      <p>
        Please email a report to <code className="font-mono">security@example.com</code>. We will respond as quickly as possible to your report. We request that you do not publicly disclose the issue until we have had a chance to address it.
      </p>
    </>
  );
}
