'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

export default function LandingPage() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [viewerCount, setViewerCount] = useState(2847);
  const [toast, setToast] = useState<{ show: boolean; person?: any; time?: string }>({ show: false });
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([]);
  const [urgencyEnd, setUrgencyEnd] = useState<number | null>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // ── CHECK COOKIES ──
    const stored = localStorage.getItem('mistika_cookies');
    if (stored === null) {
      setTimeout(() => setShowCookieBanner(true), 1000);
    } else {
      setCookiesAccepted(stored === 'true');
    }

    // ── VIEWER COUNT ──
    const viewerInterval = setInterval(() => {
      setViewerCount((prev: number) => Math.max(2700, prev + Math.floor(Math.random() * 40) - 20));
    }, 5000);

    // ── SALES TOAST ──
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

    const showRandomToast = () => {
      const p = people[Math.floor(Math.random() * people.length)];
      setToast({ show: true, person: p, time: times[Math.floor(Math.random() * times.length)] });
      setTimeout(() => setToast((prev: any) => ({ ...prev, show: false })), 4500);
    };

    const firstToast = setTimeout(showRandomToast, 4000);
    const toastInterval = setInterval(showRandomToast, 15000);

    return () => {
      clearInterval(viewerInterval);
      clearTimeout(firstToast);
      clearInterval(toastInterval);
    };
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('mistika_cookies', 'true');
    setCookiesAccepted(true);
    setShowCookieBanner(false);
  };

  const handleRejectCookies = () => {
    localStorage.setItem('mistika_cookies', 'false');
    setCookiesAccepted(false);
    setShowCookieBanner(false);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev: number[]) => prev.includes(index) ? prev.filter((i: number) => i !== index) : [...prev, index]);
  };

  // ── TICKER ──
  useEffect(() => {
    const msgs = [
      'Não é sobre beleza, é sobre energia',
      'Domine a Arte da Conquista',
      '10x de R$ 2,99 sem juros',
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
  }, []);

  // ── SCROLL REVEAL ──
  useEffect(() => {
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
  }, []);
  useEffect(() => {
    let ytPlayer: any;
    let progressInterval: any;

    const initPlayer = () => {
      if (!(window as any).YT || !(window as any).YT.Player) return;

      ytPlayer = new (window as any).YT.Player('ytPlayer', {
        videoId: 'W1hNfT4snt8',
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
          playsinline: 1,
        },
        events: {
          onReady: (e: any) => {
            e.target.playVideo();
            progressInterval = setInterval(() => {
              if (!ytPlayer || typeof ytPlayer.getDuration !== 'function') return;
              const dur = ytPlayer.getDuration();
              const cur = ytPlayer.getCurrentTime();
              if (dur > 0) {
                setVideoProgress(Math.min(100, (cur / dur) * 100));
              }
            }, 500);
          },
          onStateChange: (e: any) => {
            if (e.data === 0) {
              clearInterval(progressInterval);
              setVideoProgress(100);
              setVideoEnded(true);
              iniciarTimerUrgencia();
            }
          },
        },
      });
    };

    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }

    (window as any).ativarSom = () => {
      if (ytPlayer && typeof ytPlayer.unMute === 'function') {
        ytPlayer.unMute();
        setIsMuted(false);
      }
    };

    const iniciarTimerUrgencia = () => {
      const KEY = 'mistika_urgency_end';
      let end: number;
      try {
        const stored = sessionStorage.getItem(KEY);
        end = stored ? parseInt(stored) : Date.now() + 15 * 60 * 1000;
        if (!stored) sessionStorage.setItem(KEY, end.toString());
      } catch (e) {
        end = Date.now() + 15 * 60 * 1000;
      }
      setUrgencyEnd(end);
    };

    return () => clearInterval(progressInterval);
  }, []);

  const [urgencyTimeStr, setUrgencyTimeStr] = useState('14:59');
  useEffect(() => {
    if (!urgencyEnd) return;
    const tick = () => {
      const diff = Math.max(0, urgencyEnd - Date.now());
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setUrgencyTimeStr(`${m}:${s < 10 ? '0' : ''}${s}`);
      if (diff > 0) requestAnimationFrame(tick);
    };
    tick();
  }, [urgencyEnd]);

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

  const tickerMsgs = [
    'Não é sobre beleza, é sobre energia',
    'Domine a Arte da Conquista',
    '10x de R$ 2,99 sem juros',
    'App de Escrita Terapêutica incluso',
    'Planner Lei da Atração de presente',
    '30 Dias de Acompanhamento Diário'
  ];

  return (
    <>
      <Script src="https://www.youtube.com/iframe_api" strategy="lazyOnload" />
      
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...tickerMsgs, ...tickerMsgs].map((msg, i) => (
            <span key={i} className="tick-item">{msg}</span>
          ))}
        </div>
      </div>

      <section id="hero">
        <div className="hero-layout">
          <div className="hero-inner">
            <div className="hero-logo">
              <img src="https://curtai.online/logosf.png" alt="Mistika" fetchPriority="high" />
            </div>
            <div className="htag">Desenvolvimento pessoal feminino</div>
            <h1>Domine a<br /><em>Arte da</em><br />Conquista</h1>
            <div className="hero-social-proof">
              <div className="hsp-avatars"><span>👩</span><span>👩‍🦱</span><span>👩‍🦰</span><span>👩‍🦳</span></div>
              <div className="hsp-text"><strong>+847 mil mulheres</strong> já iniciaram a jornada</div>
            </div>
            <p className="hero-promise">Em <strong>30 dias</strong>, você para de repelir homens de valor e começa a atrair relacionamentos que realmente merece — sem depender da aparência.</p>
            <ul className="bullets">
              <li><div className="bico">✦</div>Descubra sua essência magnética</li>
              <li><div className="bico">✦</div>Pare de repelir homens de valor</li>
              <li><div className="bico">✦</div>Domine a psicologia da atração</li>
            </ul>
          </div>

          <div className="hero-video-col">
            <div className="video-wrap">
              <div className="badge-live"><span className="live-dot" />Ao vivo</div>
              <div className="badge-viewers">👁 <span>{viewerCount.toLocaleString('pt-BR')}</span></div>
              <div className="yt-wrap">
                <div id="ytPlayer" />
                <div className="yt-blocker" />
                {!videoEnded && isMuted && (
                  <div
                    id="soundBtn"
                    style={{
                      position: 'absolute',
                      bottom: '70px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(7,2,10,.85)',
                      border: '1px solid rgba(201,170,109,.4)',
                      padding: '10px 18px',
                      cursor: 'pointer',
                      backdropFilter: 'blur(8px)',
                      fontSize: '11px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      color: 'var(--cream)',
                      whiteSpace: 'nowrap',
                      transition: 'border-color .3s ease',
                    }}
                    onClick={() => (window as any).ativarSom?.()}
                  >
                    <span style={{ fontSize: '16px' }}>🔇</span> Toque para ativar som
                  </div>
                )}
                <div className="video-gradient" />
              </div>
              <div id="videoProgressBar" style={{ width: '100%', height: '3px', background: 'rgba(201,170,109,.12)' }}>
                <div id="videoProgressFill" style={{ height: '100%', width: `${videoProgress}%`, background: 'linear-gradient(90deg,var(--violet),var(--gold),var(--rose))', transition: 'width .5s linear' }} />
              </div>
            </div>

            {!videoEnded ? (
              <div id="priceWaiting" style={{ width: '100%', background: 'rgba(7,2,10,.92)', border: '1px solid rgba(201,170,109,.16)', borderTop: 'none', padding: '20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(245,238,250,.3)' }}>✦ Assista ao vídeo completo ✦</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(201,170,109,.2)', animation: 'dotPulse 1.4s ease-in-out infinite' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(201,170,109,.2)', animation: 'dotPulse 1.4s ease-in-out .2s infinite' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(201,170,109,.2)', animation: 'dotPulse 1.4s ease-in-out .4s infinite' }} />
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(245,238,250,.22)', letterSpacing: '.5px' }}>A oferta especial será revelada ao final</div>
              </div>
            ) : (
              <div id="video-info-bar" className="video-info-bar revealed">
                <div style={{ fontSize: '11px', letterSpacing: '1px', color: 'rgba(245,238,250,.25)', textDecoration: 'line-through', marginBottom: '2px' }}>De R$ 49,90</div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                  <div style={{ fontFamily: 'var(--font-playfair),serif', fontSize: 'clamp(36px,5vw,54px)', lineHeight: 1, color: 'var(--cream)', fontWeight: 400 }}><sup style={{ fontSize: '.3em', verticalAlign: 'super', color: 'var(--gold)' }}>R$</sup>29<span style={{ fontSize: '.38em', color: 'rgba(245,238,250,.38)', fontFamily: 'var(--font-jost),sans-serif', fontWeight: 300 }}>,90</span></div>
                  <div style={{ fontSize: '12px', color: 'rgba(245,238,250,.38)' }}>ou 10x de <span style={{ color: 'var(--gold)', fontWeight: 600 }}>R$ 2,99</span></div>
                </div>
                <div className="urgency-bar" style={{ marginBottom: '12px', width: '100%' }}>
                  <div className="urgency-dot" />
                  <div className="urgency-text">Expira em <span id="urgencyTimer">{urgencyTimeStr}</span> — <strong>preço sobe para R$ 49,90</strong></div>
                </div>
                <button onClick={() => handleCheckout()} className="btn-hero" style={{ opacity: 1, animation: 'none', marginBottom: '8px' }}><span>✦</span>Começar Agora<span>→</span></button>
                <p className="bhint" style={{ opacity: 1, animation: 'none' }}>🔒 Pagamento seguro · Acesso imediato · Garantia 30 dias</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="proof">
        <div className="pitem"><div className="pico">👑</div><div><span className="pnum">847K+</span><div className="plbl">mulheres na jornada</div></div></div>
        <div className="pitem"><div className="pico">⭐</div><div><span className="pnum">4.9</span><div className="plbl">avaliação média</div></div></div>
        <div className="pitem"><div className="pico">🔥</div><div><span className="pnum">92%</span><div className="plbl">com mais confiança</div></div></div>
        <div className="pitem"><div className="pico">🛡️</div><div><span className="pnum">30</span><div className="plbl">dias de garantia</div></div></div>
      </div>

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

      <section id="conceito" className="sec">
        <div className="chead reveal">
          <div className="slbl">O Conceito da Mulher Completa</div>
          <h2>Não entregamos apenas um Aplicativo.<br />Entregamos um <em>ecossistema</em><br />de transformação.</h2>
          <p className="sdesc">Você se torna o que escolhe cultivar — nos seus relacionamentos, na sua presença, no seu autoconhecimento.</p>
        </div>
        <div className="cgrid">
          {[
            { n: '01', i: '🔮', t: 'Autoconhecimento como Poder', d: 'Descubra seus padrões emocionais, gatilhos e pontos cegos. Quem se conhece profundamente não precisa de aprovação externa.' },
            { n: '02', i: '✨', t: 'Mistério & Ambiguidade', d: 'Aprenda a diferença entre ser misteriosa e ser ambígua — e como usar as duas para criar atração irresistível.' },
            { n: '03', i: '👑', t: 'Presença Magnética', d: 'Linguagem corporal, comunicação e o que você não diz. Como construir uma presença lembrada depois que você sai do ambiente.' },
            { n: '04', i: '💬', t: 'Comunicação com Impacto', d: 'Palavras que ficam. Como se expressar com precisão, criar intriga e conduzir conversas com leveza e intenção.' },
            { n: '05', i: '🛡️', t: 'Inteligência Emocional', d: 'Leia comportamentos, reconheça padrões cedo e tome decisões a partir da sua cabeça — não do medo.' },
            { n: '06', i: '🌹', t: 'Independência como Atração', d: 'Por que mulheres que não precisam são as mais desejadas. Como construir uma vida tão completa que atrai pelo que é.' },
          ].map((c) => (
            <div key={c.n} className="cc reveal">
              <div className="cn">{c.n}</div>
              <span className="cicon">{c.i}</span>
              <div className="ct">{c.t}</div>
              <p className="cd">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

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

      <section id="depos" className="sec">
        <div className="dhead reveal">
          <div className="slbl">Histórias reais</div>
          <h2>Elas já <em>mudaram</em><br />o jogo delas</h2>
        </div>
        <div className="dgrid">
          {[
            { a: 'Camila R.', l: 'São Paulo · 29 anos', q: 'Depois de meses rodando em círculos, o Mistika me fez enxergar meu padrão. Hoje me relaciono de um lugar de poder e não de necessidade.', i: '👩' },
            { a: 'Fernanda M.', l: 'Rio de Janeiro · 33 anos', q: 'O conceito de energia mudou tudo pra mim. Parei de tentar ser o que eles querem e comecei a ser quem sou. O resultado foi imediato.', i: '👩‍🦱' },
            { a: 'Júlia S.', l: 'Belo Horizonte · 26 anos', q: 'O App de Escrita Terapêutica foi o bônus que mais me transformou. Processei coisas que carregava há anos. Vale muito mais que o investimento.', i: '👩‍🦰' },
          ].map((d, i) => (
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
              <button onClick={() => handleCheckout()} className="btncta">✦ Começar Agora</button>
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

      <section id="faq" className="sec">
        <div className="faqwrap">
          <div className="faqhead reveal">
            <div className="slbl">Dúvidas frequentes</div>
            <h2>Tudo que você<br />precisa <em>saber</em></h2>
          </div>
          {[
            { q: 'Como funciona o acesso?', a: 'Após o pagamento confirmado, você recebe acesso imediato por e-mail. O conteúdo fica disponível 24/7 no app para iOS e Android, além da versão web.' },
            { q: 'O parcelamento tem juros?', a: 'Não. Você parcela em até 10x de R$ 2,99 sem nenhum acréscimo. O valor total permanece R$ 29,90.' },
            { q: 'É só para mulheres solteiras?', a: 'Não. O Mistika é para qualquer mulher que quer se conhecer melhor e se relacionar com mais poder — solteira, namorando ou em qualquer fase da vida.' },
            { q: 'Os bônus estão inclusos no R$ 29,90?', a: 'Sim! Todos os bônus estão inclusos no acesso principal. Tudo por R$ 29,90 à vista ou 10x de R$ 2,99.' },
            { q: 'E se eu não gostar?', a: 'Você tem 30 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeita, basta pedir o reembolso e devolvemos 100% do valor pago.' },
          ].map((item, i) => (
            <div key={i} className="fi">
              <button className="fq" onClick={() => toggleFaq(i)}>
                {item.q} <div className="fplus">{openFaqIndices.includes(i) ? '-' : '+'}</div>
              </button>
              {openFaqIndices.includes(i) && <div className="fb" style={{ display: 'block' }}>{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      <section id="final">
        <div className="fininner reveal">
          <div className="slbl">Última chamada</div>
          <h2>Você não precisa<br />de sorte.<br /><em>Precisa de estratégia.</em></h2>
          <p>Mais de 847 mil mulheres já iniciaram a jornada. A versão de você que atrai o que merece começa com uma decisão de R$ 2,99.</p>
          <div className="finbtns">
            <button onClick={() => handleCheckout()} className="btnfin">✦ Começar Agora</button>
            <a href="#conceito" className="btnghost">Ver o que está incluso</a>
          </div>
        </div>
      </section>

      <div className={`mp-overlay ${checkoutLoading ? 'active' : ''}`} id="mp-overlay">
        <div className="mp-spinner" />
        <div className="mp-msg">Preparando seu checkout seguro…</div>
      </div>
      <div className="mp-error" id="mp-error" />

      {showCookieBanner && (
        <div className="cookie-banner" id="cookieBanner">
          <p className="cb-text"><strong>Privacidade e Cookies:</strong> Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa <a href="privacidade.html">Política de Privacidade</a>.</p>
          <div className="cb-btns">
            <button className="btn-cookie btn-cookie-alt" onClick={handleRejectCookies}>Recusar</button>
            <button className="btn-cookie" onClick={handleAcceptCookies}>Aceitar Tudo</button>
          </div>
        </div>
      )}

      {toast.show && toast.person && (
        <div className="sales-toast active" id="salesToast">
          <img src={toast.person.img} alt={toast.person.name} className="st-img" />
          <div>
            <div className="st-title">{toast.person.name} de {toast.person.loc}</div>
            <div className="st-desc">Acabou de adquirir o acesso vitalício</div>
            <div className="st-time">{toast.time}</div>
          </div>
        </div>
      )}

      <footer>
        <img src="https://curtai.online/logosf.png" alt="Mistika" style={{ height: '28px', width: 'auto' }} loading="lazy" />
        <div className="flinks">
          <a href="privacidade.html">Privacidade</a>
          <a href="termos.html">Termos de Uso</a>
        </div>
        <div className="fcopy">© 2025 Mistika App · Todos os direitos reservados</div>
      </footer>
    </>
  );
}
