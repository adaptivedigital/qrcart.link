import { fetchStoreData } from '@/lib/googleSheets';
import StoreView from '@/components/StoreView';

export default async function StorePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const products = await fetchStoreData(slug);

    // Note: Error handling for invalid sheet ID is handled gracefully by returning empty array in fetchStoreData
    // StoreView handles the empty state.

    return <StoreView products={products} storeId={slug} />;
}
