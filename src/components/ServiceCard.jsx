import React from 'react';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ title, text, image, imagePosition = 'left', buttonText, onButtonClick }) {
  return (
    <div className={`${styles.card} ${imagePosition === 'right' ? styles.imageRight : styles.imageLeft}`}>
      <div className={styles.imageContainer}>
        <img 
          src={image} 
          alt={`Master presser steam ironing a crisp white cotton shirt at Mysa.`} 
          loading="lazy" 
          className={styles.image} 
        />
      </div>
      <div className={styles.contentContainer}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.text}>{text}</div>
        {buttonText && (
          <button className="btn-ghost" onClick={onButtonClick} style={{ marginTop: '32px', alignSelf: 'flex-start' }}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
