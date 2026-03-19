import React from 'react';

const conceptItems = [
  { n: '01', i: '🔮', t: 'Autoconhecimento como Poder', d: 'Descubra seus padrões emocionais, gatilhos e pontos cegos. Quem se conhece profundamente não precisa de aprovação externa.' },
  { n: '02', i: '✨', t: 'Mistério & Ambiguidade', d: 'Aprenda a diferença entre ser misteriosa e ser ambígua — e como usar as duas para criar atração irresistível.' },
  { n: '03', i: '👑', t: 'Presença Magnética', d: 'Linguagem corporal, comunicação e o que você não diz. Como construir uma presença lembrada depois que você sai do ambiente.' },
  { n: '04', i: '💬', t: 'Comunicação com Impacto', d: 'Palavras que ficam. Como se expressar com precisão, criar intriga e conduzir conversas com leveza e intenção.' },
  { n: '05', i: '🛡️', t: 'Inteligência Emocional', d: 'Leia comportamentos, reconheça padrões cedo e tome decisões a partir da sua cabeça — não do medo.' },
  { n: '06', i: '🌹', t: 'Independência como Atração', d: 'Por que mulheres que não precisam são as mais desejadas. Como construir uma vida tão completa que atrai pelo que é.' },
];

export default function ConceptSection() {
  return (
    <section id="conceito" className="sec">
      <div className="chead reveal">
        <div className="slbl">O Conceito da Mulher Completa</div>
        <h2>Não entregamos apenas um Aplicativo.<br />Entregamos um <em>ecossistema</em><br />de transformação.</h2>
        <p className="sdesc">Você se torna o que escolhe cultivar — nos seus relacionamentos, na sua presença, no seu autoconhecimento.</p>
      </div>
      <div className="cgrid">
        {conceptItems.map((c) => (
          <div key={c.n} className="cc reveal">
            <div className="cn">{c.n}</div>
            <span className="cicon">{c.i}</span>
            <div className="ct">{c.t}</div>
            <p className="cd">{c.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
