import { getProductById } from "@/features/products/api/getProducts";
import { ProductShowcase } from "@/features/products/components/ProductShowcase";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-black/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </Link>

        <Suspense
          fallback={
            <div className="h-[60vh] rounded-[2rem] bg-white/5 border border-white/10 animate-pulse flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-[#00C6D8] animate-spin" />
            </div>
          }
        >
          <ProductDetailContent id={id} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductDetailContent({ id }: { id: string }) {
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductShowcase />;
}
