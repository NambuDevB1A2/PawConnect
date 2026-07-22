import "@/app/globals.css";
import 'material-symbols/outlined.css';
import "material-symbols/rounded.css";
import "material-symbols/sharp.css";
import Header from "@/components/layout/Header";
import AuthProvider from "@/providers/AuthProvider";
import ModalProvider from "@/providers/ModalProvider";
import ModalRoot from "@/components/modal/ModalRoot";
import { Me } from "@/services/auth/me.server";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await Me();

    return (
        <html lang="ko">
            <body>
                <AuthProvider initialUser={user}>
                <ModalProvider>
                    
                    <header>
                        <Header user={user}/>
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
