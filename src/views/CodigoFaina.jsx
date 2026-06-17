import ViewHeader from '../components/ViewHeader';
import styles from './CodigoFaina.module.css';

export default function CodigoFaina() {
  return (
    <div className={styles.page}>
      <ViewHeader title="Código de Faina" />
      <div className={styles.viewer}>
        <iframe
          src={import.meta.env.VITE_CODIGO_FAINA_URL}
          title="Código de Faina"
          className={styles.pdf}
        />
      </div>
    </div>
  );
}
