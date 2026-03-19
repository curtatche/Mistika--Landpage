import React from 'react';

interface FinalSectionProps {
  handleCheckout: () => void;
}

export default function FinalSection({ handleCheckout }: FinalSectionProps) {
  return (
    <section id="final">
      <div className="fininner reveal">
        <div className="slbl">Última chamada</div>
        <h2>Você não precisa<br />de sorte.<br /><em>Precisa de estratégia.</em></h2>
        <p>Mais de 847 mil mulheres já iniciaram a jornada. A versão de você que atrai o que merece começa com uma decisão de R$ 2,99.</p>
        <div className="finbtns">
          <button onClick={handleCheckout} className="btnfin">✦ Começar Agora</button>
          <a href="#conceito" className="btnghost">Ver o que está incluso</a>
        </div>
      </div>
    </section>
  );
}
