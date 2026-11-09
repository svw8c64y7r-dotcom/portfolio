export interface MitreMapping {
  techniqueId: string;
  techniqueName: string;
  tacticId: string;
  tacticName: string;
}

export interface VulnerabilityFinding {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';
  cvssScore: number;
  cvssVector: string;
  category: string;
  affectedComponent: string;
  description: string;
  impact: string;
  pocSnippet?: {
    request: string;
    response: string;
  };
  remediation: string[];
  status: 'Verified & Documented' | 'Remediated';
  mitreAttack?: MitreMapping[];
}

export interface VaptAssessment {
  id: string;
  assessmentTitle: string;
  targetScope: string;
  methodology: string;
  assessmentType: 'Grey-Box Web Application Penetration Test' | 'Black-Box VAPT';
  dateConducted: string;
  summary: string;
  statistics: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  findings: VulnerabilityFinding[];
  reportDownloadUrl?: string;
}

export const vaptAssessmentData: VaptAssessment = {
  id: 'vapt-web-2025',
  assessmentTitle: 'Web Application Security Assessment & VAPT',
  targetScope: 'Production & Staging Web Application Components (*.domain.com)',
  methodology: 'OWASP Web Security Testing Guide (WSTG v4.2) & NIST SP 800-115',
  assessmentType: 'Grey-Box Web Application Penetration Test',
  dateConducted: 'Q1 2025',
  summary: 'Conducted systematic vulnerability assessment and penetration testing across authentication mechanisms, session management, access control boundaries, and input processing endpoints to uncover OWASP Top 10 vulnerabilities and business logic flaws.',
  statistics: {
    critical: 0,
    high: 2,
    medium: 2,
    low: 1,
    info: 2
  },
  reportDownloadUrl: 'https://github.com/svw8c64y7r-dotcom/Epoteck_Report',
  findings: [
    {
      id: 'VULN-01',
      title: 'Broken Object Level Authorization (BOLA / IDOR) in API Endpoints',
      severity: 'High',
      cvssScore: 8.6,
      cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N',
      category: 'OWASP A01:2021 - Broken Access Control',
      affectedComponent: '/api/v1/user/records/{record_id}',
      description: 'The endpoint failed to validate whether the authenticated tenant session possessed authorization to access resources referenced by the record_id parameter, permitting unauthorized access to adjacent tenant records.',
      impact: 'An authenticated user could alter identifier parameters to inspect, exfiltrate, or manipulate records belonging to other users.',
      pocSnippet: {
        request: `GET /api/v1/user/records/10492 HTTP/1.1\nHost: target.internal\nAuthorization: Bearer <tenant_user_token>\nAccept: application/json`,
        response: `HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "record_id": 10492,\n  "owner": "victim_user@corp.internal",\n  "sensitive_data": "CONFIDENTIAL_PII_DATA"\n}`
      },
      remediation: [
        'Enforce strict server-side authorization checks verifying that the requesting user context owns the requested resource ID.',
        'Adopt indirect reference maps or non-sequential UUIDs (v4) to prevent sequential enumeration.',
        'Implement automated role-based access control (RBAC) unit and integration tests.'
      ],
      status: 'Verified & Documented',
      mitreAttack: [
        { techniqueId: 'T1190', techniqueName: 'Exploit Public-Facing Application', tacticId: 'TA0001', tacticName: 'Initial Access' },
        { techniqueId: 'T1078', techniqueName: 'Valid Accounts – Auth Bypass via IDOR', tacticId: 'TA0001', tacticName: 'Initial Access' },
        { techniqueId: 'T1530', techniqueName: 'Data from Cloud Storage', tacticId: 'TA0009', tacticName: 'Collection' }
      ]
    },
    {
      id: 'VULN-02',
      title: 'SQL Injection via Search Filter Parameter',
      severity: 'High',
      cvssScore: 8.2,
      cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
      category: 'OWASP A03:2021 - Injection',
      affectedComponent: '/catalog/search?category=query',
      description: 'User-supplied query parameters were dynamically concatenated directly into backend database query strings without parameterized sanitization or prepared statements.',
      impact: 'Unauthenticated threat actors could extract sensitive schema metadata, bypass authentication barriers, or read sensitive database tables.',
      pocSnippet: {
        request: `GET /catalog/search?category=electronics' OR 1=1-- HTTP/1.1\nHost: target.internal\nUser-Agent: BurpSuite/Pro`,
        response: `HTTP/1.1 200 OK\nContent-Type: text/html\n\n<!-- Returns complete unpaginated catalog records bypassing category filters -->`
      },
      remediation: [
        'Mandate parameterized queries and prepared statements (e.g., JPA / Hibernate / PreparedStatement in Java, SQLAlchemy in Python).',
        'Employ strict input validation using allowlists for acceptable alphanumeric patterns.',
        'Configure database user accounts with least-privilege access rights.'
      ],
      status: 'Verified & Documented',
      mitreAttack: [
        { techniqueId: 'T1190', techniqueName: 'Exploit Public-Facing Application', tacticId: 'TA0001', tacticName: 'Initial Access' },
        { techniqueId: 'T1059.006', techniqueName: 'Command & Scripting Interpreter: Python (SQLi Auth Bypass)', tacticId: 'TA0002', tacticName: 'Execution' },
        { techniqueId: 'T1005', techniqueName: 'Data from Local System (DB Exfiltration)', tacticId: 'TA0009', tacticName: 'Collection' }
      ]
    },
    {
      id: 'VULN-03',
      title: 'Improper Input Sanitization Leading to Reflected Cross-Site Scripting (XSS)',
      severity: 'Medium',
      cvssScore: 6.1,
      cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N',
      category: 'OWASP A03:2021 - Injection',
      affectedComponent: '/feedback/view?ref=',
      description: 'The application reflected arbitrary parameter strings into HTML response bodies without contextual HTML entity encoding.',
      impact: 'Execution of malicious JavaScript within the context of a victim user session, potentially facilitating session hijacking or credential theft.',
      pocSnippet: {
        request: `GET /feedback/view?ref=%3Cscript%3Econsole.log(document.domain)%3C/script%3E HTTP/1.1\nHost: target.internal`,
        response: `HTTP/1.1 200 OK\nContent-Type: text/html\n\n<div>Referrer: <script>console.log(document.domain)</script></div>`
      },
      remediation: [
        'Apply contextual output encoding using verified security libraries (e.g. OWASP Java Encoder) before rendering dynamic data.',
        'Deploy a robust Content Security Policy (CSP) restricting inline script execution (`default-src "self"`).',
        'Set `HttpOnly` and `SameSite=Strict` flags on all session identifiers.'
      ],
      status: 'Verified & Documented',
      mitreAttack: [
        { techniqueId: 'T1059.007', techniqueName: 'Command & Scripting Interpreter: JavaScript', tacticId: 'TA0002', tacticName: 'Execution' },
        { techniqueId: 'T1185', techniqueName: 'Browser Session Hijacking (Cookie Theft)', tacticId: 'TA0006', tacticName: 'Credential Access' }
      ]
    },
    {
      id: 'VULN-04',
      title: 'Information Disclosure via Verbose Stack Traces & Debug Endpoints',
      severity: 'Medium',
      cvssScore: 5.3,
      cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
      category: 'OWASP A05:2021 - Security Misconfiguration',
      affectedComponent: '/actuator/env & Unhandled Exception Handlers',
      description: 'Application exceptions produced complete Java stack traces, disclosing server framework versions, internal class paths, and server environment variables.',
      impact: 'Enables precise target reconnaissance, revealing framework versions and internal architectural topologies to adversaries.',
      pocSnippet: {
        request: `POST /api/v1/auth/verify HTTP/1.1\nHost: target.internal\nContent-Type: application/json\n\n{ invalid_json }`,
        response: `HTTP/1.1 500 Internal Server Error\n\norg.springframework.http.converter.HttpMessageNotReadableException: JSON parse error at com.app.security.filter...`
      },
      remediation: [
        'Disable verbose error messages in production configurations (`server.error.include-stacktrace=never`).',
        'Restrict actuator and management endpoints to private loopback interfaces with strict role authentication.',
        'Implement centralized global exception handling returning standardized, generic error responses.'
      ],
      status: 'Verified & Documented',
      mitreAttack: [
        { techniqueId: 'T1082', techniqueName: 'System Information Discovery', tacticId: 'TA0007', tacticName: 'Discovery' },
        { techniqueId: 'T1592', techniqueName: 'Gather Victim Host Information', tacticId: 'TA0043', tacticName: 'Reconnaissance' }
      ]
    },
    {
      id: 'VULN-05',
      title: 'Missing HTTP Security Headers (CSP & HSTS)',
      severity: 'Low',
      cvssScore: 3.7,
      cvssVector: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N',
      category: 'OWASP A05:2021 - Security Misconfiguration',
      affectedComponent: 'HTTP Gateway Response Headers',
      description: 'The web application failed to include Content-Security-Policy (CSP) and HTTP Strict Transport Security (HSTS) headers across HTTPS responses.',
      impact: 'Increases susceptibility to SSL-stripping man-in-the-middle attacks and reflected cross-site scripting exploitation.',
      remediation: [
        'Configure `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` header on reverse proxies.',
        'Implement standard `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, and `X-Frame-Options: SAMEORIGIN` headers.'
      ],
      status: 'Verified & Documented',
      mitreAttack: [
        { techniqueId: 'T1557', techniqueName: 'Adversary-in-the-Middle (SSL Stripping)', tacticId: 'TA0006', tacticName: 'Credential Access' },
        { techniqueId: 'T1562.001', techniqueName: 'Impair Defenses: Missing Security Headers', tacticId: 'TA0005', tacticName: 'Defense Evasion' }
      ]
    }
  ]
};

