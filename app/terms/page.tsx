"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Acceptance of Terms</h2>
              <p className="mb-3">
                By accessing and using Civil Studies ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <p>
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">2. Description of Service</h2>
              <p className="mb-3">
                Civil Studies is an online platform that provides educational notes, study materials, and academic resources for students and educators.
              </p>
              <p>
                The Service allows users to browse, purchase, and download educational content in PDF format.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">3. User Accounts</h2>
              <p className="mb-3">
                To access certain features of the Service, you must create an account. You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information during registration</li>
                <li>Notifying us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">4. Payment Terms</h2>
              <p className="mb-3">
                All purchases are processed securely through Razorpay. By making a purchase, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Pay the specified price for the selected notes</li>
                <li>Provide accurate payment information</li>
                <li>Authorize the transaction through your chosen payment method</li>
                <li>Accept our refund policy as outlined in our Cancellation and Refund Policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">5. Intellectual Property Rights</h2>
              <p className="mb-3">
                All content available on Civil Studies, including but not limited to notes, text, graphics, and software, is the property of Civil Studies or its content providers and is protected by copyright laws.
              </p>
              <p className="mb-3">
                By purchasing notes, you are granted a limited, non-exclusive, non-transferable license to use the content for personal, non-commercial purposes only.
              </p>
              <p>
                You may not reproduce, distribute, modify, or create derivative works from the purchased content without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">6. Prohibited Uses</h2>
              <p className="mb-3">You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Upload or distribute malicious software</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the Service for any commercial purpose without permission</li>
                <li>Share your account credentials with others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">7. Privacy Policy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">8. Disclaimers</h2>
              <p className="mb-3">
                The Service is provided "as is" without warranties of any kind. Civil Studies does not guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The accuracy or completeness of any content</li>
                <li>That the Service will be uninterrupted or error-free</li>
                <li>That defects will be corrected</li>
                <li>The results of using the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">9. Limitation of Liability</h2>
              <p>
                In no event shall Civil Studies be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the Service constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">11. Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at thecivilstudies@gmail.com
              </p>
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