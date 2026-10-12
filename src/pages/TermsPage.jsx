import { StaticPageLayout } from "../components/layout/StaticPageLayout";
const TermsPage = () => {
  return <StaticPageLayout
    title="Terms of Service."
    subtitle="Clear, fair terms governing your use of the Eillish knowledge operating system."
    badge="Legal & Terms"
  >
      <div className="static-content-card">
        <div className="static-prose">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using Eillish, you agree to be bound by these Terms of Service. If you are using Eillish on
            behalf of an organization, you represent that you have authority to bind that entity.
          </p>

          <h2>2. License & Acceptable Use</h2>
          <p>
            You are granted a non-exclusive license to index, explore, and reason over authorized repositories and documents.
            You agree not to use the platform to ingest malicious software, violate third-party copyrights, or conduct
            unauthorized penetration tests against our infrastructure.
          </p>

          <h2>3. Service Availability & Telemetry</h2>
          <p>
            While we strive for 99.9% uptime across all index pipelines, Eillish is provided on an "as is" and "as available"
            basis. Simulated metrics on analytics pages are clearly designated as demo data for visualization purposes.
          </p>

          <h2>4. Limitation of Liability</h2>
          <p>
            Eillish assists in knowledge discovery and code comprehension; developers remain ultimately responsible for
            verifying generated suggestions, code deployments, and software safety.
          </p>
        </div>
      </div>
    </StaticPageLayout>;
};
export {
  TermsPage
};
