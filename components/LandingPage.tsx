'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const AboutSection = dynamic(() => import('./sections/AboutSection'));
const ConceptSection = dynamic(() => import('./sections/ConceptSection'));
const BonusSection = dynamic(() => import('./sections/BonusSection'));
const TestimonialsSection = dynamic(() => import('./sections/TestimonialsSection'));
const FaqSection = dynamic(() => import('./sections/FaqSection'));
const PricingSection = dynamic(() => import('./sections/PricingSection'));
const FinalSection = dynamic(() => import('./sections/FinalSection'));

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
        <Image
          src="https://curtai.online/fundo1.jpg"
          alt=""
          fill
          priority
          style={{ objectFit: 'cover', zIndex: 0 }}
        />
        <div className="hero-layout">
          <div className="hero-inner">
            <div className="hero-logo">
              <Image
                src="https://curtai.online/logosf.png"
                alt="Mistika"
                width={280}
                height={80}
                priority
                style={{ width: '100%', height: 'auto' }}
              />
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

      <AboutSection />

      <ConceptSection />

      <BonusSection />

      <TestimonialsSection />

      <PricingSection handleCheckout={handleCheckout} />

      <FaqSection openFaqIndices={openFaqIndices} toggleFaq={toggleFaq} />

      <FinalSection handleCheckout={handleCheckout} />

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
          <Image
            src={toast.person.img}
            alt={toast.person.name}
            width={44}
            height={44}
            className="st-img"
          />
          <div>
            <div className="st-title">{toast.person.name} de {toast.person.loc}</div>
            <div className="st-desc">Acabou de adquirir o acesso vitalício</div>
            <div className="st-time">{toast.time}</div>
          </div>
        </div>
      )}

      <footer>
        <Image
          src="https://curtai.online/logosf.png"
          alt="Mistika"
          width={150}
          height={28}
          style={{ height: '28px', width: 'auto' }}
        />
        <div className="flinks">
          <a href="privacidade.html">Privacidade</a>
          <a href="termos.html">Termos de Uso</a>
        </div>
        <div className="fcopy">© 2025 Mistika App · Todos os direitos reservados</div>
      </footer>
    </>
  );
}
