import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold">Contact</h1>
      </main>
      <Footer />
    </div>
  );
}