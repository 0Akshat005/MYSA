import React from 'react'
import styles from './SharedPage.module.css'
import heroImg from '../../assets/how_it_works_hero.png'

export default function HowItWorks() {
  return (
    <div className={`${styles.page} ${styles.pageWide}`}>
      <h1 className={styles.title}>How It Works</h1>
      <p className={styles.subtitle}>We've designed our process to be as frictionless as possible. Reclaim your time while we take care of your wardrobe.</p>
      
      <div className={styles.stickyLayout}>
        <div className={styles.stickyColumn}>
          <div className={styles.stickyImageContainer}>
            <img 
              src={heroImg} 
              alt="Mysa premium steam ironing service process" 
              className={styles.stickyImage} 
              loading="lazy" 
            />
          </div>
        </div>

        <div className={styles.scrollColumn}>
          <div className={styles.stepRow}>
            <div className={styles.stepNumber}>01</div>
            <div>
              <h3 className={styles.cardTitle}>Schedule Your Pickup</h3>
              <p className={styles.cardText}>Choose a convenient 1-hour time slot through our website or app. We operate 7 days a week, from 7 AM to 10 PM. You can leave your items at the door or hand them directly to our valet.</p>
            </div>
          </div>

          <div className={styles.stepRow}>
            <div className={styles.stepNumber}>02</div>
            <div>
              <h3 className={styles.cardTitle}>We Collect & Inspect</h3>
              <p className={styles.cardText}>Your dedicated Mysa Valet arrives exactly on time. Once at our state-of-the-art facility, every garment is photographed, tagged, and inspected by our specialists for stains, loose buttons, or special care requirements.</p>
            </div>
          </div>

          <div className={styles.stepRow}>
            <div className={styles.stepNumber}>03</div>
            <div>
              <h3 className={styles.cardTitle}>Expert Care</h3>
              <p className={styles.cardText}>Whether it's our flagship Steam Ironing process or specialist care, your clothes are processed according to their specific fabric needs. We use eco-friendly solvents and high-grade steam presses.</p>
            </div>
          </div>

          <div className={styles.stepRow}>
            <div className={styles.stepNumber}>04</div>
            <div>
              <h3 className={styles.cardTitle}>Delivered Fresh</h3>
              <p className={styles.cardText}>Your clothes are returned to you looking brand new. Depending on the service, they will arrive neatly folded or hung on premium wooden hangers inside protective, breathable garment bags.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
