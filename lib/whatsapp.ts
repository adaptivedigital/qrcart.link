import { Product } from './googleSheets';

export interface CartItem extends Product {
    quantity: number;
}

export function generateWhatsAppLink(phoneNumber: string, cart: CartItem[]): string {
    if (!phoneNumber || cart.length === 0) return '';

    // sanitize phone number: remove +, spaces, dashes
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');

    let message = `Hi! I'd like to place an order:\n\n`;
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        message += `${item.quantity}x ${item.name} - $${itemTotal.toFixed(2)}\n`;
        total += itemTotal;
    });

    message += `\nTotal: $${total.toFixed(2)}`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
