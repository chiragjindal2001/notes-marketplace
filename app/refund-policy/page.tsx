"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">Cancellation and Refund Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Overview</h2>
              <p className="mb-3">
                At Civil Studies, we strive to provide high-quality educational content. This policy outlines our cancellation and refund procedures for digital products purchased through our platform.
              </p>
              <p>
                All transactions are processed securely through Razorpay, and refunds will be processed according to the guidelines outlined below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">2. Digital Product Nature</h2>
              <p className="mb-3">
                Please note that our notes are digital products (PDF files) that are delivered immediately upon successful payment. Due to the nature of digital products:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Once downloaded, the product cannot be "returned" in the traditional sense</li>
                <li>Digital products are non-tangible and cannot be physically returned</li>
                <li>Access to purchased content is granted immediately after payment confirmation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">3. Refund Eligibility</h2>
              <p className="mb-3">We may consider refunds in the following circumstances:</p>
              
              <h3 className="text-lg font-medium mb-2 text-gray-800">3.1 Technical Issues</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>File corruption or inability to download the purchased notes</li>
                <li>Incomplete or missing content in the PDF file</li>
                <li>Technical errors on our platform preventing access</li>
                <li>Duplicate charges due to system errors</li>
              </ul>

              <h3 className="text-lg font-medium mb-2 text-gray-800">3.2 Content Issues</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Significant discrepancy between advertised and actual content</li>
                <li>Poor quality or illegible content</li>
                <li>Content that violates our quality standards</li>
              </ul>

              <h3 className="text-lg font-medium mb-2 text-gray-800">3.3 Non-Eligible Cases</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Change of mind after successful download</li>
                <li>Dissatisfaction with content quality (subjective assessment)</li>
                <li>Inability to use the content due to personal technical limitations</li>
                <li>Sharing account credentials leading to unauthorized access</li>
                <li>Refund requests made after 7 days of purchase</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">4. Refund Process</h2>
              <p className="mb-3">To request a refund:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contact our support team at thecivilstudies@gmail.com within 7 days of purchase</li>
                <li>Provide your order ID and detailed reason for the refund request</li>
                <li>Include any relevant screenshots or evidence supporting your claim</li>
                <li>Our team will review your request within 2-3 business days</li>
                <li>If approved, refunds will be processed within 5-7 business days</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">5. Refund Methods</h2>
              <p className="mb-3">
                Approved refunds will be processed through the original payment method:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Credit/Debit Cards: Refunded to the original card (5-7 business days)</li>
                <li>UPI: Refunded to the original UPI ID (1-3 business days)</li>
                <li>Net Banking: Refunded to the original bank account (3-5 business days)</li>
                <li>Digital Wallets: Refunded to the original wallet (1-2 business days)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">6. Cancellation Policy</h2>
              <p className="mb-3">
                Order cancellations are only possible under specific circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Before the payment is processed and confirmed</li>
                <li>In case of technical errors preventing successful payment</li>
                <li>When requested within 1 hour of payment (if download hasn't occurred)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">7. Processing Time</h2>
              <p className="mb-3">
                Our refund processing timeline:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Refund request review: 2-3 business days</li>
                <li>Refund processing: 5-7 business days</li>
                <li>Bank processing time: Additional 3-5 business days (varies by bank)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">8. Contact Information</h2>
              <p className="mb-3">
                For refund requests or questions about this policy:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Email: thecivilstudies@gmail.com</li>
                <li>Response time: Within 24 hours on business days</li>
                <li>Please include your order ID in all communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">9. Dispute Resolution</h2>
              <p className="mb-3">
                If you disagree with our refund decision:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>You may request a review by our senior support team</li>
                <li>Provide additional evidence or clarification</li>
                <li>We will conduct a thorough review within 5 business days</li>
                <li>Final decisions are binding</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">10. Policy Updates</h2>
              <p>
                We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting on our website. Continued use of our service constitutes acceptance of the updated policy.
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