import { Link } from 'react-router-dom';
import styles from './ViewHeader.module.css';

/**
 * Shared header for all content views.
 *
 * @param {string} title - The view title
 * @param {string} [backTo="/"] - Custom path for the back button
 * @param {object} [rightAction] - Optional right-side action { label, href?, onClick? }
 *   If href is provided, renders as <a>. If onClick, renders as <button>.
 */
export default function ViewHeader({ title, backTo = "/", rightAction }) {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link to={backTo} className={styles.action}>Voltar</Link>

        <div className={styles.titleBlock}>
          <span className={styles.rule} />
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.rule} />
        </div>

        {rightAction ? (
          rightAction.href ? (
            <a
              href={rightAction.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.action} ${styles.actionRight}`}
            >
              {rightAction.label}
            </a>
          ) : (
            <button
              onClick={rightAction.onClick}
              className={`${styles.action} ${styles.actionRight}`}
            >
              {rightAction.label}
            </button>
          )
        ) : (
          <span className={styles.actionRight} />
        )}
      </div>
    </header>
  );
}
