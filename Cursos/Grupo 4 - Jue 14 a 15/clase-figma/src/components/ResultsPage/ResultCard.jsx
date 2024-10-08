/**
 * This code was generated by Builder.io.
 */
import React from "react";
import styles from "./ResultCard.module.css";

const ResultCard = ({ name, address, price }) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer} />
      <div className={styles.infoSection}>
        <h2 className={styles.label}>Nombre</h2>
        <p className={styles.value}>{name}</p>
      </div>
      <div className={styles.infoSection}>
        <h3 className={styles.label}>Direccion</h3>
        <p className={styles.value}>{address}</p>
      </div>
      <div className={styles.priceSection}>
        <h3 className={styles.label}>Precio</h3>
        <p className={styles.value}>${price}</p>
      </div>
    </article>
  );
};

export default ResultCard;
