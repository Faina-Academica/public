import { Link } from 'react-router-dom';

const containerStyle = {
	minHeight: '100vh',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 'var(--space-lg)',
	textAlign: 'center',
};

const titleStyle = {
	fontFamily: 'var(--font-serif)',
	fontSize: 'clamp(2rem, 5vw, 3.5rem)',
	fontWeight: 700,
	marginBottom: 'var(--space-md)',
};

const backStyle = {
	fontFamily: 'var(--font-sans)',
	fontSize: '0.95rem',
	letterSpacing: '0.06em',
	textTransform: 'uppercase',
	color: 'var(--color-text-muted)',
	borderBottom: '1px solid var(--color-border)',
	paddingBottom: '2px',
};

export default function PlaceholderView({ title, wip }) {
	return (
		<main style={containerStyle}>
			<h1 style={titleStyle}>{title}</h1>
			{wip && (
				<p style={{ color: 'var(--color-sepia)', fontStyle: 'italic', marginBottom: 'var(--space-lg)' }}>
					Em construção
				</p>
			)}
			<Link to="/" style={backStyle}>Voltar</Link>
		</main>
	);
}
