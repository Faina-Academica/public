import { HashRouter, Routes, Route } from 'react-router-dom';
import MainPage from './views/MainPage';
import CodigoFaina from './views/CodigoFaina';
import Contactos from './views/Contactos';
import PlaceholderView from './views/PlaceholderView';
import { fetchCodigoFileId } from './services/codigo';
import { fetchContactos } from './services/contactos';

fetchCodigoFileId();
fetchContactos();

export default function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/codigo" element={<CodigoFaina />} />
				<Route path="/cronicas" element={<PlaceholderView />} />
				<Route path="/cronicas/:id" element={<PlaceholderView />} />
				<Route path="/contactos" element={<Contactos />} />
			</Routes>
		</HashRouter>
	);
}
