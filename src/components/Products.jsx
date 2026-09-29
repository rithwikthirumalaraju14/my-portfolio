import { projects } from '../data/templateData';

export default function Products() {
  return (
    <section className="products" id="projects">
      <div className="work-heading"><p> PROJECTS</p><h2>AI systems built to move from <em>prototype to production.</em></h2></div>
      {projects.map((item, index) => (
        <article className={`product ${item.tone}`} key={item.title}>
          <div className="product-copy">
            <span className="product-number">0{index + 1}</span>
            <p className="overline">{item.eyebrow}</p>
            <h2>{item.title}</h2>
            <p className="product-description">{item.description}</p>
            <ul>{item.meta.map((entry) => <li key={entry}>✦ {entry}</li>)}</ul>
            <div className="product-actions">
              <a
                href={item.link}
                {...(item.link.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                {item.action} <span>↗</span>
              </a>
              <b>{item.location}<small>{item.period}</small></b>
            </div>
          </div>
          <div className="product-art system-art"><span className="art-orbit" /><div className="system-window"><div className="window-bar"><i /><i /><i /></div><pre>{item.visual.join('\n')}</pre><span>STATUS · READY</span></div></div>
        </article>
      ))}
    </section>
  );
}
