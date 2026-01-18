import Papa from 'papaparse';

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export async function fetchStoreData(sheetId: string): Promise<Product[]> {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

    try {
        const response = await fetch(csvUrl, { next: { revalidate: 60 } }); // Revalidate every minute
        if (!response.ok) {
            throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
        }
        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const products: Product[] = results.data.map((row: any, index) => ({
                        id: String(index),
                        name: row['Product Name'] || row['Name'] || 'Untitled',
                        price: parseFloat(row['Price']?.replace(/[^0-9.]/g, '')) || 0,
                        description: row['Description'] || '',
                        image: row['Image URL'] || row['Image'] || '',
                        category: row['Category'] || 'General'
                    }));
                    resolve(products);
                },
                error: (error: any) => {
                    reject(error);
                }
            });
        });

    } catch (error) {
        console.error("Error fetching store data:", error);
        return [];
    }
}
