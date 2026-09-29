import { HomePage } from '@/pages/home';
import { AppProviders } from './providers';
import './styles/global.css';

/** Raíz de la aplicación: proveedores + la página que toque renderizar. */
export function App() {
  return (
    <AppProviders>
      <HomePage />
    </AppProviders>
  );
}
