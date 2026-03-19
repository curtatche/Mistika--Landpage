import React from 'react';

export default function BonusSection() {
  return (
    <section id="bonus" className="sec">
      <div className="bhead reveal">
        <div className="slbl">Bônus exclusivos</div>
        <h2>A <em>jornada</em> exata<br />para a sua transformação</h2>
        <p className="sdesc">Ao adquirir o acesso ao aplicativo, você terá 30 dias de acompanhamento diário com vídeos explicativos, metas e tarefas para transformar sua vida.</p>
      </div>
      <div className="bgifts">
        <div className="gc reveal">
          <div className="gtag">✦ Bônus Exclusivo</div>
          <span className="gico">✍️</span>
          <div className="gt">App de Escrita Terapêutica</div>
          <p className="gd">Desbloqueie suas travas emocionais e cure feridas do passado através da escrita guiada. Um espaço seguro para processar, crescer e se libertar.</p>
          <div className="gv">Incluído sem custo adicional</div>
        </div>
        <div className="gc reveal">
          <div className="gtag">🎁 Presente</div>
          <span className="gico">🌙</span>
          <div className="gt">Planner Lei da Atração</div>
          <p className="gd">Manifeste a vida e o relacionamento dos seus sonhos com nosso guia de visualização diária. Combine intenção com ação para criar resultados reais.</p>
          <div className="gv">Incluído sem custo adicional</div>
        </div>
        <div className="gc gc-ai reveal">
          <div className="gtag gtag-ai">🤖 Novo · Exclusivo</div>
          <span className="gico">💬</span>
          <div className="gt">Conselheira Lyra — IA 24/7</div>
          <p className="gd">Sua conselheira pessoal disponível a qualquer hora. Recebeu uma mensagem e não sabe como responder? Cole aqui e receba a orientação exata — sem julgamentos.</p>
          <ul className="gc-ai-list">
            <li><span>✦</span>&quot;Como respondo sem parecer ansiosa?&quot;</li>
            <li><span>✦</span>&quot;Ele sumiu — devo falar primeiro?&quot;</li>
            <li><span>✦</span>&quot;O que esse comportamento significa?&quot;</li>
            <li><span>✦</span>&quot;Estou agindo certo ou errando?&quot;</li>
          </ul>
          <div className="gv gv-ai">✦ Disponível 24h · 7 dias por semana · Incluso no acesso</div>
        </div>
      </div>
    </section>
  );
}
