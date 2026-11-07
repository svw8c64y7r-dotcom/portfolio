export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'VAPT' | 'SOC' | 'DFIR' | 'GRC';
  publishedDate: string;
  readTime: string;
  author: string;
  summary: string;
  tags: string[];
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
      codeSnippet?: {
        language: string;
        code: string;
      };
      callout?: string;
    }[];
    remediationOrTakeaway: string;
  };
}

export const blogPostsData: BlogPost[] = [
  {
    id: 'blog-01',
    slug: 'hunting-broken-access-control-owasp',
    title: 'Hunting Broken Object Level Authorization (BOLA/IDOR) in Modern REST APIs',
    category: 'VAPT',
    publishedDate: 'January 2026',
    readTime: '6 min read',
    author: 'Sri Ragav Surya A',
    summary: 'A deep-dive technical methodology for identifying and exploiting Insecure Direct Object References in cloud-native microservices during manual web penetration tests.',
    tags: ['VAPT', 'OWASP Top 10', 'BOLA', 'API Security', 'Burp Suite'],
    content: {
      introduction: 'Broken Object Level Authorization (BOLA / IDOR) continues to dominate modern application security assessments as the #1 flaw in the OWASP Top 10 (A01:2021). Microservice architectures frequently decouple routing from centralized permission checks, leading to severe authorization lapses.',
      sections: [
        {
          heading: 'Reconnaissance & Endpoint Pattern Analysis',
          body: 'During manual penetration testing, identification begins by enumerating predictable entity identifiers in request URLs, request bodies, and custom headers. Look for sequential integers or enumerable user handles.',
          codeSnippet: {
            language: 'http',
            code: `// Initial inspection request
GET /api/v2/documents/export?doc_id=10842 HTTP/1.1
Host: api.enterprise.internal
Authorization: Bearer <attacker_jwt_token>

// Server verifies token signature but fails to check whether doc_id 10842 belongs to the token user.`
          },
          callout: 'Pro Tip: Always test whether client-supplied parameters in sub-routes override claims inside the JWT token context.'
        },
        {
          heading: 'Multi-User Authorization Matrix Testing with Burp Suite',
          body: 'We utilize Burp Suite extensions like AutoRepeater or Autorun Matrix to replay requests from User A with the session token of User B. If the endpoint returns 200 OK with the victim data payload instead of 403 Forbidden, BOLA is confirmed.',
          codeSnippet: {
            language: 'python',
            code: `# Automated Python check for IDOR verification
import requests

def test_idor(target_id, auth_token):
    url = f"https://target.internal/api/v2/documents/export?doc_id={target_id}"
    headers = {"Authorization": f"Bearer {auth_token}"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200 and "owner_id" in response.text:
        print(f"[!] IDOR CONFIRMED on resource ID: {target_id}")
    else:
        print(f"[-] Access denied or not found: {response.status_code}")`
          }
        }
      ],
      remediationOrTakeaway: 'Always validate authorization at the controller or service layer using a session-backed tenant context rather than trust client-supplied ID parameters.'
    }
  },
  {
    id: 'blog-02',
    slug: 'wazuh-siem-threat-detection-rules',
    title: 'Engineering Custom Detection Rules in Wazuh SIEM for C2 Beaconing Signatures',
    category: 'SOC',
    publishedDate: 'December 2025',
    readTime: '7 min read',
    author: 'Sri Ragav Surya A',
    summary: 'Constructing robust log correlation rules in Wazuh SIEM to detect command-and-control beaconing patterns and anomalous persistence on hybrid endpoints.',
    tags: ['SOC', 'SIEM', 'Wazuh', 'Threat Hunting', 'MITRE ATT&CK'],
    content: {
      introduction: 'Modern adversaries evade conventional signature detection by blending beaconing traffic with legitimate HTTP/TLS queries. By combining host telemetry from Sysmon with network logs in Wazuh, SOC analysts can build reliable behavioral detection triggers.',
      sections: [
        {
          heading: 'Telemetry Ingestion & Sysmon Event 3 Correlation',
          body: 'To track beaconing, we look for processes spawning repetitive network connections to unclassified external IP addresses with consistent time intervals (jitter). Sysmon Event ID 3 (Network Connection) captures process paths, destination ports, and IPs.',
          codeSnippet: {
            language: 'xml',
            code: `<!-- Custom Wazuh Detection Rule for C2 Anomaly -->
<group name="sysmon,c2_detection,">
  <rule id="100340" level="12">
    <if_sid>60103</if_sid>
    <field name="win.eventdata.image">powershell.exe|cmd.exe|rundll32.exe</field>
    <field name="win.eventdata.destinationPort">443|8443|8080</field>
    <description>Suspicious Process Spawned Outbound Network Connection (Potential C2 Beacon)</description>
    <mitre>
      <id>T1071.001</id>
      <id>T1059.001</id>
    </mitre>
  </rule>
</group>`
          },
          callout: 'Correlate with threat intelligence feeds (AlienVault OTX / AbuseIPDB) to lower false positives on legitimate administrative remote sessions.'
        }
      ],
      remediationOrTakeaway: 'Effective threat detection relies on baseline behavioral anomaly detection rather than static IP blacklists, enabling rapid tier-1 SOC containment.'
    }
  },
  {
    id: 'blog-03',
    slug: 'volatile-memory-forensics-volatility3',
    title: 'Volatile Memory Forensics: Uncovering Process Hollowing with Volatility 3',
    category: 'DFIR',
    publishedDate: 'November 2025',
    readTime: '8 min read',
    author: 'Sri Ragav Surya A',
    summary: 'A step-by-step practical guide to acquiring raw RAM dumps and using Volatility 3 plugins to isolate unlinked processes, suspicious VAD permissions, and hollowed executables.',
    tags: ['DFIR', 'Volatility 3', 'Memory Forensics', 'Incident Response', 'Malware'],
    content: {
      introduction: 'Malware frequently employs Process Hollowing (MITRE T1055.012) to evade disk-based endpoint protection by hollowing out a legitimate process (like svchost.exe or explorer.exe) and writing malicious shellcode into memory.',
      sections: [
        {
          heading: 'Process Triage with pslist vs. psscan',
          body: 'Malware often unlinks its EPROCESS block from the active process list (`ActiveProcessLinks`). Comparing `windows.pslist` with `windows.psscan` reveals discrepancies indicating hidden processes.',
          codeSnippet: {
            language: 'bash',
            code: `# Step 1: Enumerate running processes
python3 vol.py -f memory.raw windows.pslist

# Step 2: Scan memory pools for unlinked EPROCESS structures
python3 vol.py -f memory.raw windows.psscan

# Step 3: Identify Virtual Address Descriptor (VAD) anomalies (PAGE_EXECUTE_READWRITE)
python3 vol.py -f memory.raw windows.malfind --pid 3488`
          },
          callout: 'Look for memory regions marked as PAGE_EXECUTE_READWRITE (RWX) containing MZ or PE headers where no file backing exists on disk.'
        }
      ],
      remediationOrTakeaway: 'Memory forensics provides the ultimate ground truth in incident response, revealing in-memory payload injections that leave zero traces on disk.'
    }
  },
  {
    id: 'blog-04',
    slug: 'implementing-iso27001-access-control-framework',
    title: 'Implementing ISO/IEC 27001:2022 Access Control Policies in Cloud Infrastructures',
    category: 'GRC',
    publishedDate: 'October 2025',
    readTime: '5 min read',
    author: 'Sri Ragav Surya A',
    summary: 'A pragmatic walkthrough translating ISO/IEC 27001 Annex A.8 controls into enforceable IAM policies and audit logs across enterprise cloud architectures.',
    tags: ['GRC', 'ISO 27001', 'Access Control', 'Compliance', 'Security Governance'],
    content: {
      introduction: 'Aligning technical architectures with ISO/IEC 27001:2022 standards requires translating high-level policy frameworks into automated, enforceable identity and access management controls.',
      sections: [
        {
          heading: 'Control A.8.2: Privileged Access Rights & Least Privilege',
          body: 'Annex A.8.2 mandates strict isolation of administrative credentials. In practice, this requires multi-factor authentication (MFA) enforcement, ephemeral Just-In-Time (JIT) access tokens, and automated access reviews.',
          codeSnippet: {
            language: 'json',
            code: `// Sample Enforced Least-Privilege Policy Statement
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "EnforceMFAForSensitiveActions",
      "Effect": "Deny",
      "Action": ["secops:*", "iam:*"],
      "Resource": "*",
      "Condition": {
        "BoolIfExists": { "aws:MultiFactorAuthPresent": "false" }
      }
    }
  ]
}`
          }
        }
      ],
      remediationOrTakeaway: 'Continuous compliance auditing and automated configuration tracking transform static policy documents into resilient, audited security posture.'
    }
  }
];

