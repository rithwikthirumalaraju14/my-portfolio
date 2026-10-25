import { useState } from 'react';
import { resumeUrl } from '../utils/downloadResume';

const contactEmail = 'rithwikthirumalaraju@gmail.com';
const contactEndpoint = import.meta.env.VITE_CONTACT_SCRIPT_URL?.trim();

function checkReceipt(endpoint, requestId) {
  return new Promise((resolve, reject) => {
    const callback = `contactReceipt_${requestId.replaceAll('-', '')}`;
    const script = document.createElement('script');
    const timer = setTimeout(() => finish(null, new Error('Receipt timed out')), 8000);

    function finish(result, error) {
      clearTimeout(timer);
      script.remove();
      delete window[callback];
      if (error) reject(error);
      else resolve(result);
    }

    window[callback] = (result) => finish(result);
    script.onerror = () => finish(null, new Error('Receipt could not be loaded'));
    script.src = `${endpoint}?requestId=${requestId}&callback=${callback}&t=${Date.now()}`;
    document.body.appendChild(script);
  });
}

export default function Cta() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [website, setWebsite] = useState('');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      window.prompt('Copy email address:', contactEmail);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!contactEndpoint) {
      setStatus('unconfigured');
      return;
    }

    setStatus('sending');
    try {
      const requestId = crypto.randomUUID();
      await fetch(contactEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...formData, website, requestId }),
      });
      let receipt;
      for (let attempt = 0; attempt < 15; attempt += 1) {
        receipt = await checkReceipt(contactEndpoint, requestId);
        if (receipt.status !== 'pending') break;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      if (receipt.status !== 'received') throw new Error('Message was not confirmed');
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setWebsite('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section className="contact-section" id="contact">
        <div className="contact-container">
          <div className="contact-header">
            <p className="contact-eyebrow">CONTACT</p>
            <h2 className="contact-title">
              Let&apos;s build <span className="title-muted">something.</span>
            </h2>
            <p className="contact-subtitle">
              Open to AI/ML engineering roles, Generative AI &amp; agentic systems, and high-impact technical collaborations.
            </p>
          </div>

          <div className="contact-cards-grid">
            {/* Left Card: Direct Contact & Socials */}
            <div className="contact-card contact-card-info">
              <div className="contact-details-list">
                <div className="contact-email-row">
                  <a href="#contact-form" className="contact-detail-row">
                    <span className="contact-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>
                    <span className="contact-text">Mail me</span>
                  </a>
                  <button type="button" className="contact-copy-btn" onClick={copyEmail} aria-label="Copy email address">{copied ? 'Copied!' : 'Copy address'}</button>
                </div>

                <a href="https://www.linkedin.com/in/rithwik-thirumalaraju-ai" target="_blank" rel="noopener noreferrer" className="contact-detail-row">
                  <span className="contact-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </span>
                  <span className="contact-text">Connect on LinkedIn</span>
                </a>

                <div className="contact-detail-row">
                  <span className="contact-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <span className="contact-text">India · Open to Remote &amp; Hybrid</span>
                </div>
              </div>

              <div className="contact-social-row">
                <a
                  href="https://github.com/rithwikthirumalaraju14"
                  target="_blank"
                  rel="noreferrer"
                  className="social-circle-btn"
                  aria-label="GitHub profile"
                  title="GitHub"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" />
                  </svg>
                </a>

                <a
                  href="#contact-form"
                  className="social-circle-btn"
                  aria-label="Go to contact form"
                  title="Send a message"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>

                <a
                  href={resumeUrl}
                  download="Rithwik_Thirumalaraju_Resume.pdf"
                  className="social-circle-btn"
                  aria-label="Download Resume"
                  title="Download Resume PDF"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M12 18v-6" />
                    <path d="m9 15 3 3 3-3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Card: Interactive Form */}
            <div className="contact-card contact-card-form">
              <form onSubmit={handleSubmit} className="contact-form" id="contact-form">
                <div className="form-row-duo">
                  <div className="input-group">
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setStatus('idle'); }}
                      disabled={status === 'sending'}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setStatus('idle'); }}
                      disabled={status === 'sending'}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell me about the role or project..."
                    value={formData.message}
                    onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setStatus('idle'); }}
                    disabled={status === 'sending'}
                    required
                  />
                </div>
                <div className="contact-honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">Leave this field empty</label>
                  <input id="contact-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>

                <div className="form-action-row">
                  <button type="submit" className="contact-submit-btn" disabled={status === 'sending'}>
                    <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                    <i>↗</i>
                  </button>
                  <span className={status === 'error' || status === 'unconfigured' ? 'submit-error-msg' : 'submit-confirm-msg'} role="status" aria-live="polite">
                    {status === 'success' && 'Message sent — thank you!'}
                    {status === 'error' && 'Could not confirm your message. Please try again or copy my email address.'}
                    {status === 'unconfigured' && 'Contact form is being set up. Please copy my email address for now.'}
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-image footer-image">
            <img src="/Professional%20Corporate%20Headshot.png" alt="Rithwik Thirumalaraju" />
          </span>
          <p><strong>Rithwik Thirumalaraju</strong>AI Engineer</p>
        </div>
        <nav>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#credentials">Credentials</a>
          <a href={resumeUrl} download="Rithwik_Thirumalaraju_Resume.pdf" type="application/pdf">Resume ↓</a>
        </nav>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
