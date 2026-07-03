import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../../assets/hero_ironing.png'
import premiumIroningImg from '../../assets/premium_steam_ironing.png'

import styles from './Home.module.css'

const PHRASES = [
  'Picked up from your door.',
  'Expertly steam ironed.',
  'Handled with care.',
  'Returned perfectly crisp.',
]

const SERVICES = [
  {
    icon: '✨',
    title: 'Premium Steam Ironing',
    desc: 'Crisp lines, zero effort. Our flagship service.',
    detailTitle: 'Premium Steam Ironing',
    detailDesc: 'Steam ironing is not just a chore; it\'s an art. Our master pressers use state-of-the-art industrial tension equipment and temperature-controlled steam to ensure your shirts, trousers, and delicate linens have razor-sharp creases and are completely wrinkle-free. We treat each fabric type—from heavy cottons to delicate silks—with the exact temperature and steam pressure it requires, extending the life of your garments and keeping you looking impeccably sharp.',
  }
]

const TESTIMONIALS = [
  { name: 'Priya S.', city: 'Delhi', service: 'Specialist Care', quote: 'Mysa turned a chaotic laundry pile into a non-problem. The valet shows up exactly when promised. Incredible.' },
  { name: 'Ananya K.', city: 'Bangalore', service: 'Wedding & Couture', quote: 'My wedding lehenga was returned in perfect condition. I was honestly nervous, but Mysa handled it flawlessly.' },
  { name: 'Arjun M.', city: 'Mumbai', service: 'Dry Cleaning', quote: 'The dry cleaning is better than anything I found locally. Worth every rupee.' },
  { name: 'Deepak R.', city: 'Pune', service: 'Bulk Linen', quote: 'As a hotel owner, Mysa\'s bulk linen service has cut our turnaround time in half.' },
  { name: 'Meera T.', city: 'Chennai', service: 'Steam & Press', quote: 'Shirts come back perfectly pressed every time. I won\'t use anyone else.' },
  { name: 'Rahul V.', city: 'Hyderabad', service: 'Dry Cleaning', quote: 'Exceptional service. My suits look brand new after every clean.' },
]

const STEPS = [
  {
    title: 'Book on WhatsApp',
    eyebrow: 'Step 1',
    desc: 'Customer messages Mysa on WhatsApp or taps "Schedule Pickup"; bot confirms slot instantly.',
    orderStatus: 'Placed',
    orderStatusColor: '#F5B83B',
  },
  {
    title: 'Doorstep Pickup',
    eyebrow: 'Step 2',
    desc: 'Rider collects garments at the chosen time; customer gets a WhatsApp pickup confirmation with item count.',
    orderStatus: 'Picked Up',
    orderStatusColor: '#107575',
  },
  {
    title: 'Steam Ironing',
    eyebrow: 'Step 3',
    desc: 'Garments are steam-ironed and quality-checked; customer receives a "your clothes are ready" status update.',
    orderStatus: 'In Progress',
    orderStatusColor: '#F5B83B',
  },
  {
    title: 'Delivered to Your Door',
    eyebrow: 'Step 4',
    desc: 'Rider delivers on time; customer gets a delivery confirmation and can rate the service — all inside WhatsApp.',
    orderStatus: 'Delivered',
    orderStatusColor: '#27AE60',
  }
];

const CHAT_MESSAGES = [
  { step: 0, sender: 'user', text: 'Hi Mysa, I need a steam iron pickup.', time: '12:30 PM' },
  { step: 0, sender: 'bot', text: 'Hi Arjun! Let\'s schedule it. Today 4 PM or tomorrow 9 AM?', time: '12:30 PM' },
  { step: 1, sender: 'user', text: 'Today 4 PM.', time: '12:31 PM' },
  { step: 1, sender: 'bot', text: 'Confirmed! Rider Rahul will arrive at 4 PM.', time: '12:31 PM' },
  { step: 1, sender: 'bot', text: '📦 Order #MY-9042: 10 garments collected.', time: '4:05 PM' },
  { step: 2, sender: 'bot', text: '✨ Care Update: Your 10 garments have been steam-ironed and packed.', time: '5:30 PM' },
  { step: 3, sender: 'bot', text: '🚚 Out for delivery! Rahul is on his way.', time: '6:00 PM' },
  { step: 3, sender: 'bot', text: '🎉 Delivered! Enjoy your fresh clothes.', time: '6:15 PM' },
  { step: 3, sender: 'user', text: 'Excellent service! Everything is perfectly crisp. ⭐⭐⭐⭐⭐', time: '6:18 PM' },
];

function useTypingEffect() {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = PHRASES[phraseIdx]
    let timeout

    if (!deleting && charIdx === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setPhraseIdx(i => (i + 1) % PHRASES.length)
    } else {
      const speed = deleting ? 40 : 90
      timeout = setTimeout(() => {
        setCharIdx(i => deleting ? i - 1 : i + 1)
        setText(phrase.substring(0, deleting ? charIdx - 1 : charIdx + 1))
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx])

  return text
}

function RevealSection({ children, className = '', delay = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>
}

export default function Home({ openModal }) {
  const typedText = useTypingEffect()
  const heroRef = useRef(null)
  const heroImgRef = useRef(null)
  const appMockupRef = useRef(null)
  const [postcode, setPostcode] = useState('')
  const [serviceStatus, setServiceStatus] = useState(null) // null | 'serviceable' | 'not-serviceable'
  const [isScrollingPaused, setIsScrollingPaused] = useState(false)

  const [activeStep, setActiveStep] = useState(0)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const intervalRef = useRef(null)

  // Auto cycle steps every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleStepClick = (index) => {
    setActiveStep(index)
    // Reset interval when user clicks manually to give them time to read
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 5000)
  }

  // Lazy load video
  useEffect(() => {
    const currentVideo = videoRef.current
    const currentSection = sectionRef.current
    if (!currentVideo || !currentSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!currentVideo.src) {
            currentVideo.src = '/videos/how-mysa-works.mp4'
          }
          currentVideo.play().catch((err) => {
            console.log('Video autoplay blocked or interrupted:', err)
          })
        } else {
          currentVideo.pause()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(currentSection)
    return () => {
      if (currentSection) observer.unobserve(currentSection)
    }
  }, [])

  // Auto scroll chat body
  useEffect(() => {
    const chatBody = document.getElementById('whatsapp-message-body')
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight
    }
  }, [activeStep])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsVideoMuted(videoRef.current.muted)
    }
  }

  const handleWatchDemo = () => {
    const mockup = document.getElementById('phone-mockup-container')
    if (mockup) {
      mockup.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    if (videoRef.current) {
      videoRef.current.muted = false
      setIsVideoMuted(false)
      videoRef.current.play().catch((err) => console.log(err))
    }
  }

  const NAGPUR_PINCODES_MIN = 440001
  const NAGPUR_PINCODES_MAX = 440037

  const checkServiceability = (code) => {
    setPostcode(code)
    if (code.length === 6 && /^\d{6}$/.test(code)) {
      const pin = parseInt(code, 10)
      if (pin >= NAGPUR_PINCODES_MIN && pin <= NAGPUR_PINCODES_MAX) {
        setServiceStatus('serviceable')
      } else {
        setServiceStatus('not-serviceable')
      }
    } else {
      setServiceStatus(null)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (heroImgRef.current && scrollY < window.innerHeight) {
        const isTouch = window.matchMedia('(pointer: coarse)').matches
        if (!isTouch) heroImgRef.current.style.transform = `translateY(${scrollY * 0.12}px)`
      }
      if (appMockupRef.current) {
        const rect = appMockupRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const progress = 1 - rect.top / window.innerHeight
          appMockupRef.current.style.transform = `rotateY(${-15 + progress * 10}deg) rotateX(${5 - progress * 5}deg)`
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroContent}>
          <RevealSection className={styles.eyebrowWrap}>
            <div className="eyebrow">Steam-perfect. Time-perfect.</div>
          </RevealSection>
          <RevealSection delay="delay-1">
            <h1 className={styles.heroTitle}>Premium<br /><em>Steam Ironing Service.</em></h1>
          </RevealSection>
          <RevealSection delay="delay-2">
            <p className={styles.heroSub}>
              <span>{typedText}</span>
              <span className="type-cursor" />
            </p>
          </RevealSection>
          <RevealSection delay="delay-3" className={styles.heroCta}>
            <a href="https://wa.me/917387517557?text=Hi" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              Book on WhatsApp
            </a>
            <a href="#how" className={styles.linkArrow}>
              See how it works <span>→</span>
            </a>
          </RevealSection>
          <RevealSection delay="delay-4" className={styles.socialProof}>
            <div>
              <div className="stars">★★★★★</div>
              <div className={styles.spText}>4.9 from 12,000+ reviews</div>
            </div>
            <div className={styles.divider} />
            <div className={styles.avatars}>
              {['#C8C0B4', '#E8E4DC', '#7A9E87'].map((c, i) => (
                <div key={i} className={styles.avatar} style={{ background: c }} />
              ))}
            </div>
            <div className={styles.spText}>50k+ happy customers</div>
          </RevealSection>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroGlow} />
          <img src={heroImg} alt="Crisp white shirts on wooden hangers" ref={heroImgRef} className={styles.heroImg} />
          <div className={styles.floatingCard}>
            <span className="pulse-dot" />
            <div>
              <strong>Order #MY-4821</strong><br />
              <span style={{ fontSize: 11, opacity: 0.6 }}>Out for Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className={styles.trustBar}>
        <div className={styles.marquee}>
          {Array(2).fill(['Free Pickup & Delivery', 'Same-Day Service Available', 'Eco-Certified Cleaning', '50,000+ Orders Delivered', 'Specialist Garment Care', 'No Subscription Required', '4.9★ Customer Rating', '100% Satisfaction Guarantee']).flat().map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              {item} <span className={styles.diamond}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className={`section-padding ${styles.servicesSection}`} id="services">
        <div className={styles.servicesContainer}>
          <div className={styles.servicesLeft}>
            <RevealSection className={styles.sectionHeader}>
              <div className="eyebrow">What We Care For</div>
              <h2>Every garment. Every fabric. Every time.</h2>
            </RevealSection>
            <RevealSection delay="delay-1" className={styles.servicesGrid}>
              {SERVICES.map((svc) => (
                <div key={svc.title} className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>{svc.icon}</div>
                  <h3>{svc.title}</h3>
                  <p>{svc.desc}</p>
                  <div className={styles.cardBottom}>
                    <button
                      className={styles.cardLink}
                      onClick={() => openModal('learn', { title: svc.detailTitle, desc: svc.detailDesc })}
                    >
                      Learn more →
                    </button>
                  </div>
                </div>
              ))}
            </RevealSection>
          </div>
          <div className={styles.servicesRight}>
            <RevealSection delay="delay-2" className={styles.visualWrapper}>
              <div className={`${styles.sparkle} ${styles.sparkle1}`}></div>
              <div className={`${styles.sparkle} ${styles.sparkle2}`}></div>
              <div className={`${styles.sparkle} ${styles.sparkle3}`}></div>
              <div className={styles.ironContainer}>
                <img src={premiumIroningImg} alt="Premium Steam Ironing" className={styles.premiumImg} style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (NEW PREMIUM SECTION) */}
      <section className={`section-padding ${styles.premiumHowSection}`} id="how-interactive" ref={sectionRef}>
        <div className={styles.premiumHowContainer}>
          
          <div className={styles.premiumHowHeader}>
            <RevealSection className={styles.premiumHowEyebrowWrap}>
              <div className="eyebrow">How It Works</div>
            </RevealSection>
            <RevealSection delay="delay-1">
              <h2 className={styles.premiumHowTitle}>
                From WhatsApp message to<br /><em>wrinkle-free clothes — in 4 steps.</em>
              </h2>
            </RevealSection>
            <RevealSection delay="delay-2">
              <p className={styles.premiumHowSubheadline}>
                Steam-perfect. Time-perfect. Picked up from your door.
              </p>
            </RevealSection>
            
            <RevealSection delay="delay-3" className={styles.premiumHowHeaderCtas}>
              <button onClick={handleWatchDemo} className="btn-ghost">
                Watch How It Works
              </button>
              <button onClick={() => openModal('booking')} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Schedule Pickup <span>→</span>
              </button>
            </RevealSection>
          </div>

          <div className={styles.premiumHowVisualContainer}>
            
            {/* Left Floating Card - Order Card */}
            <div className={`${styles.floatingCardLeft} ${styles.orderCard}`}>
              <div className={styles.cardHeader}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <span>Order #MY-9042</span>
              </div>
              <div className={styles.cardRow}>
                <strong>Customer:</strong>
                <span>Arjun Mehta</span>
              </div>
              <div className={styles.cardRow}>
                <strong>Garments:</strong>
                <span>10 Items (Hanger Pack)</span>
              </div>
              <div className={styles.cardRow}>
                <strong>Total Amount:</strong>
                <span>₹450</span>
              </div>
              <div className={styles.cardStatusContainer}>
                <span className={styles.statusLabel}>Status:</span>
                <span 
                  className={styles.statusPill} 
                  style={{ 
                    backgroundColor: `${STEPS[activeStep].orderStatusColor}15`, 
                    color: STEPS[activeStep].orderStatusColor,
                    borderColor: `${STEPS[activeStep].orderStatusColor}30` 
                  }}
                >
                  <span className={styles.statusDot} style={{ backgroundColor: STEPS[activeStep].orderStatusColor }} />
                  {STEPS[activeStep].orderStatus}
                </span>
              </div>
            </div>

            {/* Center Phone Mockup Wrapper */}
            <div className={styles.mockupWrapper} id="phone-mockup-container">
              {/* Hand Silhouette Graphic */}
              <div className={styles.handContainer}>
                <svg className={styles.handSvg} viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M350 480 C320 400, 290 350, 240 330 C200 310, 160 330, 140 360 C120 390, 100 440, 100 480" stroke="rgba(16, 117, 117, 0.15)" strokeWidth="12" fill="none" strokeLinecap="round" />
                  <path d="M220 330 C200 320, 180 320, 160 330 C140 340, 130 350, 120 370" stroke="rgba(16, 117, 117, 0.2)" strokeWidth="8" strokeLinecap="round" />
                </svg>
              </div>

              {/* Fingertips wrapping around left bezel */}
              <div className={styles.fingertips}>
                <div className={`${styles.finger} ${styles.finger1}`} />
                <div className={`${styles.finger} ${styles.finger2}`} />
                <div className={`${styles.finger} ${styles.finger3}`} />
                <div className={`${styles.finger} ${styles.finger4}`} />
              </div>

              {/* Actual Phone Frame */}
              <div className={styles.phoneFrame}>
                <div className={styles.phoneNotch} />
                <div className={styles.phoneScreen}>
                  
                  {/* Video Background Layer */}
                  <div className={styles.screenVideoWrapper}>
                    <video
                      ref={videoRef}
                      loop
                      muted
                      playsInline
                      poster="/assets/hero_ironing.jpg"
                      className={styles.screenVideo}
                      aria-label="Mysa service delivery demonstration video"
                    />
                    <div className={styles.videoOverlayGradient} />
                  </div>

                  {/* WhatsApp UI Layer */}
                  <div className={styles.whatsappUi}>
                    {/* Header */}
                    <div className={styles.waHeader}>
                      <div className={styles.waHeaderLeft}>
                        <span className={styles.waBackBtn}>←</span>
                        <div className={styles.waAvatar}>M</div>
                        <div className={styles.waUserInfo}>
                          <span className={styles.waName}>Mysa Care</span>
                          <span className={styles.waStatus}>
                            <span className={styles.waStatusDot} />
                            online
                          </span>
                        </div>
                      </div>
                      <div className={styles.waHeaderIcons}>
                        <span className={styles.waIcon}>📞</span>
                        <span className={styles.waIcon}>⋮</span>
                      </div>
                    </div>

                    {/* Messages Body */}
                    <div className={styles.waBody} id="whatsapp-message-body">
                      {CHAT_MESSAGES.filter(m => m.step <= activeStep).map((msg, i) => (
                        <div key={i} className={`${styles.waMessage} ${msg.sender === 'user' ? styles.waUser : styles.waBot}`}>
                          <div className={styles.waMessageBubble}>
                            {msg.text.split('\n').map((line, idx) => <div key={idx}>{line}</div>)}
                            <span className={styles.waMessageTime}>{msg.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Unmute / Mute Button Overlay */}
                  <button 
                    onClick={toggleMute} 
                    className={styles.muteButton} 
                    aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                  >
                    {isVideoMuted ? '🔇' : '🔊'}
                  </button>

                </div>
              </div>
            </div>

            {/* Right Floating Card - Stats Card */}
            <div className={`${styles.floatingCardRight} ${styles.statsCard}`}>
              <div className={styles.statsHeader}>
                <strong>Service Quality</strong>
              </div>
              <div className={styles.donutWrapper}>
                <svg className={styles.donutChart} viewBox="0 0 36 36">
                  <path
                    className={styles.donutBg}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={styles.donutVal}
                    strokeDasharray="99.4, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className={styles.donutText}>
                  <strong>99.4%</strong>
                </div>
              </div>
              <div className={styles.statsLabelContainer}>
                <span className={styles.statsTitle}>On-Time Delivery</span>
                <span className={styles.statsSub}>12,450+ garments ironed</span>
              </div>
            </div>

          </div>

          {/* Step description panels (cycling or clickable tabs) */}
          <div className={styles.stepsTabsContainer}>
            {STEPS.map((step, idx) => (
              <div 
                key={idx} 
                onClick={() => handleStepClick(idx)}
                className={`${styles.stepTab} ${activeStep === idx ? styles.activeTab : ''}`}
              >
                <div className={styles.tabHeader}>
                  <span className={styles.tabNumber}>{step.eyebrow}</span>
                  <h3 className={styles.tabTitle}>{step.title}</h3>
                </div>
                <p className={styles.tabDesc}>{step.desc}</p>
                <div className={styles.progressBarWrapper}>
                  <div 
                    className={styles.progressBar} 
                    style={{ 
                      width: activeStep === idx ? '100%' : activeStep > idx ? '100%' : '0%',
                      transition: activeStep === idx ? 'width 5s linear' : 'width 0.3s ease'
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* RESTORED THE MYSA PROCESS */}
      <section className={`section-padding ${styles.howSection}`} id="how">
        <RevealSection className={styles.sectionHeader}>
          <div className="eyebrow" style={{ color: 'var(--brand-sage)' }}>The Mysa Process</div>
          <h2 style={{ color: '#fff', fontStyle: 'italic', fontWeight: 400, fontSize: 52 }}>Effortless from door to door.</h2>
        </RevealSection>
        <RevealSection delay="delay-1" className={styles.timeline}>
          {[
            { step: 'A', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>, title: 'Schedule', desc: 'Pick your time slot through the Mysa app or website. Available 7 days a week.' },
            { step: 'B', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>, title: 'We Collect', desc: 'Your dedicated Mysa Valet arrives on time. No waiting. Leave your bag at the door.' },
            { step: 'C', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"></path></svg>, title: 'Expert Care', desc: 'Each item is inspected and pressed by specialists using specialized steam processes.' },
            { step: 'D', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>, title: 'Delivered Fresh', desc: 'Returned to your door on wooden hangers, in protective garment bags.' },
          ].map((s) => (
            <div key={s.step} className={styles.step}>
              <div className={styles.stepIcon}>{s.icon}</div>
              <span className={styles.stepLabel}>Step {s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </RevealSection>
        <RevealSection delay="delay-3" className={styles.testimonialFloat}>
          <div className="stars">★★★★★</div>
          <p style={{ fontStyle: 'italic', fontSize: 13, marginTop: 8 }}>
            "Honestly the best service I've ever used. My suits come back looking brand new."<br /><br />
            — Rohan M., Mumbai
          </p>
        </RevealSection>
      </section>

      {/* BOOKING WIDGET */}
      <section className={styles.bookingWidget}>
        <RevealSection>
          <h2>Ready in 60 seconds.</h2>
          <p>Enter your postcode and book your first pickup free.</p>
          <div className={styles.bookingForm}>
            <input
              type="text"
              placeholder="Enter your postcode..."
              value={postcode}
              onChange={e => checkServiceability(e.target.value.slice(0, 6))}
              maxLength={6}
            />
            {!serviceStatus && (
              <button disabled style={{ opacity: 0.5, cursor: 'default' }}>Check Availability</button>
            )}
            {serviceStatus === 'serviceable' && (
              <a href="https://wa.me/917387517557?text=Hi" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', background: 'var(--brand-sage)', color: 'white', padding: '12px 24px', borderRadius: 'var(--radius-pill)', fontWeight: 500, fontSize: '15px' }}>Book on WhatsApp →</a>
            )}
            {serviceStatus === 'not-serviceable' && (
              <button disabled style={{ background: '#ccc', cursor: 'default', color: '#666' }}>Not Available</button>
            )}
          </div>
          {serviceStatus && (
            <div className={styles.serviceStatusMsg} style={{ color: serviceStatus === 'serviceable' ? '#4ADE80' : '#F87171' }}>
              {serviceStatus === 'serviceable' ? (
                <><span style={{ fontSize: 18 }}>✓</span> Great news! We service your area in Nagpur.</>
              ) : (
                <><span style={{ fontSize: 18 }}>✗</span> Sorry, we don't service this area yet. We're expanding soon!</>
              )}
            </div>
          )}
        </RevealSection>
      </section>

      {/* OUR SERVICES */}
      <section className={styles.ourServicesSection}>
        <RevealSection className={styles.ourServicesHeader}>
          <div className="eyebrow" style={{ color: 'var(--brand-sage)' }}>OUR SERVICES</div>
          <h2 style={{ color: 'var(--text-ink)', fontStyle: 'italic', fontWeight: 400, fontSize: 48 }}>Experience the difference.</h2>
        </RevealSection>
        <RevealSection delay="delay-1" className={styles.ourServicesGrid}>
          <div 
            className={`${styles.servicesTrack} ${isScrollingPaused ? styles.paused : ''}`}
            onClick={() => setIsScrollingPaused(!isScrollingPaused)}
          >
            {(() => {
              const list = [
                { 
                  title: 'Steam Ironing', 
                  desc: 'Crisp, wrinkle-free finish using industrial-grade steam irons.', 
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"></path></svg> 
                },
                { 
                  title: 'Doorstep Pickup', 
                  desc: 'Convenient collection from your home at your chosen time.', 
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg> 
                },
                { 
                  title: 'Premium Packing', 
                  desc: 'Garments returned on wooden hangers in protective covers.', 
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-3a2 2 0 0 1-2-2V2"></path><path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"></path><path d="M3 15h6"></path><path d="M3 18h6"></path></svg> 
                },
                { 
                  title: 'Fabric Care', 
                  desc: 'Specialized treatment for delicate and premium fabrics.', 
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg> 
                },
                { 
                  title: 'Fast Delivery', 
                  desc: 'Quick turnaround times to match your busy schedule.', 
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> 
                }
              ];
              return [...list, ...list].map((service, idx) => (
                <div key={idx} className={styles.ourServiceCard}>
                  <div className={styles.ourServiceIcon}>{service.icon}</div>
                  <h3 className={styles.ourServiceTitle}>{service.title}</h3>
                  <p className={styles.ourServiceDesc}>{service.desc}</p>
                </div>
              ));
            })()}
          </div>
        </RevealSection>
      </section>

      {/* BEFORE / AFTER SECTION */}
      <section className={styles.beforeAfterSection}>
        <div className={styles.baContainer}>
          {/* Before Card */}
          <RevealSection className={`${styles.baCard} ${styles.before}`}>
            <h2 className={styles.baTitle}>Before MYSA</h2>
            <div className={styles.baImageWrapper}>
              <img src="/mysa.png" alt="Before MYSA" className={styles.baImage} />
            </div>
            <ul className={styles.baList}>
              <li className={styles.baListItem}>
                <div className={`${styles.baIcon} ${styles.red}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
                </div>
                <span>Clothes lose their crispness and shine over time</span>
              </li>
              <li className={styles.baListItem}>
                <div className={`${styles.baIcon} ${styles.red}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
                </div>
                <span>Inconsistent ironing quality from local dhobis</span>
              </li>
              <li className={styles.baListItem}>
                <div className={`${styles.baIcon} ${styles.red}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
                </div>
                <span>Burn marks or shiny patches on delicate fabrics</span>
              </li>
              <li className={styles.baListItem}>
                <div className={`${styles.baIcon} ${styles.red}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
                </div>
                <span>Unreliable pickup and delivery schedules</span>
              </li>
              <li className={styles.baListItem}>
                <div className={`${styles.baIcon} ${styles.red}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
                </div>
                <span>No proper packing, clothes get wrinkled in transit</span>
              </li>
            </ul>
          </RevealSection>

          {/* After Card */}
          <RevealSection delay="delay-1" className={`${styles.baCard} ${styles.after}`}>
            <h2 className={styles.baTitle}>After MYSA</h2>
            <div className={styles.baImageWrapper}>
              <img src="/mysa2.png" alt="After MYSA" className={styles.baImage} />
            </div>
            <ul className={styles.baList}>
              <li className={styles.baListItem}>
                <div className={`${styles.baIcon} ${styles.green}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <span>Garments look brand new with industrial steam pressing</span>
              </li>
              <li className={styles.baListItem}>
                <div className={`${styles.baIcon} ${styles.green}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <span>Consistent, perfectly crisp finishes every single time</span>
              </li>
              <li className={styles.baListItem}>
                <div className={`${styles.baIcon} ${styles.green}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <span>100% safe for all fabrics with temperature-controlled steam</span>
              </li>
              <li className={styles.baListItem}>
                <div className={`${styles.baIcon} ${styles.green}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <span>On-time doorstep pickup and fast delivery</span>
              </li>
              <li className={styles.baListItem}>
                <div className={`${styles.baIcon} ${styles.green}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <span>Premium packaging on hangers so clothes stay wrinkle-free</span>
              </li>
            </ul>
          </RevealSection>
        </div>
      </section>

      {/* TESTIMONIAL VIDEO */}
      <section className={styles.testimonialVideoSection}>
        <div className={styles.testVideoContent}>
          <RevealSection>
            <div className="eyebrow" style={{ color: 'var(--brand-gold)' }}>CUSTOMER STORIES</div>
          </RevealSection>
          <RevealSection delay="delay-1">
            <h2 className={styles.testVideoTitle}>"Mysa completely changed how I manage my wardrobe."</h2>
          </RevealSection>
          <RevealSection delay="delay-2">
            <p className={styles.testVideoDesc}>
              "The premium steam ironing is absolutely flawless. My clothes have never looked this crisp, and the door-to-door service saves me so much time every week. I highly recommend it!"
            </p>
          </RevealSection>
          <RevealSection delay="delay-3" className={styles.testAuthor}>
            <div className={styles.testAuthorAvatar}>R</div>
            <div>
              <div className={styles.testAuthorName}>Rahul Desai</div>
              <div className={styles.testAuthorRole}>Regular Customer</div>
            </div>
          </RevealSection>
        </div>
        <RevealSection delay="delay-2" className={styles.testVideoWrapper}>
          <video 
            src="/mysa-testimonial.mp4" 
            className={styles.testVideo} 
            autoPlay 
            muted 
            loop 
            controls
            playsInline 
          />
        </RevealSection>
      </section>

      {/* FINAL CTA */}
      <section className={styles.finalCta}>
        <RevealSection>
          <h2>Your first pickup is on us.</h2>
          <p>No commitment. No signup fee. Just clean clothes.</p>
          <a href="https://wa.me/917387517557?text=Hi" target="_blank" rel="noopener noreferrer" className="btn-white" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Book on WhatsApp</a>
        </RevealSection>
      </section>

    </div>
  )
}
