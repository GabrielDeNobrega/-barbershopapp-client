import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { AuthInterceptor } from './components/security/AuthInterceptor';
import { setDefaultAxiosAuthToken } from './config/axiosConfig';
import { AuthProvider } from './contexts/AuthContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { getToken } from './services/local-storage/localStorageService';
import './styles/index.css';


setDefaultAxiosAuthToken(getToken());
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AuthProvider>
    <LoadingProvider>
      <BrowserRouter>
        <AuthInterceptor>
          <App />
        </AuthInterceptor>
      </BrowserRouter>
    </LoadingProvider>
  </AuthProvider>
);

