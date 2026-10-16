import { credentials } from '../data/templateData';

export default function Testimonials() {
  return (
    <section className="testimonials" id="credentials">
      <div className="testimonial-heading"><p>EDUCATION & CREDENTIALS</p><h2>Continuous learning, validated by industry.</h2></div>
      <div className="testimonial-grid credential-grid">
        {credentials.map((item, index) => (
          <article className={index === 0 ? 'featured' : ''} key={item.name}>
            <div className="credential-top">
              <span className="credential-type">{item.type}</span>
              {(item.verifyUrl || item.documentUrl) && (
                <a
                  href={item.verifyUrl || item.documentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="verify-badge"
                >
                  {item.verifyUrl ? 'Verify Certificate' : item.documentLabel || 'View Certificate'} ↗
                </a>
              )}
            </div>
            <blockquote>{item.name}</blockquote>
            <footer>
              <span className="avatar">{item.issuer.charAt(0)}</span>
              <p>
                <strong>{item.issuer}</strong>
                {item.verifyUrl || item.documentUrl ? (
                  <a
                    href={item.verifyUrl || item.documentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="verify-sublink"
                  >
                    {item.verifyUrl ? 'Official Verification' : item.documentLabel || 'View Certificate'} ↗
                  </a>
                ) : (
                  'Verified learning milestone'
                )}
              </p>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
