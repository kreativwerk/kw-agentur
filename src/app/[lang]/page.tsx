import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Work } from "@/components/work";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat/chat-widget";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <Nav dict={dict} lang={lang} />
      <main className="flex-1">
        <Hero dict={dict} lang={lang} />
        <Services dict={dict} />
        <Process dict={dict} />
        <Work dict={dict} lang={lang} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
      <ChatWidget dict={dict} lang={lang} />
    </>
  );
}
