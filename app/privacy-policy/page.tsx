"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Introduction</h2>
              <p className="mb-3">
                Civil Studies ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p>
                By using our service, you consent to the data practices described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">2. Information We Collect</h2>
              
              <h3 className="text-lg font-medium mb-2 text-gray-800">2.1 Personal Information</h3>
              <p className="mb-3">We may collect the following personal information:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Name and email address (for account creation)</li>
                <li>Phone number (optional, for account verification)</li>
                <li>Payment information (processed securely through Razorpay)</li>
                <li>Billing address (for payment processing)</li>
                <li>Profile information (preferences, study interests)</li>
              </ul>

              <h3 className="text-lg font-medium mb-2 text-gray-800">2.2 Usage Information</h3>
              <p className="mb-3">We automatically collect certain information when you use our service:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Browser type and version</li>
                <li>Pages visited and time spent on each page</li>
                <li>Error logs and performance data</li>
              </ul>

              <h3 className="text-lg font-medium mb-2 text-gray-800">2.3 Cookies and Tracking</h3>
              <p className="mb-3">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Remember your login status and preferences</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Improve our service and user experience</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">3. How We Use Your Information</h2>
              <p className="mb-3">We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Process and fulfill your orders</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send order confirmations and download links</li>
                <li>Improve our website and services</li>
                <li>Analyze usage patterns and trends</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">4. Information Sharing and Disclosure</h2>
              <p className="mb-3">We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
              
              <h3 className="text-lg font-medium mb-2 text-gray-800">4.1 Service Providers</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Payment processors (Razorpay) for transaction processing</li>
                <li>Cloud hosting providers for data storage</li>
                <li>Email service providers for communications</li>
                <li>Analytics services for website improvement</li>
              </ul>

              <h3 className="text-lg font-medium mb-2 text-gray-800">4.2 Legal Requirements</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Comply with applicable laws and regulations</li>
                <li>Respond to legal requests and court orders</li>
                <li>Protect our rights and property</li>
                <li>Prevent fraud and security threats</li>
              </ul>

              <h3 className="text-lg font-medium mb-2 text-gray-800">4.3 Business Transfers</h3>
              <p>
                In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">5. Data Security</h2>
              <p className="mb-3">We implement appropriate security measures to protect your information:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Secure payment processing through Razorpay</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure hosting and infrastructure</li>
                <li>Regular backups and disaster recovery procedures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">6. Data Retention</h2>
              <p className="mb-3">We retain your information for as long as necessary to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide our services and maintain your account</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Improve our services and user experience</li>
              </ul>
              <p className="mt-3">
                Account data is retained for 3 years after account deletion. Payment records are retained for 7 years as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">7. Your Rights and Choices</h2>
              <p className="mb-3">You have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access and review your personal information</li>
                <li>Update or correct inaccurate information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Control cookie preferences through browser settings</li>
                <li>Request data portability</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">8. Third-Party Services</h2>
              <p className="mb-3">Our service may contain links to third-party websites or integrate with third-party services:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Razorpay for payment processing</li>
                <li>Social media platforms for sharing</li>
                <li>Analytics and tracking services</li>
                <li>External content providers</li>
              </ul>
              <p className="mt-3">
                We are not responsible for the privacy practices of these third-party services. Please review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">9. Children's Privacy</h2>
              <p>
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">10. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">11. Changes to This Policy</h2>
              <p className="mb-3">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Posting the updated policy on our website</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying prominent notices on our website</li>
              </ul>
              <p className="mt-3">
                Your continued use of our service after changes become effective constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">12. Contact Us</h2>
              <p className="mb-3">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Support: thecivilstudies@gmail.com</li>
                <li>Response time: Within 48 hours</li>
              </ul>
            </section>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
} 