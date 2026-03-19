import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="sec">
      <div className="about-grid">
        <div className="reveal">
          <div className="aquote">Não é sobre<br />beleza,<br /><em>é sobre energia.</em><span className="acc">O magnetismo real vem da harmonia entre sua psicologia e sua expressão externa.</span></div>
        </div>
        <div className="reveal">
          <div className="slbl">A verdade que ninguém te contou</div>
          <p className="abody">A ciência da atração não tem uma relação com os padrões estéticos. <strong>Mulheres verdadeiramente magnéticas</strong> desenvolveram algo que vai muito além da aparência: uma presença que transforma ambientes, conversas e relacionamentos.</p>
          <div className="pillars">
            <div className="pillar">
              <div className="pil-ico">🧠</div>
              <div>
                <div className="pil-t">Psicologia da Atração</div>
                <div className="pil-d">Entenda como a mente masculina funciona e o que cria atração genuína e duradoura.</div>
              </div>
            </div>
            <div className="pillar">
              <div className="pil-ico">⚡</div>
              <div>
                <div className="pil-t">Energia e Presença</div>
                <div className="pil-d">Como sua frequência interna determina quem você atrai — e quem você repele.</div>
              </div>
            </div>
            <div className="pillar">
              <div className="pil-ico">🌑</div>
              <div>
                <div className="pil-t">Mistério e Ambiguidade</div>
                <div className="pil-d">A arte de ser inesquecível sem se entregar de bandeja. O poder do não-dito.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
