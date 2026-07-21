import "@/app/globals.css";
import 'material-symbols/outlined.css';
import "material-symbols/rounded.css";
import "material-symbols/sharp.css";
import Header from "@/components/layout/Header";
import AuthProvider from "@/providers/AuthProvider";
import ModalProvider from "@/providers/ModalProvider";
import ModalRoot from "@/components/modal/ModalRoot";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <AuthProvider>
                <ModalProvider>
                    
                    <header>
                        <Header/>
                    </header>

                    <main>{children}</main>

                    <footer></footer>

                    <ModalRoot/>

                </ModalProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
