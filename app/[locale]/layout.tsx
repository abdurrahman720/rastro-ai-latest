import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import Context from "@/providers/context/context";
import TranslationsProvider from "@/providers/context/TranslationProvider";
import initTranslations from "@/utils/i18n";
import { Toaster } from "@/components/ui/sonner";

// const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rastro",
  description: "Every auction in Europe.",
};

const i18nNamespaces = ["navbar", "product"];

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  //@ts-ignore
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang="en">
      <body className={`${manrope.className}`}>
        <Context>
          <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}
          >
            <div className="mx-auto ">
              <Navbar />
              {children}
            </div>
            <Toaster />
          </TranslationsProvider>
        </Context>
      </body>
    </html>
  );
}
