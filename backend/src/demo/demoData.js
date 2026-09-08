/**
 * Demo Data — 3 sample product fixtures for hackathon demonstration.
 * These bypass OCR to ensure reliable demos even if camera/OCR fails.
 * 
 * CLEARLY MARKED AS DEMO/SAMPLE DATA
 */

export const demoProducts = {
  'demo-a': {
    id: 'demo-a',
    name: 'Sunrise Premium Basmati Rice',
    category: 'food',
    ocrText: `SUNRISE PREMIUM BASMATI RICE
Extra Long Grain Aged Basmati

Net Wt: 5 kg
MRP: ₹645 (incl. of all taxes)
Unit Price: ₹129 per kg

Manufactured by: Sunrise Agro Foods Pvt Ltd
Regd. Office: Plot No. 45, Industrial Area Phase II,
Karnal, Haryana 132001, India

Country of Origin: India

FSSAI Lic. No.: 10012345678901
Batch No: SR-2024-BAS-0847

Mfg Date: 06/2024
Best Before: 12 months from date of packing

Consumer Care: 1800-123-4567
Email: care@sunrisefoods.in

Ingredients: 100% Basmati Rice
Nutritional Information per 100g:
Energy: 349 kcal, Protein: 7.5g,
Carbohydrates: 78g, Fat: 0.6g

Storage: Store in a cool, dry place away from direct sunlight.
Vegetarian Product ✓`,
    extractedFields: [
      { field: 'productName', label: 'Product Name', value: 'Sunrise Premium Basmati Rice', confidence: 97, status: 'found' },
      { field: 'manufacturer', label: 'Manufacturer / Packer / Importer', value: 'Sunrise Agro Foods Pvt Ltd', confidence: 95, status: 'found' },
      { field: 'address', label: 'Address', value: 'Plot No. 45, Industrial Area Phase II, Karnal, Haryana 132001, India', confidence: 92, status: 'found' },
      { field: 'countryOfOrigin', label: 'Country of Origin', value: 'India', confidence: 98, status: 'found' },
      { field: 'netQuantity', label: 'Net Quantity', value: '5 kg', confidence: 98, status: 'found' },
      { field: 'mrp', label: 'Maximum Retail Price (MRP)', value: '₹645', confidence: 97, status: 'found' },
      { field: 'dateOfManufacture', label: 'Date of Manufacture / Packing', value: '06/2024', confidence: 94, status: 'found' },
      { field: 'bestBefore', label: 'Best Before / Expiry Date', value: '12 months from date of packing', confidence: 91, status: 'found' },
      { field: 'consumerCare', label: 'Consumer Care Details', value: '1800-123-4567', confidence: 96, status: 'found' },
      { field: 'unitSalePrice', label: 'Unit Sale Price', value: '₹129 per kg', confidence: 93, status: 'found' },
      { field: 'fssaiLicense', label: 'FSSAI License Number', value: '10012345678901', confidence: 97, status: 'found' },
      { field: 'batchNumber', label: 'Batch / Lot Number', value: 'SR-2024-BAS-0847', confidence: 95, status: 'found' }
    ]
  },

  'demo-b': {
    id: 'demo-b',
    name: 'GlowFresh Hydrating Face Wash',
    category: 'cosmetic',
    ocrText: `GlowFresh Hydrating Face Wash
With Vitamin C & Niacinamide
For All Skin Types

Net Vol: 100 ml
MRP: ₹249 (incl. of all taxes)

Mfd by: GlowFresh Cosmetics
Address: Unit 7, somewhere in Mumbai

Mfg Date: March 2024
Use Before: 24 months from mfg

Batch: GF-FW-2024-033

For External Use Only
Dermatologically Tested

Ingredients: Aqua, Sodium Laureth Sulfate,
Cocamidopropyl Betaine, Glycerin, Niacinamide,
Ascorbic Acid, Aloe Barbadensis Leaf Extract...

Directions: Apply on wet face, massage gently,
rinse thoroughly with water.`,
    extractedFields: [
      { field: 'productName', label: 'Product Name', value: 'GlowFresh Hydrating Face Wash', confidence: 94, status: 'found' },
      { field: 'manufacturer', label: 'Manufacturer / Packer / Importer', value: 'GlowFresh Cosmetics', confidence: 68, status: 'low_confidence' },
      { field: 'address', label: 'Address', value: 'Unit 7, somewhere in Mumbai', confidence: 55, status: 'low_confidence' },
      { field: 'countryOfOrigin', label: 'Country of Origin', value: null, confidence: 0, status: 'not_found' },
      { field: 'netQuantity', label: 'Net Quantity', value: '100 ml', confidence: 96, status: 'found' },
      { field: 'mrp', label: 'Maximum Retail Price (MRP)', value: '₹249', confidence: 97, status: 'found' },
      { field: 'dateOfManufacture', label: 'Date of Manufacture / Packing', value: 'March 2024', confidence: 88, status: 'found' },
      { field: 'bestBefore', label: 'Best Before / Expiry Date', value: '24 months from mfg', confidence: 85, status: 'found' },
      { field: 'consumerCare', label: 'Consumer Care Details', value: null, confidence: 0, status: 'not_found' },
      { field: 'unitSalePrice', label: 'Unit Sale Price', value: null, confidence: 0, status: 'not_found' },
      { field: 'fssaiLicense', label: 'FSSAI License Number', value: null, confidence: 0, status: 'not_found' },
      { field: 'batchNumber', label: 'Batch / Lot Number', value: 'GF-FW-2024-033', confidence: 90, status: 'found' }
    ]
  },

  'demo-c': {
    id: 'demo-c',
    name: 'QuickBite Instant Noodles',
    category: 'food',
    ocrText: `QuickBite Instant Noodles
Masala Flavour
75g

Ingredients: Wheat Flour, Palm Oil, Salt,
Sugar, Spices, Flavour Enhancer (E621),
Dehydrated Vegetables

Nutritional Info per 100g:
Energy: 450 kcal
Protein: 9g
Fat: 17g
Carbohydrates: 63g

Allergen Info: Contains Wheat, May contain traces of Soy

Contains added flavour (artificial)
Vegetarian`,
    extractedFields: [
      { field: 'productName', label: 'Product Name', value: 'QuickBite Instant Noodles', confidence: 91, status: 'found' },
      { field: 'manufacturer', label: 'Manufacturer / Packer / Importer', value: null, confidence: 0, status: 'not_found' },
      { field: 'address', label: 'Address', value: null, confidence: 0, status: 'not_found' },
      { field: 'countryOfOrigin', label: 'Country of Origin', value: null, confidence: 0, status: 'not_found' },
      { field: 'netQuantity', label: 'Net Quantity', value: '75g', confidence: 82, status: 'found' },
      { field: 'mrp', label: 'Maximum Retail Price (MRP)', value: null, confidence: 0, status: 'not_found' },
      { field: 'dateOfManufacture', label: 'Date of Manufacture / Packing', value: null, confidence: 0, status: 'not_found' },
      { field: 'bestBefore', label: 'Best Before / Expiry Date', value: null, confidence: 0, status: 'not_found' },
      { field: 'consumerCare', label: 'Consumer Care Details', value: null, confidence: 0, status: 'not_found' },
      { field: 'unitSalePrice', label: 'Unit Sale Price', value: null, confidence: 0, status: 'not_found' },
      { field: 'fssaiLicense', label: 'FSSAI License Number', value: null, confidence: 0, status: 'not_found' },
      { field: 'batchNumber', label: 'Batch / Lot Number', value: null, confidence: 0, status: 'not_found' }
    ]
  }
};
