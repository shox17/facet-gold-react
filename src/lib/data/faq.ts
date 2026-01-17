export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const faq: FAQ[] = [
  // General Information
	{
    question: "How should I care for my jewelry?",
    answer: "To maintain the beauty of your jewelry, clean it regularly with a soft cloth and mild soap. Store pieces separately to prevent scratching. Avoid exposing jewelry to harsh chemicals, perfumes, or lotions. Remove jewelry before swimming, showering, or exercising. For gold pieces, professional cleaning every 6-12 months is recommended.",
    category: "General Information"
  },
  {
    question: "Do you offer custom jewelry design services?",
    answer: "Yes, we offer bespoke jewelry design services. Our skilled artisans can create unique pieces tailored to your preferences. Please contact our design team through our Contact Us page or visit our boutique to discuss your vision. Custom orders typically take 4-6 weeks to complete.",
    category: "General Information"
  },
  {
    question: "How do I determine my ring size?",
    answer: "You can determine your ring size by visiting our boutique for a professional fitting, or use our online ring size guide. We also offer a free ring sizer tool that can be mailed to you. If you're unsure, we recommend choosing a slightly larger size as rings can be resized down if needed.",
    category: "General Information"
  },
  {
    question: "What materials do you use in your jewelry?",
    answer: "We use only premium materials including 18K and 14K gold, platinum, sterling silver, and certified diamonds and gemstones. All our materials are ethically sourced and come with certification. Each piece is crafted with meticulous attention to detail and quality.",
    category: "General Information"
  },
  {
    question: "Do you offer gift wrapping?",
    answer: "Yes, we offer complimentary premium gift wrapping for all orders. You can select this option at checkout. Our gift boxes are elegant and perfect for special occasions. We also offer gift message cards that can be included with your order.",
    category: "General Information"
  },
  {
    question: "What are your customer service hours?",
    answer: "Our customer service team is available Monday through Friday, 9:00 AM to 6:00 PM (KST). For urgent matters, you can reach us via email at contact@facetandgold.com, and we'll respond within 24 hours. Our boutique is open Tuesday through Sunday, 10:00 AM to 8:00 PM.",
    category: "General Information"
  },
  
  // Ordering & Shipping
	{
    question: "How to make an order?",
    answer: "Browse our collection, select your desired items, and add them to your shopping cart. Proceed to checkout where you'll enter your shipping and payment information. Once your order is confirmed, you'll receive an email with your order details and tracking information.",
    category: "Ordering & Shipping"
  },
  {
    question: "How long does delivery take?",
    answer: "Standard delivery within South Korea takes 3-5 business days. International shipping takes 7-14 business days depending on the destination. Express shipping options are available at checkout for faster delivery. You'll receive tracking information once your order ships.",
    category: "Ordering & Shipping"
  },
  {
    question: "What shipping methods do you offer?",
    answer: "We offer standard shipping, express shipping, and overnight delivery options. Free shipping is available for orders above $200. All orders are shipped with insurance and require signature confirmation for security. International shipping is available to most countries worldwide.",
    category: "Ordering & Shipping"
	},
	{
    question: "Can I track my order?",
    answer: "Yes, once your order ships, you'll receive a tracking number via email. You can track your order status in real-time through our website or using the carrier's tracking system. We'll also send you updates at each stage of the shipping process.",
    category: "Ordering & Shipping"
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by destination. Please note that customers are responsible for any customs duties or taxes imposed by their country. We recommend checking your local import regulations before ordering.",
    category: "Ordering & Shipping"
  },
  
  // Returns & Exchanges
  {
    question: "What is your return policy?",
    answer: "We offer a 14-day return policy for unworn items in their original condition with tags and packaging. Custom or personalized items are not eligible for return. Returns must be initiated within 14 days of delivery. We'll provide a full refund or store credit once we receive and inspect the returned item.",
    category: "Returns & Exchanges"
  },
  {
    question: "How can I return an item?",
    answer: "To initiate a return, log into your account and go to 'My Orders'. Select the order you wish to return and click 'Request Return'. We'll provide you with a return authorization and shipping label. Pack the item securely in its original packaging and ship it back to us.",
    category: "Returns & Exchanges"
  },
  {
    question: "Do you offer exchanges?",
    answer: "Yes, we offer exchanges for different sizes or styles within 14 days of delivery. If the item you want is available, we can process an exchange. If the new item has a different price, we'll process a refund or charge the difference accordingly.",
    category: "Returns & Exchanges"
	},
	{
    question: "Can I cancel my order?",
    answer: "You can cancel your order within 24 hours of placing it, provided it hasn't been shipped yet. Once an order is in processing or has shipped, you'll need to wait for delivery and then initiate a return. Go to 'My Orders' in your account to cancel eligible orders.",
    category: "Returns & Exchanges"
  },
  
  // Payments & Discounts
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and installment payment plans. All transactions are secured with SSL encryption. We also accept Apple Pay and Google Pay for mobile orders.",
    category: "Payments & Discounts"
  },
  {
    question: "Is my payment information secure?",
    answer: "Absolutely. We use industry-standard SSL encryption to protect all payment information. We never store your full credit card details on our servers. All transactions are processed through secure payment gateways that comply with PCI DSS standards.",
    category: "Payments & Discounts"
	},
	{
    question: "Do you offer payment plans?",
    answer: "Yes, we offer flexible payment plans for orders above $500. You can split your payment into 3, 6, or 12 monthly installments with 0% interest. Payment plans are subject to credit approval. Select this option at checkout to see available plans.",
    category: "Payments & Discounts"
  },
  {
    question: "Do you have discount codes or promotions?",
    answer: "We regularly offer promotions and discount codes. Sign up for our newsletter to receive exclusive offers, early access to sales, and special discounts. Follow us on social media for flash sales and limited-time promotions.",
    category: "Payments & Discounts"
  },
  
  // Account & Profile
  {
    question: "How do I create an account?",
    answer: "Click 'Sign Up' in the top navigation, fill in your details including name, email, and password. You'll receive a verification email to confirm your account. Once verified, you can start shopping and track your orders easily.",
    category: "Account & Profile"
	},
	{
    question: "I forgot my password. What should I do?",
    answer: "Click 'Login' and then 'Forgot Password'. Enter your registered email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password. The link expires after 24 hours for security.",
    category: "Account & Profile"
  },
  {
    question: "How do I update my account information?",
    answer: "Log into your account and go to 'My Account' > 'Personal Information'. You can update your name, email, phone number, and shipping addresses. Changes to your email address require verification for security purposes.",
    category: "Account & Profile"
  },
  {
    question: "How do I view my order history?",
    answer: "Log into your account and click 'My Orders' in the account menu. You'll see all your past and current orders with details including order date, items, total price, and status. You can track shipments, view invoices, and manage returns from this page.",
    category: "Account & Profile"
  }
];

export const faqCategories = [
  "General Information",
  "Ordering & Shipping",
  "Returns & Exchanges",
  "Payments & Discounts",
  "Account & Profile"
];
