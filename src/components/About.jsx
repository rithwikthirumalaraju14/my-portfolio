import { skillGroups } from '../data/templateData';

export default function About() {
  return (
    <section className="about skills-section" id="skills">
      <div className="about-heading"><p>TECHNICAL SKILLS</p><h2>Engineering across the complete <em>AI stack</em></h2></div>
      <div className="skills-layout">
        <div className="skills-intro"><p>From model integration and retrieval to APIs and deployment, I work across the layers required to ship useful AI products.</p><div className="code-block"><span>$ whoami</span><strong>AI/ML Engineer</strong><span>$ primary_language</span><strong>Python</strong><span>$ focus</span><strong>Production AI</strong></div></div>
        <div className="facts skill-facts">{skillGroups.map((group) => <div className="fact" key={group.number}><strong>{group.number}</strong><div><h3>{group.title}</h3><p>{group.items.join(' · ')}</p></div></div>)}</div>
      </div>
      <div className="about-quote">“Build scalable AI services that transform natural language into structured intelligence.”</div>
      <div className="student-banner"><strong>2024<span>+</span></strong><p>B.Tech Computer Science and Engineering graduate</p><a href="#credentials">View credentials <span>↗</span></a></div>
    </section>
  );
}
