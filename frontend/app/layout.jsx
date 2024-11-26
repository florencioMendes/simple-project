import "./globals.css";
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: "pwa",
  description: "pwa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
