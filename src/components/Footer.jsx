import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import styles from './Footer.module.css'

export default function Footer({ openModal }) {
  return (
    <footer className={styles.footer}>
      {/* Top glow */}
      <div className={styles.topGlow} />

      {/* CTA Band */}
      <div className={styles.ctaBand}>
        <div className={styles.ctaContent}>
          <div>
            <p className={styles.ctaEyebrow}>Ready to leap?</p>
            <h2 className={styles.ctaTitle}>
              Worn with life.<br />
              <span className={styles.gold}>Returned with care.</span>
            </h2>
          </div>
          <div className={styles.ctaActions}>
            <a href="https://wa.me/917387517557?text=Hi" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block', textAlign: 'center' }}>
              Book on WhatsApp →
            </a>

          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className={styles.grid}>
        {/* Brand */}
        <div className={styles.brandCol}>
          <Link to="/">
            <img src={logo} alt="Mysa" className={styles.footerLogo} />
          </Link>
          <p className={styles.tagline}>Steam-perfect. Time-perfect.<br />Picked up from your door.</p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2.5 5 4.5 4.5C5.8 4.2 12 4.2 12 4.2s6.2 0 7.5.3c2 .5 2 2.6 2 2.6s.3 2.1.3 4.9-0.3 4.9-0.3 4.9-0.3 2.1-2.3 2.6c-1.3.3-7.5.3-7.5.3s-6.2 0-7.5-.3c-2-.5-2-2.6-2-2.6s-.3-2.1-.3-4.9c0-2.8.3-4.9.3-4.9z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            </a>
          </div>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Services</h4>
          <ul className={styles.colList}>
            {['Premium Steam Ironing', 'Specialist Care'].map(s => (
              <li key={s}><Link to="/services">{s}</Link></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Company</h4>
          <ul className={styles.colList}>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/contact">Careers</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Support</h4>
          <ul className={styles.colList}>
            <li><a href="/MYSA_Refund_Policy.docx" target="_blank" rel="noopener noreferrer">Refund Policy</a></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><a href="mailto:mysadigital.com@gmail.com">mysadigital.com@gmail.com</a></li>
            <li><a href="tel:+917387517557">+91 73875 17557</a></li>
          </ul>
        </div>

        {/* Find Us */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Find Us</h4>
          <a
            href="https://maps.google.com/?q=Galaxy+clinic+Panchshil+nagar+Gittikhadan+katol+Road+Nagpur"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.addressLink}
          >
            <svg className={styles.pinIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Galaxy Clinic, Panchshil Nagar,<br />Gittikhadan Katol Road,<br />Nagpur, Maharashtra</span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Mysa. All rights reserved.</p>
        <div className={styles.bottomLinks}>
          <a href="/MYSA_Refund_Policy.docx" target="_blank" rel="noopener noreferrer">Refund Policy</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
        <div className={styles.bottomRight}>
          <p>Made with care in India 🇮🇳</p>
          <p>
            Developed and Managed by{' '}
            <a href="https://bizleap.in/" target="_blank" rel="noopener noreferrer" className={styles.bizleapLink}>
              BIZLEAP
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
