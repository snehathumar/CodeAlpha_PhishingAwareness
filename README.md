# CodeAlpha Cyber Security Internship - Task 1 : PhishingAwareness

CodeAlpha Cyber Security Internship - Task 2: Phishing Awareness Training

**PhishGuard - Phishing Awareness Training** is a clean, static, mobile-friendly interactive web module built for college students and cybersecurity beginners. All demonstrations use fictional scenarios and safe `.example` domains with zero personal data collection, login, or external API dependencies.

## Training Modules

1. **What is Phishing** — Definition, why attackers rely on human psychology, and an interactive explorer covering 8 common phishing types (Email Phishing, Spear Phishing, Whaling, Smishing, Vishing, Clone Phishing, Fake Websites, and QR Phishing).
2. **How to Recognize Phishing Emails** — An interactive "Inspect this email" lab where learners click 6 suspicious elements (sender domain mismatch, urgent tone, generic greeting, spelling errors, deceptive link destination, and unexpected attachment) to reveal red-flag explanations.
3. **How to Recognize Fake Websites** — Visual URL anatomy breakdown, a safe Hover-to-Inspect link simulator, and a "Spot the Fake URL" exercise using `.example` domains covering lookalike letters, wrong root domains, missing HTTPS, and extra subdomains.
4. **Social Engineering Tactics** — Explanations and real-life style examples for 9 core manipulation triggers: Urgency, Fear, Authority, Greed/Reward, Curiosity, Trust/Impersonation, Pretexting, Baiting, and Tailgating.
5. **Real-World Incidents & Common India Scams** — Documented global incidents (including the 2020 Twitter social-engineering hack, 2013 Target vendor breach, 2016 DNC spear phishing, 2019 Toyota Boshoku BEC scam, and 2022 Twilio smishing attack) plus India-relevant scam awareness clearly marked `SAMPLE (fake)` (Bank KYC SMS, UPI collect request fraud, courier delivery traps, fake internship registration fees, and fake electricity disconnection warnings).
6. **Best Practices & Response Plan** — An interactive 8-point prevention checklist and a 5-step "What to do if you clicked" emergency action plan referencing `cybercrime.gov.in` and India's Helpline **1930**.
7. **Interactive Quiz** — 10 scenario-based multiple-choice questions with instant explanations, final score calculation, badge tiers (`Beginner` / `Aware` / `Phishing Expert`), and a Retry option.
8. **Printable Phishing Safety Checklist & Sources** — A one-page Phishing Safety Checklist with PNG download and Print/Save PDF support, plus a curated Sources and Further Reading section.

## How to Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

To run unit tests and production build checks:

```bash
npx tsx --test src/utils/trainingLogic.test.ts
npm run lint
npm run build
```

## Screenshots

- `[Screenshot Placeholder — Desktop Overview & Progress Sidebar]`
- `[Screenshot Placeholder — Interactive Email Inspector Lab]`
- `[Screenshot Placeholder — Fake URL Spotter & Quiz Results]`
