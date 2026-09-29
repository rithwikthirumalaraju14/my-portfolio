import { experiences } from '../data/templateData';

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-heading">
        <p>PROFESSIONAL EXPERIENCE</p>
        <h2>Where ideas became <em>working systems.</em></h2>
      </div>
      <div className="experience-timeline">
        {experiences.map((item, index) => (
          <article className="timeline-item" key={`${item.company}-${item.period}`}>
            <span className="timeline-number">0{index + 1}</span>
            <div className="timeline-role">
              <p>{item.role}</p>
              <h3>{item.company}</h3>
            </div>
            <div className="timeline-details">
              <div className="timeline-meta"><span>{item.period}</span><span>{item.location}</span></div>
              <p>{item.summary}</p>
              <div className="timeline-tags">{item.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
