import React from 'react';

interface FaqSectionProps {
  openFaqIndices: number[];
  toggleFaq: (index: number) => void;
}

const faqItems = [
  { q: 'Como funciona o acesso?', a: 'Após o pagamento confirmado, você recebe acesso imediato por e-mail. O conteúdo fica disponível 24/7 no app para iOS e Android, além da versão web.' },
  { q: 'O parcelamento tem juros?', a: 'Não. Você parcela em até 10x de R$ 2,99 sem nenhum acréscimo. O valor total permanece R$ 29,90.' },
  { q: 'É só para mulheres solteiras?', a: 'Não. O Mistika é para qualquer mulher que quer se conhecer melhor e se relacionar com mais poder — solteira, namorando ou em qualquer fase da vida.' },
  { q: 'Os bônus estão inclusos no R$ 29,90?', a: 'Sim! Todos os bônus estão inclusos no acesso principal. Tudo por R$ 29,90 à vista ou 10x de R$ 2,99.' },
  { q: 'E se eu não gostar?', a: 'Você tem 30 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeita, basta pedir o reembolso e devolvemos 100% do valor pago.' },
];

export default function FaqSection({ openFaqIndices, toggleFaq }: FaqSectionProps) {
  return (
    <section id="faq" className="sec">
      <div className="faqwrap">
        <div className="faqhead reveal">
          <div className="slbl">Dúvidas frequentes</div>
          <h2>Tudo que você<br />precisa <em>saber</em></h2>
        </div>
        {faqItems.map((item, i) => (
          <div key={i} className="fi">
            <button className="fq" onClick={() => toggleFaq(i)}>
              {item.q} <div className="fplus">{openFaqIndices.includes(i) ? '-' : '+'}</div>
            </button>
            {openFaqIndices.includes(i) && <div className="fb" style={{ display: 'block' }}>{item.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
