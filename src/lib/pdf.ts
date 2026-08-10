import { jsPDF } from 'jspdf';
import { Booking } from '@/types';
import { formatINR, formatDate } from './utils';

export function generateInvoicePDF(booking: Booking) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Colors
  const darkGreen = [46, 125, 50];
  const gold = [212, 175, 55];
  const darkCharcoal = [33, 33, 33];
  const lightBg = [253, 251, 247];

  // Background tint
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.rect(0, 0, 210, 297, 'F');

  // Header Banner
  doc.setFillColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.rect(0, 0, 210, 38, 'F');

  // Gold Trim Line
  doc.setFillColor(gold[0], gold[1], gold[2]);
  doc.rect(0, 38, 210, 3, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('KERALA KITCHEN', 15, 18);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Authentic Onam Sadya Pre-Booking Invoice', 15, 27);

  // Booking Badge
  doc.setTextColor(gold[0], gold[1], gold[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(booking.bookingNumber, 150, 22, { align: 'right' });

  // Details Section
  let y = 52;

  // Invoice Meta Box
  doc.setDrawColor(220, 220, 220);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(15, y, 180, 32, 2, 2, 'FD');

  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Booking Date:', 22, y + 10);
  doc.text('Fulfillment Date:', 22, y + 20);
  doc.text('Time Slot:', 110, y + 10);
  doc.text('Fulfillment Mode:', 110, y + 20);

  doc.setFont('helvetica', 'normal');
  doc.text(formatDate(booking.createdAt), 52, y + 10);
  doc.text(formatDate(booking.date), 56, y + 20);
  doc.text(booking.timeSlot, 135, y + 10);
  doc.text(booking.fulfillment.toUpperCase(), 150, y + 20);

  y += 42;

  // Customer Info Box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.text('Customer Information', 15, y);

  y += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.text(`Name: ${booking.customer.name}`, 15, y + 5);
  doc.text(`Phone: ${booking.customer.phone}`, 15, y + 12);
  doc.text(`Email: ${booking.customer.email}`, 15, y + 19);

  if (booking.fulfillment === 'delivery' && booking.customer.address) {
    doc.text(`Delivery Address: ${booking.customer.address}, PIN: ${booking.customer.pincode || ''}`, 15, y + 26);
    y += 7;
  }

  y += 32;

  // Order Items Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.text('Order Breakdown', 15, y);

  y += 6;

  // Table Header
  doc.setFillColor(240, 245, 240);
  doc.rect(15, y, 180, 8, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(50, 50, 50);
  doc.text('Item Description', 20, y + 5.5);
  doc.text('Qty / Pax', 120, y + 5.5);
  doc.text('Amount', 185, y + 5.5, { align: 'right' });

  y += 8;

  // Sadya Package Row
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(booking.sadyaItem.name, 20, y + 7);
  doc.text(`${booking.quantity.adults} Adult(s)${booking.quantity.children ? `, ${booking.quantity.children} Child(ren)` : ''}`, 120, y + 7);
  const basePrice = booking.sadyaItem.price * (booking.quantity.adults + booking.quantity.children * 0.6);
  doc.text(formatINR(basePrice), 185, y + 7, { align: 'right' });

  y += 12;

  // Extras Rows
  booking.extras.forEach((extra) => {
    doc.text(`Extra: ${extra.name}`, 20, y + 5);
    doc.text(`x${extra.quantity}`, 120, y + 5);
    doc.text(formatINR(extra.price * extra.quantity), 185, y + 5, { align: 'right' });
    y += 9;
  });

  doc.setDrawColor(200, 200, 200);
  doc.line(15, y + 3, 195, y + 3);

  y += 10;

  // Calculations Box
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal:', 130, y);
  doc.text(formatINR(booking.subtotal), 185, y, { align: 'right' });

  if (booking.discount > 0) {
    y += 7;
    doc.setTextColor(180, 0, 0);
    doc.text(`Discount (${booking.couponApplied?.code || 'Promo'}):`, 130, y);
    doc.text(`-${formatINR(booking.discount)}`, 185, y, { align: 'right' });
    doc.setTextColor(0, 0, 0);
  }

  if (booking.deliveryCharge > 0) {
    y += 7;
    doc.text('Delivery Charge:', 130, y);
    doc.text(formatINR(booking.deliveryCharge), 185, y, { align: 'right' });
  }

  y += 10;
  doc.setFillColor(darkGreen[0], darkGreen[1], darkGreen[2]);
  doc.rect(125, y - 5, 70, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('TOTAL AMOUNT:', 130, y + 2);
  doc.text(formatINR(booking.totalAmount), 190, y + 2, { align: 'right' });

  // Footer / Status Box
  y += 25;
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`Payment Status: ${booking.paymentStatus.toUpperCase()} (${booking.paymentMethod.toUpperCase()})`, 15, y);
  doc.text(`Order Status: ${booking.orderStatus}`, 15, y + 7);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Thank you for choosing Kerala Kitchen to celebrate your Onam Festival!', 15, y + 20);
  doc.text('Please present this invoice or QR code at pickup/delivery.', 15, y + 26);

  // Save PDF
  doc.save(`${booking.bookingNumber}-Invoice.pdf`);
}
