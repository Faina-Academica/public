import { useState, useEffect } from 'react';
import ViewHeader from '../components/ViewHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchContactos } from '../services/contactos';
import styles from './Contactos.module.css';

export default function Contactos() {
  const [state, setState] = useState({ data: null, error: null, loading: true });

  useEffect(() => {
    let cancelled = false;
    fetchContactos().then(({ data, error }) => {
      if (!cancelled) setState({ data, error, loading: false });
    });
    return () => { cancelled = true; };
  }, []);

  const { data, error, loading } = state;

  return (
    <main className={styles.page}>
      <ViewHeader title="Contactos" />

      <div className={styles.body}>
        {loading && <LoadingSpinner />}

        {error && (
          <div className={styles.errorState}>
            <p>Não foi possível carregar os contactos.</p>
          </div>
        )}

        {!loading && !error && data && (
          <div className={styles.content}>
            {data.cs && (
              <>
                <div className={styles.csBlock}>
                  <p className={styles.csLabel}>Conselho do Salgado</p>
                  <a href={`mailto:${data.cs}`} className={styles.csEmail}>{data.cs}</a>
                </div>
                <div className={styles.divider} />
              </>
            )}

            <ul className={styles.list}>
              {data.comissoes.map(({ nome, email }) => (
                <li key={nome} className={styles.item}>
                  <span className={styles.itemNome}>{nome}</span>
                  <a href={`mailto:${email}`} className={styles.itemEmail}>{email}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
