"use client";

import ThemeToggle from "../components/ThemeToggle";

export default function PrivacyContent() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
          <a href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            <img src="/assets/A11YOWL_logo.png" alt="" width={32} height={32} className="w-8 h-8" aria-hidden="true" />
            A11y Owl
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </a>
            <a href="/contact" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Contact
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="main-content" className="py-12 sm:py-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-10">
            Last updated: February 6, 2026
          </p>

          <div className="prose-section space-y-10">
            {/* Introduction */}
            <section>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                A11y Owl (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is a product of Logixtecs. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our website accessibility scanning service at a11yowl.com (the &ldquo;Service&rdquo;). By using the Service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            {/* What Data We Collect */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                1. What Data We Collect
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                We collect the following categories of information:
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
                    Information you provide directly
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-owl-accent mt-0.5" aria-hidden="true">&bull;</span>
                      <span><strong>Website URLs</strong> you submit for scanning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-owl-accent mt-0.5" aria-hidden="true">&bull;</span>
                      <span><strong>Email addresses</strong> you provide to receive scan reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-owl-accent mt-0.5" aria-hidden="true">&bull;</span>
                      <span><strong>Platform information</strong> (e.g., WordPress, Shopify) you optionally select during the scan process</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
                    Information collected automatically
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-owl-accent mt-0.5" aria-hidden="true">&bull;</span>
                      <span><strong>IP addresses</strong> for rate limiting and abuse prevention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-owl-accent mt-0.5" aria-hidden="true">&bull;</span>
                      <span><strong>Browser type and device information</strong> for service optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-owl-accent mt-0.5" aria-hidden="true">&bull;</span>
                      <span><strong>Usage data</strong> such as pages visited and scan interactions</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
                    Scan-related data
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-owl-accent mt-0.5" aria-hidden="true">&bull;</span>
                      <span><strong>Screenshots</strong> of your website captured during the scan process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-owl-accent mt-0.5" aria-hidden="true">&bull;</span>
                      <span><strong>Accessibility analysis results</strong> including issues found, severity ratings, and compliance scores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-owl-accent mt-0.5" aria-hidden="true">&bull;</span>
                      <span><strong>Generated PDF reports</strong> containing scan results and code fixes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Data */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                2. How We Use Your Data
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-1 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                  <span><strong>To perform accessibility scans</strong> of the URLs you submit</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-1 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                  <span><strong>To generate and deliver reports</strong> via email</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-1 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                  <span><strong>To generate reports</strong> and deliver them via email</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-1 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                  <span><strong>To prevent abuse</strong> and enforce rate limits</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-1 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                  <span><strong>To improve the Service</strong> by analyzing aggregate usage patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-1 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                  <span><strong>To send follow-up communications</strong> related to your scan results (you can opt out at any time)</span>
                </li>
              </ul>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                3. Data Retention
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">Data Type</th>
                      <th className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600 dark:text-slate-400">
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 pr-4">Scan results and reports</td>
                      <td className="py-3 pr-4">90 days after scan completion</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 pr-4">Screenshots captured during scans</td>
                      <td className="py-3 pr-4">30 days after scan completion</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 pr-4">Email addresses</td>
                      <td className="py-3 pr-4">Until you request deletion</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 pr-4">IP addresses and usage logs</td>
                      <td className="py-3 pr-4">30 days</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Generated PDF reports</td>
                      <td className="py-3 pr-4">90 days after generation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                After the retention period, data is permanently deleted from our systems and third-party storage providers. You may request earlier deletion at any time by contacting us.
              </p>
            </section>

            {/* Third Parties */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                4. Third-Party Services
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                We use the following third-party services to operate A11y Owl. Each has its own privacy policy governing the use of your data:
              </p>
              <div className="space-y-3">
                {[
                  {
                    name: "Google Gemini API",
                    purpose: "Vision AI analysis of website screenshots to identify accessibility issues and generate code fixes",
                  },
                  {
                    name: "Resend",
                    purpose: "Transactional email delivery for sending scan reports to your email address",
                  },
                  {
                    name: "Cloudflare R2",
                    purpose: "Secure cloud storage for screenshots, generated reports, and scan data",
                  },
                ].map((service) => (
                  <div key={service.name} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      <strong className="text-slate-900 dark:text-white">{service.name}:</strong>{" "}
                      {service.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* No Selling Data */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                5. We Do Not Sell Your Data
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                We do not sell, rent, or trade your personal information to any third parties. We do not share your data with advertisers or data brokers. Your scan data, email address, and URLs are used solely to provide the Service to you.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                6. Cookies
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                A11y Owl uses minimal cookies. We store a single cookie for your theme preference (light or dark mode). We do not use tracking cookies, advertising cookies, or third-party analytics cookies. No data is shared with advertising networks through our cookies.
              </p>
            </section>

            {/* CCPA / GDPR */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                7. Your Rights (CCPA / GDPR)
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Depending on your jurisdiction, you may have the following rights regarding your personal data:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    title: "Right to Access",
                    desc: "Request a copy of the personal data we hold about you.",
                  },
                  {
                    title: "Right to Deletion",
                    desc: "Request that we delete your personal data from our systems.",
                  },
                  {
                    title: "Right to Correction",
                    desc: "Request correction of any inaccurate personal data.",
                  },
                  {
                    title: "Right to Portability",
                    desc: "Receive your data in a structured, machine-readable format.",
                  },
                  {
                    title: "Right to Opt Out",
                    desc: "Opt out of any marketing communications at any time.",
                  },
                  {
                    title: "Right to Non-Discrimination",
                    desc: "Exercise your rights without receiving discriminatory treatment.",
                  },
                ].map((right) => (
                  <div key={right.title} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                      {right.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {right.desc}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:a11y@logixtecs.com" className="text-owl-accent hover:underline font-medium">
                  a11y@logixtecs.com
                </a>
                . We will respond to your request within 30 days.
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                8. Data Security
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                We implement reasonable administrative, technical, and physical security measures to protect your personal information. All data in transit is encrypted via TLS/HTTPS. Data at rest is stored in encrypted cloud storage. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Children */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                9. Children&apos;s Privacy
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                A11y Owl is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected data from a child under 13, we will delete it promptly.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                10. Changes to This Policy
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a revised &ldquo;Last updated&rdquo; date. Your continued use of the Service after any changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                11. Contact Us
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or wish to exercise your data rights, contact us at:
              </p>
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-white">A11y Owl (a product of Logixtecs)</strong>
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Email:{" "}
                  <a href="mailto:a11y@logixtecs.com" className="text-owl-accent hover:underline font-medium">
                    a11y@logixtecs.com
                  </a>
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Website:{" "}
                  <a href="https://a11yowl.com" className="text-owl-accent hover:underline font-medium">
                    a11yowl.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t border-slate-200 dark:border-slate-800" role="contentinfo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
                <img src="/assets/A11YOWL_logo.png" alt="" width={28} height={28} className="w-7 h-7" aria-hidden="true" />
                A11y Owl
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Accessibility scanning powered by vision AI.
              </p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                A product of <a href="https://www.logixtecs.com/" target="_blank" rel="noopener noreferrer" className="text-owl-accent hover:underline">Logixtecs</a>
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                &copy; {new Date().getFullYear()} A11y Owl. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
