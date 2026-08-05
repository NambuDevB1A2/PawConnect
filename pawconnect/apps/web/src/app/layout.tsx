import "@/app/globals.css";
import 'material-symbols/outlined.css';
import "material-symbols/rounded.css";
import "material-symbols/sharp.css";
import Header from "@/components/layout/Header";
import AuthProvider from "@/providers/AuthProvider";
import ModalProvider from "@/providers/ModalProvider";
import ModalRoot from "@/components/modal/ModalRoot";
import { Me } from "@/services/users/me.server";
import Footer from "@/components/layout/Footer";
import Aside from "@/components/layout/Aside";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await Me();

    return (
        <html lang="ko">
            <body>
                <AuthProvider initialUser={user?.user}>
                <ModalProvider>
                    
                    <Header user={user?.user}/>

                    <main>{children}</main>

                    <Aside/>

                    <footer>
                        <Footer/>
                    </footer>

                    <ModalRoot/>

                </ModalProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
