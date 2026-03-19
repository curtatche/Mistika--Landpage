import React from 'react';

interface PricingSectionProps {
  handleCheckout: () => void;
}

export default function PricingSection({ handleCheckout }: PricingSectionProps) {
  return (
    <section id="pricing" className="sec">
      <div className="pricewrap">
        <div className="pricehead reveal">
          <div className="slbl">Seu investimento</div>
          <h2>Comece hoje.<br /><em>Mude para sempre.</em></h2>
        </div>
        <div className="pcard reveal">
          <div className="pcardtop">
            <div className="pey">✦ Acesso completo · Vitalício ✦</div>
            <div className="ppwas">De R$ 49,90</div>
            <div className="ppprice"><sup>R$</sup>29<sub>,90</sub></div>
            <div className="psep">ou</div>
            <div className="pparc">10x de R$ 2,99 <span>sem juros</span></div>
            <div className="pcafe2">✦ Investimento menor que um cafezinho por mês.</div>
          </div>
          <div className="pdiv" />
          <div className="pcinc">
            <div className="inctitle">O que está incluso</div>
            <ul className="inclist">
              <li>30 dias de acompanhamento diário para transformar sua vida</li>
              <li className="gift">Bônus — App de Escrita Terapêutica</li>
              <li className="gift">Presente — Planner Lei da Atração</li>
              <li className="gift">Bônus — Conselheira IA 24/7</li>
              <li>Comunidade VIP de mulheres na jornada</li>
              <li>Atualizações gratuitas para sempre</li>
            </ul>
            <button onClick={handleCheckout} className="btncta">✦ Começar Agora</button>
            <p className="ctahint">🔒 Pagamento 100% seguro · Acesso imediato após confirmação</p>
          </div>
          <div className="pdiv" />
          <div className="guar">
            <div className="guarico">🛡️</div>
            <div>Garantia incondicional de 30 dias. Não gostou? Devolvemos 100% do seu investimento, sem perguntas.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
