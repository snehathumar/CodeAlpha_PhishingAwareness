export type ModuleId =
  | 'what-is-phishing'
  | 'email-inspector'
  | 'url-spotter'
  | 'social-engineering'
  | 'real-world-scams'
  | 'best-practices'
  | 'quiz'
  | 'checklist';

export interface TrainingModuleMeta {
  id: ModuleId;
  number: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  estimatedTime: string;
}

export const TRAINING_MODULES: TrainingModuleMeta[] = [
  {
    id: 'what-is-phishing',
    number: '01',
    shortTitle: 'What is Phishing',
    title: 'What is Phishing?',
    subtitle: 'Understand what phishing is, why attackers rely on it, and the 8 common forms it takes.',
    estimatedTime: '4 min read',
  },
  {
    id: 'email-inspector',
    number: '02',
    shortTitle: 'Inspect Phishing Emails',
    title: 'How to Recognize Phishing Emails',
    subtitle: 'Examine a realistic fake email and click every suspicious clue to see why it is a red flag.',
    estimatedTime: 'Interactive lab',
  },
  {
    id: 'url-spotter',
    number: '03',
    shortTitle: 'Spot Fake Websites',
    title: 'How to Recognize Fake Websites & URLs',
    subtitle: 'Learn to read domain names right-to-left, hover before clicking, and test your eye on fake links.',
    estimatedTime: 'Interactive lab',
  },
  {
    id: 'social-engineering',
    number: '04',
    shortTitle: 'Social Engineering',
    title: 'Social Engineering Tactics',
    subtitle: 'Explore the 9 psychological triggers attackers use to bypass logical thinking.',
    estimatedTime: '5 min read',
  },
  {
    id: 'real-world-scams',
    number: '05',
    shortTitle: 'Real-World & India Scams',
    title: 'Real-World Incidents & Common India Scams',
    subtitle: 'Study famous global breaches alongside everyday SMS, UPI, courier, and internship scams.',
    estimatedTime: '6 min read',
  },
  {
    id: 'best-practices',
    number: '06',
    shortTitle: 'Best Practices & Response',
    title: 'Best Practices & What to Do If You Clicked',
    subtitle: 'Follow daily safety habits and a step-by-step emergency response plan if a scam happens.',
    estimatedTime: 'Checklist',
  },
  {
    id: 'quiz',
    number: '07',
    shortTitle: 'Interactive Quiz',
    title: 'Phishing Awareness Quiz (10 Questions)',
    subtitle: 'Test your ability to spot fake emails, deceptive URLs, SMS traps, and social engineering.',
    estimatedTime: '10 questions',
  },
  {
    id: 'checklist',
    number: '08',
    shortTitle: 'Printable Checklist',
    title: 'One-Page Phishing Safety Checklist & Sources',
    subtitle: 'Download as a PNG image or print as a clean one-page PDF reference guide.',
    estimatedTime: 'Downloadable',
  },
];

export interface PhishingTypeItem {
  id: string;
  name: string;
  channel: string;
  summary: string;
  example: string;
  defenseTip: string;
}

export const PHISHING_TYPES: PhishingTypeItem[] = [
  {
    id: 'email-phishing',
    name: 'Email Phishing',
    channel: 'Bulk Email',
    summary: 'Mass-sent messages pretending to be banks, colleges, or cloud apps to steal passwords or card details.',
    example: 'An email sent to thousands of students claiming their campus email storage is 99% full and asking them to log in via a link.',
    defenseTip: 'Check the full sender email domain, not just the display name.',
  },
  {
    id: 'spear-phishing',
    name: 'Spear Phishing',
    channel: 'Targeted Email',
    summary: 'A personalized attack crafted for one specific person, club, or department using details found on social media or college directories.',
    example: 'An email to a college club treasurer mentioning an upcoming campus fest by name and attaching a fake vendor invoice.',
    defenseTip: 'Verify unusual payment or document requests by messaging the person on a known number.',
  },
  {
    id: 'whaling',
    name: 'Whaling',
    channel: 'Executive / Admin Target',
    summary: 'High-stakes phishing aimed at senior leaders—such as university deans, CEOs, or finance heads—who have high approval power.',
    example: 'A spoofed legal notice or board directive sent to a finance officer demanding an urgent confidential fund transfer.',
    defenseTip: 'Always use dual verification (two independent approvals) for high-value actions.',
  },
  {
    id: 'smishing',
    name: 'Smishing (SMS Phishing)',
    channel: 'Text Message / WhatsApp',
    summary: 'Deceptive SMS or chat messages containing short links or fake helpline numbers to create sudden panic.',
    example: 'An SMS warning that your bank KYC expired today and urging you to tap a shortened link immediately.',
    defenseTip: 'Never tap links inside unexpected SMS alerts; open your official banking app directly.',
  },
  {
    id: 'vishing',
    name: 'Vishing (Voice Phishing)',
    channel: 'Phone Call',
    summary: 'Scammers call pretending to be bank staff, tech support, or courier agents and pressure victims into sharing an OTP or installing remote-access apps.',
    example: 'A caller claiming a suspicious transaction happened on your card and asking for the 6-digit OTP to "cancel" it.',
    defenseTip: 'Hang up immediately if anyone asks for an OTP, PIN, or screen-sharing app.',
  },
  {
    id: 'clone-phishing',
    name: 'Clone Phishing',
    channel: 'Modified Legitimate Email',
    summary: 'Attackers take a real email you recently received, copy its exact layout and text, and replace the safe link or attachment with a malicious one.',
    example: 'A cloned copy of a real webinar registration email sent hours later with "Updated Schedule.zip" attached.',
    defenseTip: 'Be suspicious of sudden "re-sent" or "updated" emails with new attachments.',
  },
  {
    id: 'fake-websites',
    name: 'Fake Websites (Spoofed Portals)',
    channel: 'Web Browser',
    summary: 'Lookalike login pages hosted on misspelled or unrelated domains designed to capture usernames, passwords, or payment info.',
    example: 'A replica college login page hosted at campus-portal-verify.example instead of the real university domain.',
    defenseTip: 'Inspect the root domain in the address bar and use a password manager (it will not autofill on fake sites).',
  },
  {
    id: 'qr-phishing',
    name: 'QR Phishing (Quishing)',
    channel: 'QR Codes (Print / Screen)',
    summary: 'Malicious QR codes pasted over real posters or sent in messages that silently redirect phones to fake payment or login pages.',
    example: 'A scammer sends a QR code saying "Scan to receive your ₹2,000 refund," which actually opens a UPI payment request.',
    defenseTip: 'Remember: you NEVER scan a QR code or enter your UPI PIN to receive money.',
  },
];

export interface EmailRedFlag {
  id: string;
  label: string;
  shortTag: string;
  explanation: string;
  whatToCheck: string;
}

export const EMAIL_RED_FLAGS: EmailRedFlag[] = [
  {
    id: 'sender-mismatch',
    label: 'Sender Domain Mismatch',
    shortTag: 'Fake sender domain',
    explanation:
      'The display name says "FinTrust Bank Security", but the actual address is alerts@fintrust-verify-login.example. Attackers use trusted display names to hide unrelated domains.',
    whatToCheck: 'Always expand or inspect the full email address inside < > brackets.',
  },
  {
    id: 'generic-greeting',
    label: 'Generic Greeting',
    shortTag: 'Impersonal salutation',
    explanation:
      '"Dear Valued Customer" instead of your actual name is a common sign of bulk phishing blasts sent to thousands of random addresses.',
    whatToCheck: 'Real banks and campus portals almost always address you by your registered name.',
  },
  {
    id: 'urgent-tone',
    label: 'Artificial Urgency & Fear',
    shortTag: '2-hour panic deadline',
    explanation:
      'Threatening permanent account suspension within 2 hours pressures you to act fast before thinking or checking with anyone.',
    whatToCheck: 'Pause whenever a message creates panic or threatens sudden account deletion.',
  },
  {
    id: 'spelling-errors',
    label: 'Spelling & Grammar Errors',
    shortTag: 'Sloppy phrasing',
    explanation:
      'Words like "varify", "credentails", "imediately", and "permenant closer" are classic indicators of hastily written scam templates.',
    whatToCheck: 'Official organizations proofread automated security notices carefully.',
  },
  {
    id: 'suspicious-link',
    label: 'Deceptive Link Destination',
    shortTag: 'Mismatched URL',
    explanation:
      'The button says "Verify My Account Now", but hovering shows http://fintrust-secure-update.example/login — an unencrypted HTTP site on a fake domain.',
    whatToCheck: 'Hover over buttons or long-press on mobile to inspect the real destination URL before clicking.',
  },
  {
    id: 'unexpected-attachment',
    label: 'Unexpected Attachment',
    shortTag: 'Risky HTML/ZIP file',
    explanation:
      'Attaching "Account_Hold_Form.html" is a trick used to run offline fake login forms or deliver malware directly inside your browser.',
    whatToCheck: 'Never open unexpected .html, .zip, .exe, or macro-enabled attachments.',
  },
];

export interface UrlChallenge {
  id: string;
  scenario: string;
  displayText: string;
  url: string;
  isFake: boolean;
  trickType: string;
  explanation: string;
}

export const URL_CHALLENGES: UrlChallenge[] = [
  {
    id: 'url-1',
    scenario: 'Payment Login Alert',
    displayText: 'PayPal Account Security Check',
    url: 'https://paypa1-secure-login.example/signin',
    isFake: true,
    trickType: 'Lookalike Letter (Typosquatting)',
    explanation:
      'Notice the number "1" replacing the letter "l" in "paypa1". The real domain is paypal.example, not paypa1-secure-login.example.',
  },
  {
    id: 'url-2',
    scenario: 'University Exam Portal',
    displayText: 'Check Semester Exam Schedule',
    url: 'https://exams.university.example/timetable',
    isFake: false,
    trickType: 'Legitimate Subdomain + HTTPS',
    explanation:
      'This is safe in our example: it uses HTTPS and the root domain directly before the first "/" is university.example with a valid "exams" subdomain.',
  },
  {
    id: 'url-3',
    scenario: 'Student Bank Verification',
    displayText: 'Log in to MyBank Portal',
    url: 'https://login.mybank.com.verify-account-now.example/auth',
    isFake: true,
    trickType: 'Extra Subdomain Deception',
    explanation:
      'Attackers put "login.mybank.com" at the front as fake subdomains! Read right-to-left before the first "/": the actual owner of this website is verify-account-now.example.',
  },
  {
    id: 'url-4',
    scenario: 'Hostel & Tuition Fee Payment',
    displayText: 'Pay Hostel Fees Online',
    url: 'http://student-fee-portal.example/pay',
    isFake: true,
    trickType: 'Missing HTTPS (Insecure HTTP)',
    explanation:
      'Never enter passwords, UPI details, or card numbers on an unencrypted "http://" page. Anything sent over plain HTTP can be intercepted.',
  },
  {
    id: 'url-5',
    scenario: 'Cloud Storage Shared Document',
    displayText: 'Open Shared Internship Offer PDF',
    url: 'https://campusdrive-login.support-team.example/view',
    isFake: true,
    trickType: 'Wrong Root Domain',
    explanation:
      'The hyphenated prefix "campusdrive-login" tries to look official, but the actual root domain is support-team.example, not campusdrive.example.',
  },
  {
    id: 'url-6',
    scenario: 'Campus Library Catalog',
    displayText: 'Search Digital Textbooks',
    url: 'https://library.campus.example/catalog',
    isFake: false,
    trickType: 'Clean Official Domain',
    explanation:
      'It uses HTTPS, clean spelling, and the true root domain campus.example.',
  },
];

export interface SocialTactic {
  id: string;
  name: string;
  howItWorks: string;
  realLifeExample: string;
  counterMove: string;
}

export const SOCIAL_TACTICS: SocialTactic[] = [
  {
    id: 'urgency',
    name: 'Urgency',
    howItWorks: 'Creates a fake countdown so you rush into clicking before noticing clues.',
    realLifeExample: '"Your college Wi-Fi access will be deactivated in 30 minutes unless you re-verify your student ID now."',
    counterMove: 'Slow down. Real institutions give advance notice and multiple official channels.',
  },
  {
    id: 'fear',
    name: 'Fear',
    howItWorks: 'Threatens legal action, police cases, bank freezes, or failing grades to trigger panic.',
    realLifeExample: '"A parcel with illegal items was linked to your Aadhaar. Stay on the video call or face arrest."',
    counterMove: 'Hang up and check directly with official authorities; police never demand money or secret OTPs on calls.',
  },
  {
    id: 'authority',
    name: 'Authority',
    howItWorks: 'Impersonates a boss, professor, bank manager, or IT administrator so you hesitate to question them.',
    realLifeExample: 'A message pretending to be the Department Dean asks a student volunteer to urgently buy digital gift cards for guests.',
    counterMove: 'Verify requests from authority figures through a separate known phone number or in person.',
  },
  {
    id: 'greed-reward',
    name: 'Greed / Reward',
    howItWorks: 'Promises free scholarships, cashbacks, lottery prizes, or guaranteed high-paying internships.',
    realLifeExample: '"Congratulations! You won a ₹15,000 student cashback voucher. Enter your UPI PIN to claim it now."',
    counterMove: 'If an unexpected reward asks for money, registration fees, or a PIN, it is a scam.',
  },
  {
    id: 'curiosity',
    name: 'Curiosity',
    howItWorks: 'Uses intriguing gossip, leaked exam papers, or mystery attachments to tempt a click.',
    realLifeExample: 'A WhatsApp forward saying "Look who got suspended in your batch! Open this APK file to see the list."',
    counterMove: 'Never install unknown .apk or .exe files sent via chat groups.',
  },
  {
    id: 'trust-impersonation',
    name: 'Trust / Impersonation',
    howItWorks: 'Hijacks or copies a friend’s social profile or familiar campus brand to borrow their trust.',
    realLifeExample: 'A cloned Instagram account of a classmate messages you: "My UPI is stuck, can you send ₹2,500 for 10 minutes?"',
    counterMove: 'Call your friend on their real phone number before transferring any money.',
  },
  {
    id: 'pretexting',
    name: 'Pretexting',
    howItWorks: 'The attacker invents a believable backstory or fake role (such as an IT auditor or HR recruiter) to extract information step by step.',
    realLifeExample: 'A caller posing as campus IT support says they are upgrading student mail servers and asks for your current password to migrate your inbox.',
    counterMove: 'Real IT teams never need your password to maintain or upgrade accounts.',
  },
  {
    id: 'baiting',
    name: 'Baiting',
    howItWorks: 'Leaves an enticing physical or digital "trap" (like a labeled USB drive or free software crack) waiting for someone to use it.',
    realLifeExample: 'An unlabeled USB drive marked "Placement Interview Questions 2026" is left on a computer lab desk.',
    counterMove: 'Never plug unknown USB drives into your laptop or lab computers; hand them to IT security.',
  },
  {
    id: 'tailgating',
    name: 'Tailgating (Piggybacking)',
    howItWorks: 'A physical social engineering trick where an unauthorized person follows someone closely through a locked door by appearing to belong.',
    realLifeExample: 'Someone carrying heavy boxes asks a student to hold open the secure hostel or server lab keycard door.',
    counterMove: 'Politely ensure visitors check in at reception or badge in with their own ID.',
  },
];

export interface RealWorldIncident {
  id: string;
  year: string;
  title: string;
  tacticUsed: string;
  whatHappened: string;
  lessonLearned: string;
}

export const REAL_WORLD_INCIDENTS: RealWorldIncident[] = [
  {
    id: 'twitter-2020',
    year: '2020',
    title: 'Twitter Social-Engineering Hack',
    tacticUsed: 'Phone Spear-Phishing (Vishing) & Pretexting',
    whatHappened:
      'Attackers called multiple employees pretending to be internal IT support staff and convinced them to share credentials for internal admin tools, compromising 130 high-profile accounts to run a cryptocurrency scam.',
    lessonLearned:
      'Even major tech platforms can be breached through human phone calls; verify internal IT requests using official ticketing channels.',
  },
  {
    id: 'target-2013',
    year: '2013',
    title: 'Target Retail Data Breach',
    tacticUsed: 'Third-Party Vendor Phishing Email',
    whatHappened:
      'Hackers did not breach Target directly first—they sent a phishing email with malware to a smaller heating and cooling (HVAC) contractor, stole their portal credentials, and pivoted into Target’s payment network, exposing 40M+ cards.',
    lessonLearned:
      'Attackers target the weakest link, including vendors and students with access to shared systems. Least-privilege access and 2FA are essential.',
  },
  {
    id: 'dnc-2016',
    year: '2016',
    title: 'DNC Spear-Phishing Incident',
    tacticUsed: 'Fake Security Alert & Lookalike Domain',
    whatHappened:
      'A senior campaign staffer received a fake security email warning that someone tried to access their account and urging an immediate password change via a shortened URL leading to a spoofed login page.',
    lessonLearned:
      'Urgent "change your password now" emails should never be trusted via links—always open your account security page directly.',
  },
  {
    id: 'toyota-2019',
    year: '2019',
    title: 'Toyota Boshoku BEC Wire Scam',
    tacticUsed: 'Authority & Business Email Compromise (Whaling)',
    whatHappened:
      'Scammers impersonated a senior executive using a lookalike email domain and convinced a finance team member at a European subsidiary to urgently wire roughly $37 million to an attacker-controlled bank account.',
    lessonLearned:
      'Authority plus artificial secrecy ("confidential urgent transfer") is a major red flag; confirm bank detail changes by voice call.',
  },
  {
    id: 'twilio-2022',
    year: '2022',
    title: 'Twilio Employee Smishing Attack',
    tacticUsed: 'SMS Phishing (Smishing) + Fake SSO Login',
    whatHappened:
      'Employees received text messages claiming their passwords had expired or their schedule changed, linking to a fake single-sign-on (SSO) page that captured both passwords and one-time codes in real time.',
    lessonLearned:
      'SMS links impersonating IT teams can bypass basic OTP 2FA; phishing-resistant MFA (hardware keys/passkeys) and domain checking stop this.',
  },
];

export interface IndiaScamExample {
  id: string;
  category: string;
  sampleMessage: string;
  redFlags: string[];
  safeAction: string;
}

export const INDIA_SCAMS: IndiaScamExample[] = [
  {
    id: 'kyc-sms',
    category: 'Fake Bank KYC Update SMS',
    sampleMessage:
      'SAMPLE (fake): "Dear Customer, your Bank Account & PAN KYC has expired today. Account will be blocked in 2 hrs. Update immediately at http://bank-kyc-update-in.example"',
    redFlags: [
      'Threatens a 2-hour block to cause panic',
      'Uses an unofficial .example lookalike link instead of your bank app',
    ],
    safeAction: 'Banks never block accounts via random SMS links. Check KYC status only inside your official mobile banking app or branch.',
  },
  {
    id: 'upi-collect',
    category: 'UPI "Collect Request" Fraud',
    sampleMessage:
      'SAMPLE (fake): "Buyer on marketplace: I am sending ₹4,500 advance. Open your UPI app, accept the request, and enter your UPI PIN to receive the money."',
    redFlags: [
      'Claims you need to enter your UPI PIN to RECEIVE money',
      'Sends a "Pay / Collect" request disguised as a refund or advance',
    ],
    safeAction: 'Golden rule: Entering your UPI PIN ALWAYS deducts money from your account. Receiving money never requires a PIN or QR scan.',
  },
  {
    id: 'courier-scam',
    category: 'Fake Courier Delivery Message',
    sampleMessage:
      'SAMPLE (fake): "IndiaPost/Courier Alert: Your parcel ID #99482 could not be delivered due to incomplete address. Pay ₹15 redelivery fee at http://parcel-track-fee.example"',
    redFlags: [
      'Asks for a tiny fee (₹10–₹25) to harvest your debit/credit card and OTP',
      'Suspicious tracking URL that does not match the official courier website',
    ],
    safeAction: 'Check your tracking number directly on the official e-commerce app or official courier website.',
  },
  {
    id: 'internship-fee',
    category: 'Fake Job / Internship Registration Fee',
    sampleMessage:
      'SAMPLE (fake): "Congratulations! Selected for Paid Remote Tech Internship (₹25,000/month). Pay ₹999 refundable laptop/security deposit before 6 PM at http://offer-portal-hr.example"',
    redFlags: [
      'Guaranteed selection with zero real interview process',
      'Demands an upfront "registration", "training", or "security deposit" fee from students',
    ],
    safeAction: 'Legitimate companies and internships NEVER charge students money to get hired.',
  },
  {
    id: 'electricity-bill',
    category: 'Fake Electricity Bill Disconnection',
    sampleMessage:
      'SAMPLE (fake): "URGENT: Your electricity power will be disconnected tonight at 9:30 PM because last month bill was not updated. Immediately call our officer: 90000-00000."',
    redFlags: [
      'Late-night disconnection threat ("9:30 PM tonight")',
      'Asks you to call a personal mobile number where scammers push remote-access apps (like AnyDesk/TeamViewer)',
    ],
    safeAction: 'Verify your bill status strictly on your state electricity board app or official UPI biller page, and never install screen-sharing apps.',
  },
];

export interface ChecklistHabit {
  id: string;
  title: string;
  detail: string;
}

export const BEST_PRACTICE_HABITS: ChecklistHabit[] = [
  {
    id: 'verify-sender',
    title: 'Verify the sender carefully',
    detail: 'Check the exact email address after the "@" symbol—not just the friendly display name.',
  },
  {
    id: 'never-share-otp',
    title: 'Never share OTP, PIN, or password',
    detail: 'No bank, college IT desk, police officer, or delivery agent will ever legitimately ask for your OTP or UPI PIN.',
  },
  {
    id: 'no-unexpected-links',
    title: 'Do not click unexpected links or attachments',
    detail: 'Hover over links to inspect the real domain before clicking, and skip unexpected .zip, .html, or .apk files.',
  },
  {
    id: 'type-address',
    title: 'Type the website address yourself',
    detail: 'For banks, email, and exam portals, use your saved bookmarks or type the official domain manually.',
  },
  {
    id: 'use-2fa',
    title: 'Enable Two-Factor Authentication (2FA)',
    detail: 'Prefer an authenticator app or passkey over SMS OTP so a stolen password alone cannot break into your account.',
  },
  {
    id: 'password-manager',
    title: 'Use a password manager',
    detail: 'Password managers create unique passwords for each site and automatically refuse to autofill on fake lookalike domains.',
  },
  {
    id: 'keep-updated',
    title: 'Keep browsers, apps, and OS updated',
    detail: 'Security patches close known browser and phone vulnerabilities that phishing links often exploit.',
  },
  {
    id: 'report-suspicious',
    title: 'Report suspicious messages',
    detail: 'Use "Report Phishing" in your email client or alert your campus IT helpdesk so classmates stay protected too.',
  },
];

export interface EmergencyStep {
  step: string;
  title: string;
  action: string;
}

export const IF_YOU_CLICKED_STEPS: EmergencyStep[] = [
  {
    step: 'Step 1',
    title: 'Stop immediately and disconnect',
    action: 'Close the suspicious page. If you downloaded an unknown file or app, turn off Wi-Fi/mobile data and delete it before running an antivirus scan.',
  },
  {
    step: 'Step 2',
    title: 'Change your passwords from a clean device',
    action: 'Update the password on the affected account right away—and anywhere else you reused that same password.',
  },
  {
    step: 'Step 3',
    title: 'Enable 2FA and sign out of unknown sessions',
    action: 'Turn on Two-Factor Authentication and check your account’s "Active Sessions / Logged-in Devices" list to log out attackers.',
  },
  {
    step: 'Step 4',
    title: 'Notify your bank or college IT desk',
    action: 'If banking, card, or UPI details were exposed, call your bank’s official toll-free number immediately to freeze your card/UPI. For campus accounts, alert IT support.',
  },
  {
    step: 'Step 5',
    title: 'Report the incident officially (India)',
    action: 'File a report right away at cybercrime.gov.in or dial the National Cyber Crime Helpline 1930 (quick reporting within the "golden hour" helps freeze stolen funds).',
  },
];

export interface QuizQuestion {
  id: number;
  category: 'Email' | 'URL' | 'SMS / UPI' | 'Social Engineering';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Email',
    question:
      'You receive an email with display name "Campus IT Helpdesk", but the email address is helpdesk@campus-reset-verify.example. It demands you reset your password in 1 hour. What is the biggest red flag?',
    options: [
      'It arrived in the morning instead of evening',
      'The sender domain does not match your real university domain and uses extreme urgency',
      'The email contains your college’s name in the subject line',
      'It was sent to your student inbox',
    ],
    correctIndex: 1,
    explanation:
      'Anyone can set a trusted display name. Always check the real domain after "@" and treat sudden 1-hour panic deadlines as a phishing red flag.',
  },
  {
    id: 2,
    category: 'URL',
    question:
      'Which of these fictional URLs actually belongs to "mybank.example"?',
    options: [
      'https://mybank.example.verify-login.example/auth',
      'https://mybank-security-update.example/login',
      'https://portal.mybank.example/signin',
      'http://myb4nk.example/login',
    ],
    correctIndex: 2,
    explanation:
      'Read right-to-left before the first single "/". In "portal.mybank.example", the root domain is mybank.example. In option A, the real owner is verify-login.example!',
  },
  {
    id: 3,
    category: 'SMS / UPI',
    question:
      'Someone buying your used textbook online sends you a UPI QR code and says: "Scan this and enter your UPI PIN to receive ₹1,200." What should you do?',
    options: [
      'Scan it and enter the PIN quickly before it expires',
      'Refuse and explain that receiving money via UPI never requires scanning a QR or entering a PIN',
      'Enter an incorrect PIN first to test if it works',
      'Send ₹1 first to verify the buyer',
    ],
    correctIndex: 1,
    explanation:
      'Entering your UPI PIN always authorizes sending money OUT of your bank account. You never enter a PIN or scan a payment QR to receive funds.',
  },
  {
    id: 4,
    category: 'Social Engineering',
    question:
      'A stranger carrying two heavy cardboard boxes asks you to hold open the badge-locked entrance to your campus server lab. Which tactic is this?',
    options: [
      'Vishing',
      'Clone phishing',
      'Tailgating (Piggybacking)',
      'Typosquatting',
    ],
    correctIndex: 2,
    explanation:
      'Tailgating is a physical social engineering tactic where someone uses politeness or distraction to slip past badge-controlled doors without authorization.',
  },
  {
    id: 5,
    category: 'URL',
    question:
      'You hover over a link that reads "Reset Campus Password", and your browser’s bottom-left preview shows "http://campus-login-portal.example/reset". Why should you NOT click it?',
    options: [
      'Because it uses plain unencrypted HTTP and an unfamiliar domain',
      'Because hovering over links is unsafe',
      'Because passwords can only be changed on weekends',
      'Because the URL ends in /reset',
    ],
    correctIndex: 0,
    explanation:
      'Hovering reveals the true destination safely without clicking. Plain "http://" lacks encryption, and the domain does not match an official university site.',
  },
  {
    id: 6,
    category: 'SMS / UPI',
    question:
      'An SMS reads: "SAMPLE (fake): Electricity power will be disconnected tonight at 9:30 PM. Call officer on 90000-00000 immediately." Why do scammers use this tactic?',
    options: [
      'To remind customers to save electricity',
      'To trigger fear and urgency so you call a fake number and install remote-access apps or share OTPs',
      'Because electricity boards only send warnings at night',
      'To test if your phone number is active for newsletters',
    ],
    correctIndex: 1,
    explanation:
      'This common scam combines Fear + Urgency. Official utilities provide formal advance notices and never ask you to install screen-sharing apps.',
  },
  {
    id: 7,
    category: 'Social Engineering',
    question:
      'An email offers a guaranteed paid remote internship at ₹30,000/month with no interview—you just have to pay a ₹750 "refundable laptop registration fee" today. What type of trap is this?',
    options: [
      'Greed / Reward scam targeting students',
      'Legitimate HR onboarding fee',
      'Normal background verification charge',
      'Standard two-factor authentication',
    ],
    correctIndex: 0,
    explanation:
      'Genuine internships and employers never ask students to pay upfront registration or deposit fees to get hired.',
  },
  {
    id: 8,
    category: 'Email',
    question:
      'Why does using a Password Manager protect you even if you accidentally open a very realistic fake login page?',
    options: [
      'It automatically deletes phishing emails from your inbox',
      'It checks the exact website domain and refuses to autofill your password on a lookalike domain',
      'It blocks all HTTPS websites',
      'It shares your password with the website admin to verify it',
    ],
    correctIndex: 1,
    explanation:
      'Password managers bind saved logins to the exact real domain. If you land on "paypa1-secure.example" instead of "paypal.example", it stays blank—an instant warning sign!',
  },
  {
    id: 9,
    category: 'Social Engineering',
    question:
      'In the 2020 Twitter hack, how did attackers gain access to internal employee admin tools?',
    options: [
      'They guessed the CEO’s password by brute force',
      'They used phone spear-phishing (vishing) to trick employees into entering credentials on a fake tool',
      'They broke into the data center physically',
      'They hacked users’ home Wi-Fi routers',
    ],
    correctIndex: 1,
    explanation:
      'The 2020 Twitter incident was a classic example of vishing + pretexting: attackers called employees pretending to be internal IT staff.',
  },
  {
    id: 10,
    category: 'SMS / UPI',
    question:
      'If you accidentally entered your bank details on a phishing site in India, what is the official helpline number and portal to report financial cyber fraud quickly?',
    options: [
      'Call 108 and visit example.com',
      'Call 1930 and report at cybercrime.gov.in (plus alert your bank immediately)',
      'Post about it on social media and wait 48 hours',
      'Delete your browser history and turn off the phone for a week',
    ],
    correctIndex: 1,
    explanation:
      'Reporting immediately to your bank, calling the Indian National Cyber Crime Helpline 1930, and filing on cybercrime.gov.in maximizes the chance of blocking stolen funds.',
  },
];

export interface ReferenceSource {
  name: string;
  organization: string;
  description: string;
  url: string;
}

export const FURTHER_READING_SOURCES: ReferenceSource[] = [
  {
    name: 'National Cyber Crime Reporting Portal (Helpline 1930)',
    organization: 'Ministry of Home Affairs, Government of India',
    description: 'Official portal to report phishing, UPI fraud, and online financial scams in India.',
    url: 'https://cybercrime.gov.in',
  },
  {
    name: 'RBI Kehta Hai — Digital Payment Safety',
    organization: 'Reserve Bank of India (RBI)',
    description: 'Public awareness campaigns on OTP, UPI PIN, KYC scams, and safe banking habits.',
    url: 'https://www.rbi.org.in',
  },
  {
    name: 'CISA Phishing Guidance',
    organization: 'Cybersecurity & Infrastructure Security Agency',
    description: 'Beginner-friendly guides on recognizing and reporting phishing and social engineering.',
    url: 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing',
  },
  {
    name: 'CERT-In (Indian Computer Emergency Response Team)',
    organization: 'MeitY, Government of India',
    description: 'Security advisories, vulnerability notes, and cyber hygiene guidelines.',
    url: 'https://www.cert-in.org.in',
  },
  {
    name: 'OWASP Social Engineering & Phishing Overview',
    organization: 'OWASP Foundation',
    description: 'Open educational resources on social engineering attack patterns and defenses.',
    url: 'https://owasp.org',
  },
];
