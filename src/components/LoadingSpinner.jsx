import styles from './LoadingSpinner.module.css';

/**
 * Centered loading spinner with vintage aesthetic.
 * Renders an overlay filling its nearest positioned ancestor.
 *
 * @param {string} [label] - Accessible label (default: "A carregar…")
 */
export default function LoadingSpinner({ label = 'A carregar conteúdo...' }) {
  return (
    <div className={styles.overlay} aria-label={label} role="status">
      <div className={styles.spinner} aria-hidden="true">
        <span /><span /><span />
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
