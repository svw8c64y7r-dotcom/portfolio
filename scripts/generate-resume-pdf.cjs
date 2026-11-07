const fs = require('fs');
const path = require('path');

// Ensure target directory exists
const dir = path.join(__dirname, '..', 'public', 'resume');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Minimal valid PDF generator without external dependencies
function generateResumePdf() {
  const content = [
    "%PDF-1.4",
    "1 0 obj",
    "<< /Type /Catalog /Pages 2 0 R >>",
    "endobj",
    "2 0 obj",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "endobj",
    "3 0 obj",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "endobj",
    "4 0 obj",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "endobj",
    "5 0 obj",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "endobj"
  ];

  // PDF stream lines
  const streamLines = [
    "BT",
    "/F1 20 Tf",
    "50 740 Td",
    "(SRI RAGAV SURYA A) Tj",
    "/F2 10 Tf",
    "0 -18 Td",
    "(Cybersecurity Professional | Security Researcher | Penetration Tester | SOC Analyst | DFIR | GRC) Tj",
    "0 -14 Td",
    "(Location: Coimbatore, Tamil Nadu, India | Email: sriragavsurya@gmail.com | Phone: +91 8870726999) Tj",
    "0 -14 Td",
    "(LinkedIn: linkedin.com/in/sri-ragav-surya | GitHub: github.com/svw8c64y7r-dotcom) Tj",
    "0 -24 Td",
    "/F1 12 Tf",
    "(PROFESSIONAL SUMMARY) Tj",
    "/F2 9.5 Tf",
    "0 -14 Td",
    "(Pursuing M.Sc. in Information Security and Digital Forensics at Karunya Institute of Technology and Science.) Tj",
    "0 -12 Td",
    "(Practical experience in web application security testing, VAPT, Burp Suite, Nmap, Wireshark, Kali Linux.) Tj",
    "0 -12 Td",
    "(Active participant in competitive Capture The Flag (CTF) challenges and practical forensic laboratories.) Tj",
    "0 -22 Td",
    "/F1 12 Tf",
    "(WORK EXPERIENCE) Tj",
    "/F1 10 Tf",
    "0 -14 Td",
    "(Cyber Security Engineer - Pitowings (Feb 2025 - May 2025)) Tj",
    "/F2 9 Tf",
    "0 -12 Td",
    "(- Performed manual testing and VAPT on web applications using Burp Suite, Nmap and Dirb.) Tj",
    "0 -11 Td",
    "(- Identified OWASP Top 10 vulnerabilities, security misconfigurations and business logic flaws.) Tj",
    "0 -11 Td",
    "(- Prepared comprehensive security assessment reports with risk ratings, PoCs, and remediation guidance.) Tj",
    "0 -11 Td",
    "(- Communicated security findings to engineering and development teams for remediation.) Tj",
    "0 -20 Td",
    "/F1 12 Tf",
    "(EDUCATION) Tj",
    "/F1 9.5 Tf",
    "0 -13 Td",
    "(M.Sc. Information Security & Digital Forensics | Karunya Institute of Technology and Science (2025 - 2027) | CGPA: 8.3/10) Tj",
    "0 -12 Td",
    "(B.Sc. Information Security & Digital Forensics | Karunya Institute of Technology and Science (2022 - 2025) | CGPA: 6.0/10) Tj",
    "0 -20 Td",
    "/F1 12 Tf",
    "(KEY PROJECTS) Tj",
    "/F1 9.5 Tf",
    "0 -13 Td",
    "(Advanced Web Vulnerability Scanner (2026) - Python, Requests, HTML Parsing) Tj",
    "/F2 9 Tf",
    "0 -11 Td",
    "(  - Automated crawler with depth limits, SQLi, XSS, Open Redirect, and Directory Traversal detection.) Tj",
    "/F1 9.5 Tf",
    "0 -13 Td",
    "(Epoteck Full-Stack Website (2026) - Java, Spring Framework, REST APIs) Tj",
    "/F2 9 Tf",
    "0 -11 Td",
    "(  - RESTful APIs, Spring Security authentication/authorization, database operations, and secure coding.) Tj",
    "/F1 9.5 Tf",
    "0 -13 Td",
    "(OWASP Top 10 Assessment, DFIR Lab & Security Monitoring SOC Lab (Practical Exercises)) Tj",
    "/F2 9 Tf",
    "0 -11 Td",
    "(  - Hands-on testing, memory forensics (Volatility 3), disk analysis (Autopsy), and SIEM monitoring (Wazuh).) Tj",
    "0 -20 Td",
    "/F1 12 Tf",
    "(HONORS & ACHIEVEMENTS) Tj",
    "/F2 9 Tf",
    "0 -13 Td",
    "(- 4th Place: International-Level CTF hosted by Karunya Institute of Technology and Science) Tj",
    "0 -11 Td",
    "(- Top 50: DEFCON CTF Competitive Standing) Tj",
    "0 -11 Td",
    "(- National-Level CTF Participation: PicoCTF, Hack The Box, TryHackMe (Web, DFIR, Crypto, Pwn)) Tj",
    "0 -20 Td",
    "/F1 12 Tf",
    "(CERTIFICATIONS & SKILLS) Tj",
    "/F2 9 Tf",
    "0 -13 Td",
    "(- Certified Social Engineering Defense Practitioner (SecOps Group) | CompTIA Network+ & A+ (Coursework/Training)) Tj",
    "0 -11 Td",
    "(- Core Skills: Burp Suite, Nmap, Wireshark, Volatility 3, Autopsy, Wazuh, Python, Java, ISO 27001, GDPR) Tj",
    "ET"
  ];

  const streamContent = streamLines.join("\n");
  const streamLength = Buffer.byteLength(streamContent, 'utf-8');

  content.push("6 0 obj");
  content.push(`<< /Length ${streamLength} >>`);
  content.push("stream");
  content.push(streamContent);
  content.push("endstream");
  content.push("endobj");

  // Calculate xref offsets
  let offset = 0;
  const xref = ["xref", "0 7", "0000000000 65535 f "];
  const objOffsets = [];

  // Rebuild whole pdf with byte tracking
  let rawPdf = "%PDF-1.4\n";
  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n",
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `6 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj\n`
  ];

  offset = Buffer.byteLength(rawPdf, 'binary');
  for (const obj of objects) {
    const pad = String(offset).padStart(10, '0');
    xref.push(`${pad} 00000 n `);
    offset += Buffer.byteLength(obj, 'binary');
    rawPdf += obj;
  }

  const xrefOffset = offset;
  rawPdf += xref.join("\n") + "\n";
  rawPdf += "trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n" + xrefOffset + "\n%%EOF\n";

  fs.writeFileSync(path.join(dir, 'Sri_Ragav_Surya_Resume.pdf'), rawPdf, 'binary');
  console.log("PDF generated successfully at public/resume/Sri_Ragav_Surya_Resume.pdf");
}

generateResumePdf();
