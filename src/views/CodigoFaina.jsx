import { useState, useEffect } from 'react';
import ViewHeader from '../components/ViewHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchCodigoFileId } from '../services/codigo';
import styles from './CodigoFaina.module.css';

export default function CodigoFaina() {
	const [fileId, setFileId] = useState(null);
	const [fetchError, setFetchError] = useState(null);

	useEffect(() => {
		let cancelled = false;
		fetchCodigoFileId().then(({ data, error }) => {
			if (cancelled) return;
			if (error) return setFetchError(error);
			setFileId(data);
		});
		return () => { cancelled = true; };
	}, []);

	const viewerUrl = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
	const downloadUrl = fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : null;

	return (
		<main className={styles.page}>
			<ViewHeader
				title="Código de Faina"
				rightAction={downloadUrl ? { label: 'Descarregar', href: downloadUrl } : undefined}
			/>
			<div className={styles.viewer}>
				{!fileId && !fetchError && <LoadingSpinner />}

				{fetchError && (
					<div className={styles.errorState}>
						<p>Não foi possível carregar o documento.</p>
					</div>
				)}

				{fileId && (
					<iframe
						src={viewerUrl}
						title="Código de Faina"
						className={styles.pdf}
					/>
				)}
			</div>
		</main>
	);
}
