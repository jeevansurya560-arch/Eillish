import React from 'react';
import { StaticPageLayout } from '../components/layout/StaticPageLayout';

export const PrivacyPage: React.FC = () => {
  return (
    <StaticPageLayout
      title="Privacy Policy."
      subtitle="Plain-English commitments regarding your code, notes, and vector representations."
      badge="Data Protection & Privacy"
    >
      <div className="static-content-card">
        <div className="static-prose">
          <h2>1. Your Knowledge Remains Yours</h2>
          <p>
            Eillish is built with strict isolation boundaries. We never use your proprietary code, notes, or documentation
            to train foundation models. Your embeddings, vector indexes, and AST representations remain strictly within your
            designated tenant boundary.
          </p>

          <h2>2. What We Ingest and Store</h2>
          <p>When you link a repository or knowledge workspace to Eillish, we store:</p>
          <ul>
            <li>File paths, commit SHAs, and branch metadata.</li>
            <li>Abstract Syntax Tree chunks and section headers necessary for retrieval.</li>
            <li>Vector embedding floating-point arrays for semantic similarity matching.</li>
          </ul>

          <h2>3. End-to-End Encryption</h2>
          <p>
            All network communication occurs over TLS 1.3. Vector databases and index caches are encrypted at rest using
            AES-256 standards. When running in self-hosted mode, data never leaves your infrastructure.
          </p>

          <h2>4. Data Deletion and Retention</h2>
          <p>
            Disconnecting a repository permanently purges all associated AST chunks, vector embeddings, and search telemetry
            from our active indices within 60 seconds.
          </p>
        </div>
      </div>
    </StaticPageLayout>
  );
};
