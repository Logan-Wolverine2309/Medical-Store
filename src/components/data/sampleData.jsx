export const sampleMedicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    brand: "Crocin",
    category: "Tablet",
    price: 25,
    quantity: 150,
    batchNo: "BT2024001",
    mfgDate: "2024-01-15",
    expDate: "2026-01-15",
    supplier: "GSK Pharmaceuticals",
    description: "Used for fever and mild pain relief"
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    brand: "Mox",
    category: "Capsule",
    price: 85,
    quantity: 80,
    batchNo: "BT2024002",
    mfgDate: "2024-02-10",
    expDate: "2025-08-10",
    supplier: "Cipla Ltd",
    description: "Antibiotic for bacterial infections"
  },
  {
    id: 3,
    name: "Cetirizine 10mg",
    brand: "Zyrtec",
    category: "Tablet",
    price: 35,
    quantity: 200,
    batchNo: "BT2024003",
    mfgDate: "2024-03-05",
    expDate: "2026-03-05",
    supplier: "UCB Pharma",
    description: "Antihistamine for allergies"
  },
  {
    id: 4,
    name: "Omeprazole 20mg",
    brand: "Omez",
    category: "Capsule",
    price: 60,
    quantity: 5,
    batchNo: "BT2024004",
    mfgDate: "2023-11-20",
    expDate: "2025-05-20",
    supplier: "Dr. Reddy's",
    description: "Proton pump inhibitor for acidity"
  },
  {
    id: 5,
    name: "Ibuprofen 400mg",
    brand: "Brufen",
    category: "Tablet",
    price: 30,
    quantity: 120,
    batchNo: "BT2024005",
    mfgDate: "2024-01-25",
    expDate: "2026-01-25",
    supplier: "Abbott Healthcare",
    description: "NSAID for pain and inflammation"
  },
  {
    id: 6,
    name: "Azithromycin 500mg",
    brand: "Azithral",
    category: "Tablet",
    price: 95,
    quantity: 45,
    batchNo: "BT2024006",
    mfgDate: "2024-04-01",
    expDate: "2026-04-01",
    supplier: "Alembic Pharma",
    description: "Antibiotic for respiratory infections"
  },
  {
    id: 7,
    name: "Vitamin D3 60000IU",
    brand: "D-Rise",
    category: "Capsule",
    price: 120,
    quantity: 3,
    batchNo: "BT2024007",
    mfgDate: "2024-02-15",
    expDate: "2026-02-15",
    supplier: "USV Limited",
    description: "Vitamin D supplement"
  },
  {
    id: 8,
    name: "Cough Syrup",
    brand: "Benadryl",
    category: "Syrup",
    price: 110,
    quantity: 60,
    batchNo: "BT2024008",
    mfgDate: "2023-06-10",
    expDate: "2024-06-10",
    supplier: "Johnson & Johnson",
    description: "For dry and wet cough relief"
  },
  {
    id: 9,
    name: "Metformin 500mg",
    brand: "Glycomet",
    category: "Tablet",
    price: 45,
    quantity: 300,
    batchNo: "BT2024009",
    mfgDate: "2024-03-20",
    expDate: "2026-03-20",
    supplier: "USV Limited",
    description: "For type 2 diabetes management"
  },
  {
    id: 10,
    name: "Betadine Ointment",
    brand: "Betadine",
    category: "Ointment",
    price: 75,
    quantity: 40,
    batchNo: "BT2024010",
    mfgDate: "2024-01-01",
    expDate: "2025-12-31",
    supplier: "Win-Medicare",
    description: "Antiseptic for wound care"
  }
]

export const sampleCustomers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    phone: "9876543210",
    email: "rajesh@email.com",
    address: "123 MG Road, Delhi",
    totalPurchases: 2450
  },
  {
    id: 2,
    name: "Priya Sharma",
    phone: "9876543211",
    email: "priya@email.com",
    address: "456 Park Street, Mumbai",
    totalPurchases: 1800
  },
  {
    id: 3,
    name: "Amit Patel",
    phone: "9876543212",
    email: "amit@email.com",
    address: "789 Lake Road, Ahmedabad",
    totalPurchases: 3200
  }
]

export const sampleBills = [
  {
    id: 1,
    billNo: "BILL-001",
    customerName: "Rajesh Kumar",
    customerPhone: "9876543210",
    items: [
      { medicineId: 1, name: "Paracetamol 500mg", quantity: 2, price: 25, total: 50 },
      { medicineId: 3, name: "Cetirizine 10mg", quantity: 1, price: 35, total: 35 }
    ],
    subtotal: 85,
    discount: 5,
    discountAmount: 4.25,
    tax: 4.04,
    grandTotal: 84.79,
    date: "2024-12-01",
    paymentMethod: "Cash"
  }
]