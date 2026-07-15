import "@/app/globals.css";
import 'material-symbols/outlined.css';
import "material-symbols/rounded.css";
import "material-symbols/sharp.css";
import Header from "@/components/header/Header";
import AuthProvider from "@/providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
        <body>
            <AuthProvider>
                
                <header>
                    <Header />
                </header>

            <main>{children}</main>

            <footer></footer>

            </AuthProvider>
        </body>
    </html>
  );
}
