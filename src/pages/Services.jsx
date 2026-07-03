import React from 'react'
import styles from './SharedPage.module.css'
import ServiceCard from '../components/ServiceCard'
import steamIroningImg from '../../assets/steam_ironing_hero.png'

export default function Services({ openModal }) {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Our Services</h1>
      <p className={styles.subtitle}>We treat every garment with the exact care it requires. From daily wear to delicate couture, our processes are designed to extend the life of your wardrobe.</p>
      
      <div className={styles.gridOneCol}>
        <ServiceCard 
          title="Premium Steam Ironing"
          text={<>
            <p>Steam ironing is our flagship service. It is not just a chore; it's an art. Our master pressers use state-of-the-art industrial tension equipment and temperature-controlled steam to ensure your shirts, trousers, and delicate linens have razor-sharp creases and are completely wrinkle-free.</p>
            <p style={{ marginTop: '12px' }}>We treat each fabric type—from heavy cottons to delicate silks—with the exact temperature and steam pressure it requires, extending the life of your garments and keeping you looking impeccably sharp.</p>
          </>}
          image={steamIroningImg}
          imagePosition="left"
          buttonText="Book Steam Ironing"
          onButtonClick={() => openModal('booking')}
        />
      </div>
    </div>
  )
}
