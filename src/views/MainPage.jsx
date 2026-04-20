import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';

const NAV_ITEMS = [
	{ to: '/codigo', label: 'Código de Faina' },
	{ to: '/cronicas', label: 'Crónicas', wip: true },
	{ to: '/contactos', label: 'Contactos' },
];

export default function MainPage() {
	return (
		<main className={styles.page}>
			<div className={styles.content}>
				<h1 className={styles.title}>Faina Académica</h1>
				<p className={styles.subtitle}><span className={styles.subtitlePrefix}>ou </span><em>Nem Tudo o Que Vem à Rede é Praxe</em></p>

				<nav className={styles.nav}>
					{NAV_ITEMS.map(({ to, label, wip }) => (
						<Link key={to} to={to} className={styles.navLink}>
							{label}
							{wip && <span className={styles.wip}>em construção</span>}
						</Link>
					))}
				</nav>
			</div>
		</main >
	);
}
