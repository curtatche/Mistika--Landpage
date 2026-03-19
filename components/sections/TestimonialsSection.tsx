import React from 'react';

const testimonials = [
  { a: 'Camila R.', l: 'São Paulo · 29 anos', q: 'Depois de meses rodando em círculos, o Mistika me fez enxergar meu padrão. Hoje me relaciono de um lugar de poder e não de necessidade.', i: '👩' },
  { a: 'Fernanda M.', l: 'Rio de Janeiro · 33 anos', q: 'O conceito de energia mudou tudo pra mim. Parei de tentar ser o que eles querem e comecei a ser quem sou. O resultado foi imediato.', i: '👩‍🦱' },
  { a: 'Júlia S.', l: 'Belo Horizonte · 26 anos', q: 'O App de Escrita Terapêutica foi o bônus que mais me transformou. Processei coisas que carregava há anos. Vale muito mais que o investimento.', i: '👩‍🦰' },
];

export default function TestimonialsSection() {
  return (
    <section id="depos" className="sec">
      <div className="dhead reveal">
        <div className="slbl">Histórias reais</div>
        <h2>Elas já <em>mudaram</em><br />o jogo delas</h2>
      </div>
      <div className="dgrid">
        {testimonials.map((d, i) => (
          <div key={i} className="dcard reveal">
            <div className="dq">&quot;</div>
            <div className="dstars">★★★★★</div>
            <p className="dtext">{d.q}</p>
            <div className="dauthor">
              <div className="dava">{d.i}</div>
              <div>
                <div className="dname">{d.a}</div>
                <div className="dloc">{d.l}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
