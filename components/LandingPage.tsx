'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

export default function LandingPage() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    // ── TICKER ──
    const msgs = [
      'Não é sobre beleza, é sobre energia',
      'Domine a Arte da Conquista',
      '10x de R$ 4,99 sem juros',
      'App de Escrita Terapêutica incluso',
      'Planner Lei da Atração de presente',
      '30 Dias de Acompanhamento Diário'
    ];
    const tk = document.getElementById('tk');
    if (tk) {
      let html = '';
      for (let i = 0; i < 2; i++) {
        msgs.forEach((m) => {
          html += `<span class="tick-item">${m}</span>`;
        });
      }
      tk.innerHTML = html;
    }

    // ── FAQ ──
    document.querySelectorAll('.fq').forEach((btn) => {
      (btn as HTMLElement).onclick = () => {
        const fi = btn.closest('.fi');
        const isOpen = fi?.classList.contains('open');
        document.querySelectorAll('.fi.open').forEach((el) => el.classList.remove('open'));
        if (!isOpen) fi?.classList.add('open');
      };
    });

    // ── SCROLL REVEAL ──
    const els = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
      els.forEach((el) => obs.observe(el));
    } else {
      els.forEach((el) => el.classList.add('visible'));
    }

    // ── SALES TOAST ──
    const toast = document.getElementById('salesToast');
    if (toast) {
      const imgEl = document.getElementById('stImg') as HTMLImageElement;
      const titleEl = document.getElementById('stTitle');
      const descEl = document.getElementById('stDesc');
      const timeEl = document.getElementById('stTime');
      const people = [
        { name: 'Amanda Silva', loc: 'São Paulo, SP', img: 'https://randomuser.me/api/portraits/women/10.jpg' },
        { name: 'Juliana Costa', loc: 'Rio de Janeiro, RJ', img: 'https://randomuser.me/api/portraits/women/20.jpg' },
        { name: 'Mariana Souza', loc: 'Belo Horizonte, MG', img: 'https://randomuser.me/api/portraits/women/30.jpg' },
        { name: 'Beatriz Lima', loc: 'Curitiba, PR', img: 'https://randomuser.me/api/portraits/women/40.jpg' },
        { name: 'Fernanda Alves', loc: 'Porto Alegre, RS', img: 'https://randomuser.me/api/portraits/women/50.jpg' },
        { name: 'Camila Ribeiro', loc: 'Salvador, BA', img: 'https://randomuser.me/api/portraits/women/60.jpg' },
        { name: 'Patricia Gomes', loc: 'Recife, PE', img: 'https://randomuser.me/api/portraits/women/70.jpg' },
        { name: 'Letícia Martins', loc: 'Fortaleza, CE', img: 'https://randomuser.me/api/portraits/women/80.jpg' }
      ];
      const times = ['Agora mesmo', 'Há 2 minutos', 'Há 5 minutos', 'Há 12 minutos', 'Há alguns instantes'];
      
      const showToast = () => {
        const p = people[Math.floor(Math.random() * people.length)];
        if (imgEl) imgEl.src = p.img;
        if (titleEl) titleEl.innerHTML = `<strong>${p.name}</strong> comprou`;
        if (descEl) descEl.textContent = `de ${p.loc}`;
        if (timeEl) timeEl.textContent = times[Math.floor(Math.random() * times.length)];
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 4500);
      };
      
      const toastTimeout = setTimeout(() => {
        showToast();
        setInterval(showToast, 12000 + Math.random() * 8000);
      }, 4000);

      return () => clearTimeout(toastTimeout);
    }

    // ── COOKIES ──
    const banner = document.getElementById('cookieBanner');
    const accept = document.getElementById('btnAcceptCookies');
    const reject = document.getElementById('btnRejectCookies');
    if (banner && !localStorage.getItem('mistika_cookies')) {
      setTimeout(() => { banner.classList.add('show'); }, 1000);
    }
    const hideBanner = () => banner?.classList.remove('show');
    accept?.addEventListener('click', () => { localStorage.setItem('mistika_cookies', 'true'); hideBanner(); });
    reject?.addEventListener('click', () => { localStorage.setItem('mistika_cookies', 'false'); hideBanner(); });

    // ── VIEWER COUNT ──
    const viewers = document.getElementById('viewerCount');
    if (viewers) {
      let base = 2847;
      const viewerInterval = setInterval(() => {
        base = Math.max(2700, base + Math.floor(Math.random() * 40) - 20);
        viewers.textContent = base.toLocaleString('pt-BR');
      }, 5000);
      return () => clearInterval(viewerInterval);
    }
  }, []);

  // ── YOUTUBE API ──
  useEffect(() => {
    let ytPlayer: any;
    let progressInterval: any;

    const initPlayer = () => {
      if (!(window as any).YT || !(window as any).YT.Player) return;
      
      ytPlayer = new (window as any).YT.Player('ytPlayer', {
        videoId: 'qHFPO9Yle0E',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          showinfo: 0,
          rel: 0,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          playsinline: 1
        },
        events: {
          onReady: (e: any) => {
            e.target.playVideo();
            progressInterval = setInterval(() => {
              if (!ytPlayer || typeof ytPlayer.getDuration !== 'function') return;
              const dur = ytPlayer.getDuration();
              const cur = ytPlayer.getCurrentTime();
              if (dur > 0) {
                const pct = Math.min(100, (cur / dur) * 100);
                const fill = document.getElementById('videoProgressFill');
                if (fill) fill.style.width = `${pct}%`;
              }
            }, 500);
          },
          onStateChange: (e: any) => {
            if (e.data === 0) { // ENDED
              clearInterval(progressInterval);
              const fill = document.getElementById('videoProgressFill');
              if (fill) fill.style.width = '100%';
              const waiting = document.getElementById('priceWaiting');
              if (waiting) waiting.style.display = 'none';
              const bar = document.getElementById('video-info-bar');
              if (bar) {
                bar.classList.add('revealed');
                setTimeout(() => { bar.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 300);
                iniciarTimerUrgencia();
              }
            }
          }
        }
      });
    };

    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }

    const iniciarTimerUrgencia = () => {
      const el = document.getElementById('urgencyTimer');
      if (!el) return;
      const KEY = 'mistika_urgency_end';
      let end: number;
      try {
        const stored = sessionStorage.getItem(KEY);
        end = stored ? parseInt(stored) : Date.now() + 15 * 60 * 1000;
        if (!stored) sessionStorage.setItem(KEY, end.toString());
      } catch (e) {
        end = Date.now() + 15 * 60 * 1000;
      }
      const tick = () => {
        const diff = Math.max(0, end - Date.now());
        const m = Math.floor(diff / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        el.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
        if (diff > 0) requestAnimationFrame(tick);
      };
      tick();
    };

    (window as any).ativarSom = () => {
      if (ytPlayer && typeof ytPlayer.unMute === 'function') {
        ytPlayer.unMute();
        ytPlayer.setVolume(85);
      }
      const btn = document.getElementById('soundBtn');
      if (btn) {
        btn.innerHTML = '<span style="font-size:16px">🔊</span> Som ativado';
        btn.style.borderColor = 'rgba(201,170,109,.8)';
        setTimeout(() => {
          btn.style.opacity = '0';
          btn.style.pointerEvents = 'none';
          setTimeout(() => { btn.style.display = 'none'; }, 600);
        }, 1000);
      }
    };
  }, []);

  const handleCheckout = React.useCallback(async () => {
    if (checkoutLoading) return;
    setCheckoutLoading(true);

    const overlay = document.getElementById('mp-overlay');
    overlay?.classList.add('active');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Checkout failed');

      const data = await response.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error('No init_point returned');
      }
    } catch (error) {
      console.error(error);
      const errorEl = document.getElementById('mp-error');
      if (errorEl) {
        errorEl.textContent = 'Erro ao conectar com o Mercado Pago. Tente novamente.';
        errorEl.style.display = 'block';
        setTimeout(() => { errorEl.style.display = 'none'; }, 5000);
      }
    } finally {
      setCheckoutLoading(false);
      overlay?.classList.remove('active');
    }
  }, [checkoutLoading]);

  useEffect(() => {
    (window as any).iniciarCheckout = handleCheckout;
  }, [handleCheckout]);

  return (
    <>
      <Script src="https://www.youtube.com/iframe_api" strategy="lazyOnload" />
      
      <div dangerouslySetInnerHTML={{ __html: `
        <div class="ticker" aria-hidden="true"><div class="ticker-track" id="tk"></div></div>

        <section id="hero">
          <div class="hero-layout">
            <div class="hero-inner">
              <div class="hero-logo"><img src="https://curtai.online/logosf.png" alt="Mistika" fetchpriority="high"></div>
              <div class="htag">Desenvolvimento pessoal feminino</div>
              <h1>Domine a<br><em>Arte da</em><br>Conquista</h1>
              <div class="hero-social-proof">
                <div class="hsp-avatars"><span>👩</span><span>👩‍🦱</span><span>👩‍🦰</span><span>👩‍🦳</span></div>
                <div class="hsp-text"><strong>+847 mil mulheres</strong> já iniciaram a jornada</div>
              </div>
              <p class="hero-promise">Em <strong>30 dias</strong>, você para de repelir homens de valor e começa a atrair relacionamentos que realmente merece — sem depender da aparência.</p>
              <ul class="bullets">
                <li><div class="bico">✦</div>Descubra sua essência magnética</li>
                <li><div class="bico">✦</div>Pare de repelir homens de valor</li>
                <li><div class="bico">✦</div>Domine a psicologia da atração</li>
              </ul>
            </div>

            <div class="hero-video-col">
              <div class="video-wrap">
                <div class="badge-live"><span class="live-dot"></span>Ao vivo</div>
                <div class="badge-viewers">👁 <span id="viewerCount">2.847</span></div>
                <div class="yt-wrap">
                  <div id="ytPlayer"></div>
                  <div class="yt-blocker"></div>
                  <div id="soundBtn" style="position:absolute;bottom:70px;left:50%;transform:translateX(-50%);z-index:10;display:flex;align-items:center;gap:8px;background:rgba(7,2,10,.85);border:1px solid rgba(201,170,109,.4);padding:10px 18px;cursor:pointer;backdrop-filter:blur(8px);font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;color:var(--cream);white-space:nowrap;transition:border-color .3s ease" onclick="ativarSom()">
                    <span style="font-size:16px">🔇</span> Toque para ativar som
                  </div>
                  <div class="video-gradient"></div>
                </div>
                <div id="videoProgressBar" style="width:100%;height:3px;background:rgba(201,170,109,.12)">
                  <div id="videoProgressFill" style="height:100%;width:0%;background:linear-gradient(90deg,var(--violet),var(--gold),var(--rose));transition:width .5s linear"></div>
                </div>
              </div>

              <div id="priceWaiting" style="width:100%;background:rgba(7,2,10,.92);border:1px solid rgba(201,170,109,.16);border-top:none;padding:20px 24px;display:flex;flex-direction:column;align-items:center;gap:10px">
                <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(245,238,250,.3)">✦ Assista ao vídeo completo ✦</div>
                <div style="display:flex;gap:6px">
                  <span style="width:8px;height:8px;border-radius:50%;background:rgba(201,170,109,.2);animation:dotPulse 1.4s ease-in-out infinite"></span>
                  <span style="width:8px;height:8px;border-radius:50%;background:rgba(201,170,109,.2);animation:dotPulse 1.4s ease-in-out .2s infinite"></span>
                  <span style="width:8px;height:8px;border-radius:50%;background:rgba(201,170,109,.2);animation:dotPulse 1.4s ease-in-out .4s infinite"></span>
                </div>
                <div style="font-size:11px;color:rgba(245,238,250,.22);letter-spacing:.5px">A oferta especial será revelada ao final</div>
              </div>

              <div id="video-info-bar" class="video-info-bar" style="display:none">
                <div style="font-size:11px;letter-spacing:1px;color:rgba(245,238,250,.25);text-decoration:line-through;margin-bottom:2px">De R$ 197,00</div>
                <div style="display:flex;align-items:baseline;justify-content:center;gap:6px;margin-bottom:4px">
                  <div style="font-family:var(--font-playfair),serif;font-size:clamp(36px,5vw,54px);line-height:1;color:var(--cream);font-weight:400"><sup style="font-size:.3em;vertical-align:super;color:var(--gold)">R$</sup>49<span style="font-size:.38em;color:rgba(245,238,250,.38);font-family:var(--font-jost),sans-serif;font-weight:300">,90</span></div>
                  <div style="font-size:12px;color:rgba(245,238,250,.38)">ou 10x de <span style="color:var(--gold);font-weight:600">R$ 4,99</span></div>
                </div>
                <div class="urgency-bar" style="margin-bottom:12px;width:100%">
                  <div class="urgency-dot"></div>
                  <div class="urgency-text">Expira em <span id="urgencyTimer">14:59</span> — <strong>preço sobe para R$ 97</strong></div>
                </div>
                <button onclick="iniciarCheckout()" class="btn-hero" style="opacity:1;animation:none;margin-bottom:8px"><span>✦</span>Começar Agora<span>→</span></button>
                <p class="bhint" style="opacity:1;animation:none">🔒 Pagamento seguro · Acesso imediato · Garantia 30 dias</p>
              </div>
            </div>
          </div>
        </section>

        <div class="proof">
          <div class="pitem"><div class="pico">👑</div><div><span class="pnum">847K+</span><div class="plbl">mulheres na jornada</div></div></div>
          <div class="pitem"><div class="pico">⭐</div><div><span class="pnum">4.9</span><div class="plbl">avaliação média</div></div></div>
          <div class="pitem"><div class="pico">🔥</div><div><span class="pnum">92%</span><div class="plbl">com mais confiança</div></div></div>
          <div class="pitem"><div class="pico">🛡️</div><div><span class="pnum">30</span><div class="plbl">dias de garantia</div></div></div>
        </div>

        <section id="about" class="sec">
          <div class="about-grid">
            <div class="reveal"><div class="aquote">Não é sobre<br>beleza,<br><em>é sobre energia.</em><span class="acc">O magnetismo real vem da harmonia entre sua psicologia e sua expressão externa.</span></div></div>
            <div class="reveal">
              <div class="slbl">A verdade que ninguém te contou</div>
              <p class="abody">A ciência da atração não tem uma relação com os padrões estéticos. <strong>Mulheres verdadeiramente magnéticas</strong> desenvolveram algo que vai muito além da aparência: uma presença que transforma ambientes, conversas e relacionamentos.</p>
              <div class="pillars">
                <div class="pillar"><div class="pil-ico">🧠</div><div><div class="pil-t">Psicologia da Atração</div><div class="pil-d">Entenda como a mente masculina funciona e o que cria atração genuína e duradoura.</div></div></div>
                <div class="pillar"><div class="pil-ico">⚡</div><div><div class="pil-t">Energia e Presença</div><div class="pil-d">Como sua frequência interna determina quem você atrai — e quem você repele.</div></div></div>
                <div class="pillar"><div class="pil-ico">🌑</div><div><div class="pil-t">Mistério e Ambiguidade</div><div class="pil-d">A arte de ser inesquecível sem se entregar de bandeja. O poder do não-dito.</div></div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="conceito" class="sec">
          <div class="chead reveal">
            <div class="slbl">O Conceito da Mulher Completa</div>
            <h2>Não entregamos apenas um Aplicativo.<br>Entregamos um <em>ecossistema</em><br>de transformação.</h2>
            <p class="sdesc">Você se torna o que escolhe cultivar — nos seus relacionamentos, na sua presença, no seu autoconhecimento.</p>
          </div>
          <div class="cgrid">
            <div class="cc reveal"><div class="cn">01</div><span class="cicon">🔮</span><div class="ct">Autoconhecimento como Poder</div><p class="cd">Descubra seus padrões emocionais, gatilhos e pontos cegos. Quem se conhece profundamente não precisa de aprovação externa.</p></div>
            <div class="cc reveal"><div class="cn">02</div><span class="cicon">✨</span><div class="ct">Mistério &amp; Ambiguidade</div><p class="cd">Aprenda a diferença entre ser misteriosa e ser ambígua — e como usar as duas para criar atração irresistível.</p></div>
            <div class="cc reveal"><div class="cn">03</div><span class="cicon">👑</span><div class="ct">Presença Magnética</div><p class="cd">Linguagem corporal, comunicação e o que você não diz. Como construir uma presença lembrada depois que você sai do ambiente.</p></div>
            <div class="cc reveal"><div class="cn">04</div><span class="cicon">💬</span><div class="ct">Comunicação com Impacto</div><p class="cd">Palavras que ficam. Como se expressar com precisão, criar intriga e conduzir conversas com leveza e intenção.</p></div>
            <div class="cc reveal"><div class="cn">05</div><span class="cicon">🛡️</span><div class="ct">Inteligência Emocional</div><p class="cd">Leia comportamentos, reconheça padrões cedo e tome decisões a partir da sua cabeça — não do medo.</p></div>
            <div class="cc reveal"><div class="cn">06</div><span class="cicon">🌹</span><div class="ct">Independência como Atração</div><p class="cd">Por que mulheres que não precisam são as mais desejadas. Como construir uma vida tão completa que atrai pelo que é.</p></div>
          </div>
        </section>

        <section id="bonus" class="sec">
          <div class="bhead reveal">
            <div class="slbl">Bônus exclusivos</div>
            <h2>A <em>jornada</em> exata<br>para a sua transformação</h2>
            <p class="sdesc">Ao adquirir o acesso ao aplicativo, você terá 30 dias de acompanhamento diário com vídeos explicativos, metas e tarefas para transformar sua vida.</p>
          </div>
          <div class="bgifts">
            <div class="gc reveal"><div class="gtag">✦ Bônus Exclusivo</div><span class="gico">✍️</span><div class="gt">App de Escrita Terapêutica</div><p class="gd">Desbloqueie suas travas emocionais e cure feridas do passado através da escrita guiada. Um espaço seguro para processar, crescer e se libertar.</p><div class="gv">Incluído sem custo adicional</div></div>
            <div class="gc reveal"><div class="gtag">🎁 Presente</div><span class="gico">🌙</span><div class="gt">Planner Lei da Atração</div><p class="gd">Manifeste a vida e o relacionamento dos seus sonhos com nosso guia de visualização diária. Combine intenção com ação para criar resultados reais.</p><div class="gv">Incluído sem custo adicional</div></div>
            <div class="gc gc-ai reveal"><div class="gtag gtag-ai">🤖 Novo · Exclusivo</div><span class="gico">💬</span><div class="gt">Conselheira Lyra — IA 24/7</div><p class="gd">Sua conselheira pessoal disponível a qualquer hora. Recebeu uma mensagem e não sabe como responder? Cole aqui e receba a orientação exata — sem julgamentos.</p><ul class="gc-ai-list"><li><span>✦</span>"Como respondo sem parecer ansiosa?"</li><li><span>✦</span>"Ele sumiu — devo falar primeiro?"</li><li><span>✦</span>"O que esse comportamento significa?"</li><li><span>✦</span>"Estou agindo certo ou errando?"</li></ul><div class="gv gv-ai">✦ Disponível 24h · 7 dias por semana · Incluso no acesso</div></div>
          </div>
        </section>

        <section id="depos" class="sec">
          <div class="dhead reveal"><div class="slbl">Histórias reais</div><h2>Elas já <em>mudaram</em><br>o jogo delas</h2></div>
          <div class="dgrid">
            <div class="dcard reveal"><div class="dq">"</div><div class="dstars">★★★★★</div><p class="dtext">Depois de meses rodando em círculos, o Mistika me fez enxergar meu padrão. Hoje me relaciono de um lugar de poder e não de necessidade.</p><div class="dauthor"><div class="dava">👩</div><div><div class="dname">Camila R.</div><div class="dloc">São Paulo · 29 anos</div></div></div></div>
            <div class="dcard reveal"><div class="dq">"</div><div class="dstars">★★★★★</div><p class="dtext">O conceito de energia mudou tudo pra mim. Parei de tentar ser o que eles querem e comecei a ser quem sou. O resultado foi imediato.</p><div class="dauthor"><div class="dava">👩‍🦱</div><div><div class="dname">Fernanda M.</div><div class="dloc">Rio de Janeiro · 33 anos</div></div></div></div>
            <div class="dcard reveal"><div class="dq">"</div><div class="dstars">★★★★★</div><p class="dtext">O App de Escrita Terapêutica foi o bônus que mais me transformou. Processei coisas que carregava há anos. Vale muito mais que o investimento.</p><div class="dauthor"><div class="dava">👩‍🦰</div><div><div class="dname">Júlia S.</div><div class="dloc">Belo Horizonte · 26 anos</div></div></div></div>
          </div>
        </section>

        <section id="pricing" class="sec">
          <div class="pricewrap">
            <div class="pricehead reveal"><div class="slbl">Seu investimento</div><h2>Comece hoje.<br><em>Mude para sempre.</em></h2></div>
            <div class="pcard reveal">
              <div class="pcardtop"><div class="pey">✦ Acesso completo · Vitalício ✦</div><div class="ppwas">De R$ 197,00</div><div class="ppprice"><sup>R$</sup>49<sub>,90</sub></div><div class="psep">ou</div><div class="pparc">10x de R$ 4,99 <span>sem juros</span></div><div class="pcafe2">✦ Investimento menor que um cafezinho por mês.</div></div>
              <div class="pdiv"></div>
              <div class="pcinc">
                <div class="inctitle">O que está incluso</div>
                <ul class="inclist"><li>30 dias de acompanhamento diário para transformar sua vida</li><li class="gift">Bônus — App de Escrita Terapêutica</li><li class="gift">Presente — Planner Lei da Atração</li><li class="gift">Bônus — Conselheira IA 24/7</li><li>Comunidade VIP de mulheres na jornada</li><li>Atualizações gratuitas para sempre</li></ul>
                <button onclick="iniciarCheckout()" class="btncta">✦ Começar Agora</button>
                <p class="ctahint">🔒 Pagamento 100% seguro · Acesso imediato após confirmação</p>
              </div>
              <div class="pdiv"></div>
              <div class="guar"><div class="guarico">🛡️</div><div>Garantia incondicional de 30 dias. Não gostou? Devolvemos 100% do seu investimento, sem perguntas.</div></div>
            </div>
          </div>
        </section>

        <section id="faq" class="sec">
          <div class="faqwrap">
            <div class="faqhead reveal"><div class="slbl">Dúvidas frequentes</div><h2>Tudo que você<br>precisa <em>saber</em></h2></div>
            <div class="fi"><button class="fq">Como funciona o acesso? <div class="fplus">+</div></button><div class="fb">Após o pagamento confirmado, você recebe acesso imediato por e-mail. O conteúdo fica disponível 24/7 no app para iOS e Android, além da versão web.</div></div>
            <div class="fi"><button class="fq">O parcelamento tem juros? <div class="fplus">+</div></button><div class="fb">Não. Você parcela em até 10x de R$ 4,99 sem nenhum acréscimo. O valor total permanece R$ 49,90.</div></div>
            <div class="fi"><button class="fq">É só para mulheres solteiras? <div class="fplus">+</div></button><div class="fb">Não. O Mistika é para qualquer mulher que quer se conhecer melhor e se relacionar com mais poder — solteira, namorando ou em qualquer fase da vida.</div></div>
            <div class="fi"><button class="fq">Os bônus estão inclusos no R$ 49,90? <div class="fplus">+</div></button><div class="fb">Sim! Todos os bônus estão inclusos no acesso principal. Tudo por R$ 49,90 à vista ou 10x de R$ 4,99.</div></div>
            <div class="fi"><button class="fq">E se eu não gostar? <div class="fplus">+</div></button><div class="fb">Você tem 30 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeita, basta pedir o reembolso e devolvemos 100% do valor pago.</div></div>
          </div>
        </section>

        <section id="final">
          <div class="fininner reveal">
            <div class="slbl">Última chamada</div>
            <h2>Você não precisa<br>de sorte.<br><em>Precisa de estratégia.</em></h2>
            <p>Mais de 847 mil mulheres já iniciaram a jornada. A versão de você que atrai o que merece começa com uma decisão de R$ 4,99.</p>
            <div class="finbtns">
              <button onclick="iniciarCheckout()" class="btnfin">✦ Começar Agora</button>
              <a href="#conceito" class="btnghost">Ver o que está incluso</a>
            </div>
          </div>
        </section>

        <div class="mp-overlay" id="mp-overlay"><div class="mp-spinner"></div><div class="mp-msg">Preparando seu checkout seguro…</div></div>
        <div class="mp-error" id="mp-error"></div>

        <div class="cookie-banner" id="cookieBanner">
          <p class="cb-text"><strong>Privacidade e Cookies:</strong> Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa <a href="privacidade.html">Política de Privacidade</a>.</p>
          <div class="cb-btns"><button class="btn-cookie btn-cookie-alt" id="btnRejectCookies">Recusar</button><button class="btn-cookie" id="btnAcceptCookies">Aceitar Tudo</button></div>
        </div>

        <div class="sales-toast" id="salesToast">
          <img src="" alt="" class="st-img" id="stImg">
          <div><div class="st-title" id="stTitle">...</div><div class="st-desc" id="stDesc">...</div><div class="st-time" id="stTime">Agora mesmo</div></div>
        </div>

        <footer>
          <img src="https://curtai.online/logosf.png" alt="Mistika" style="height:28px;width:auto" loading="lazy">
          <div class="flinks"><a href="privacidade.html">Privacidade</a><a href="termos.html">Termos de Uso</a></div>
          <div class="fcopy">© 2025 Mistika App · Todos os direitos reservados</div>
        </footer>
      ` }} />
    </>
  );
}
