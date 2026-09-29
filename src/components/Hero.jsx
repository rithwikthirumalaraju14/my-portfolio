import { resumeUrl } from '../utils/downloadResume';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="mini-pill">AI Engineer <span>●</span></div>
        <h1>Hi, I’m Rithwik.<br />I’m a <em>Query Whisperer.</em></h1>
        <p>I build AI systems that turn everyday questions into useful answers. I work with language models, graph databases, and agents—taking ideas from experiments to working software.</p>
        <div className="hero-actions">
          <a className="hero-projects-link" href="#projects">View projects <span aria-hidden="true">↗</span></a>
          <a className="hero-resume-link" href={resumeUrl} download="Rithwik_Thirumalaraju_Resume.pdf" type="application/pdf">
            Download resume
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="m7 10 5 5 5-5" />
              <path d="M12 15V3" />
            </svg>
          </a>
        </div>
      </div>
      <div className="hero-stage ai-stage" aria-hidden="true">
        <div className="hero-glow" />
        <div className="ai-card ai-card-one"><small>01 · ASK</small><strong>Plain-English question</strong><code>question → intent</code></div>
        <div className="ai-card ai-card-two"><small>02 · FIND</small><strong>Right context</strong><code>graph + retrieval</code></div>
        <div className="ai-card ai-card-three"><small>03 · ANSWER</small><strong>Clear explanation</strong><code>results → insight</code></div>
      </div>
    </section>
  );
}
