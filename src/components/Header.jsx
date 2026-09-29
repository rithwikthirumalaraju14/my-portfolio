import { useEffect, useState } from 'react';

const links = [
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['Credentials', '#credentials'],
];

export default function Header() {
  const [variant, setVariant] = useState('default');

  useEffect(() => {
    const targets = [
      ['projects', 'scroll'],
      ['skills', 'dark'],
      ['credentials', 'scroll'],
      ['contact', 'scroll'],
    ];

    const updateVariant = () => {
      let nextVariant = 'default';

      targets.forEach(([id, targetVariant]) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 1) {
          nextVariant = targetVariant;
        }
      });

      setVariant(nextVariant);
    };

    updateVariant();
    window.addEventListener('scroll', updateVariant, { passive: true });
    window.addEventListener('resize', updateVariant);

    return () => {
      window.removeEventListener('scroll', updateVariant);
      window.removeEventListener('resize', updateVariant);
    };
  }, []);

  return (
    <div className="nav-wrap">
      <header className={`topbar ${variant}`}>
        <div className="nav-pill">
          <a className="brand" href="#top" aria-label="Rithwik home">
            <span className="brand-image">
              <img src="/logo.png" alt="Rithwik" />
            </span>
            <strong>Rithwik</strong>
          </a>
          <nav className="topnav" aria-label="Main navigation">
            {links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
          </nav>
          <a className="start-button" href="#contact">Contact</a>
        </div>
      </header>
    </div>
  );
}
