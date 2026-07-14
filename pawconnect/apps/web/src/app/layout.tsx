import "@/app/globals.css";
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
