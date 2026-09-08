/**
 * Rule Definitions — Legal Metrology (Packaged Commodities) Rules, 2011
 * 
 * PROTOTYPE DISCLAIMER: These rules are representative samples for demonstration.
 * Production use requires verification by legal professionals.
 * 
 * Each rule has:
 *   - id: Unique identifier
 *   - field: Which extracted field this rule checks
 *   - description: Human-readable description
 *   - applicableCondition: Function that returns true if rule applies to this product
 *   - severity: critical | major | minor
 *   - reference: Legal reference
 *   - weight: Scoring weight (higher = more impact on compliance score)
 *   - explanation: Templates for AI-style explanations
 */

export const ruleDefinitions = [
  {
    id: 'LMR-R6-1a',
    field: 'productName',
    description: 'Name or description of the commodity must be declared',
    applicableCondition: () => true,
    severity: 'critical',
    reference: 'Rule 6(1)(a) — Legal Metrology (Packaged Commodities) Rules, 2011',
    weight: 10,
    explanation: {
      missing: 'The product name or commodity description could not be identified on the label. Every pre-packaged commodity must bear the name or description of the commodity contained in the package.',
      whyItMatters: 'The product name enables consumers to identify what they are purchasing and is the most fundamental mandatory declaration.',
      suggestion: 'Ensure the product name is clearly printed on the principal display panel in a prominent and legible manner.'
    }
  },
  {
    id: 'LMR-R6-1b',
    field: 'manufacturer',
    description: 'Name and address of the manufacturer, packer, or importer must be declared',
    applicableCondition: () => true,
    severity: 'critical',
    reference: 'Rule 6(1)(b) — Legal Metrology (Packaged Commodities) Rules, 2011',
    weight: 10,
    explanation: {
      missing: 'The manufacturer, packer, or importer name could not be detected on the label.',
      lowConfidence: 'A manufacturer/packer name was detected but with low confidence. The text may be partially obscured or unclear.',
      whyItMatters: 'Consumer protection requires clear identification of who is responsible for the product. This enables consumers to contact the responsible party in case of complaints or quality issues.',
      suggestion: 'Ensure the full legal name of the manufacturer, packer, or importer is clearly printed, including entity type (Pvt Ltd, LLP, etc.).'
    }
  },
  {
    id: 'LMR-R6-1b-addr',
    field: 'address',
    description: 'Address of the manufacturer, packer, or importer must be declared',
    applicableCondition: () => true,
    severity: 'critical',
    reference: 'Rule 6(1)(b) — Legal Metrology (Packaged Commodities) Rules, 2011',
    weight: 8,
    explanation: {
      missing: 'The address of the manufacturer/packer/importer could not be identified on the label.',
      whyItMatters: 'The address allows consumers and authorities to locate and contact the responsible party. It also assists in traceability during product recalls.',
      suggestion: 'Include the complete registered address including city, state, and PIN code.'
    }
  },
  {
    id: 'LMR-R6-1c',
    field: 'countryOfOrigin',
    description: 'Country of origin must be declared for imported goods',
    applicableCondition: (extractedFields) => {
      // Applicable if product appears to be imported
      const manufacturer = extractedFields.find(f => f.field === 'manufacturer');
      const mfrText = (manufacturer?.value || '').toLowerCase();
      const hasImportKeyword = mfrText.includes('import') || mfrText.includes('distribut');
      // Also check from OCR text context if available
      return hasImportKeyword;
    },
    severity: 'major',
    reference: 'Rule 6(1)(c) — Legal Metrology (Packaged Commodities) Rules, 2011',
    weight: 7,
    explanation: {
      missing: 'Country of origin was not detected. If this is an imported product, the country of origin must be declared.',
      notApplicable: 'This rule applies to imported goods. The product appears to be domestically manufactured.',
      whyItMatters: 'Consumers have the right to know the country where the product was manufactured. This is mandatory for all imported packaged commodities.',
      suggestion: 'If the product is imported, clearly declare "Country of Origin: [Country Name]" on the label.'
    }
  },
  {
    id: 'LMR-R6-1d',
    field: 'netQuantity',
    description: 'Net quantity must be declared in standard units of weight, measure, or number',
    applicableCondition: () => true,
    severity: 'critical',
    reference: 'Rule 6(1)(d) — Legal Metrology (Packaged Commodities) Rules, 2011',
    weight: 10,
    explanation: {
      missing: 'Net quantity declaration could not be found on the label.',
      invalid: 'The net quantity declaration was found but may not be in standard units of weight or measure.',
      whyItMatters: 'Net quantity is a fundamental consumer right — it ensures consumers know exactly how much product they are getting for the price paid.',
      suggestion: 'Declare net quantity in standard metric units (g, kg, ml, L) using the format: "Net Qty: [amount] [unit]".'
    }
  },
  {
    id: 'LMR-R6-1e',
    field: 'mrp',
    description: 'Maximum Retail Price (inclusive of all taxes) must be declared',
    applicableCondition: () => true,
    severity: 'critical',
    reference: 'Rule 6(1)(e) — Legal Metrology (Packaged Commodities) Rules, 2011',
    weight: 10,
    explanation: {
      missing: 'MRP (Maximum Retail Price) could not be detected on the label.',
      whyItMatters: 'The MRP inclusive of all taxes must be declared to prevent overcharging. No retailer shall sell above the declared MRP.',
      suggestion: 'Declare MRP clearly as "MRP: ₹[amount] (incl. of all taxes)" on the package.'
    }
  },
  {
    id: 'LMR-R6-1f',
    field: 'dateOfManufacture',
    description: 'Month and year of manufacture, packing, or import must be declared',
    applicableCondition: () => true,
    severity: 'major',
    reference: 'Rule 6(1)(f) — Legal Metrology (Packaged Commodities) Rules, 2011',
    weight: 7,
    explanation: {
      missing: 'Date of manufacture/packing could not be identified on the label.',
      whyItMatters: 'Manufacturing date helps consumers assess product freshness and enables proper stock rotation by retailers.',
      suggestion: 'Declare the month and year of manufacture or packing, e.g., "Mfg Date: MM/YYYY" or "Packed on: Month Year".'
    }
  },
  {
    id: 'LMR-R6-1g',
    field: 'bestBefore',
    description: 'Best before or use-by date must be declared for perishable/consumable goods',
    applicableCondition: (extractedFields, category) => {
      return category === 'food' || category === 'cosmetic';
    },
    severity: 'major',
    reference: 'Rule 6(1)(g) — Legal Metrology (Packaged Commodities) Rules, 2011 / FSSAI Regulations',
    weight: 8,
    explanation: {
      missing: 'Best before / expiry date was not detected. For food and cosmetic products, this is a required declaration.',
      notApplicable: 'This rule primarily applies to food and cosmetic products with a limited shelf life.',
      whyItMatters: 'Expiry or best-before dates protect consumers from using products past their safe consumption period.',
      suggestion: 'Declare "Best Before: [date]" or "Use By: [date]" clearly on the package, along with storage conditions if applicable.'
    }
  },
  {
    id: 'LMR-R6-2',
    field: 'consumerCare',
    description: 'Consumer care information must be provided',
    applicableCondition: () => true,
    severity: 'major',
    reference: 'Rule 6(2) — Legal Metrology (Packaged Commodities) Rules, 2011',
    weight: 6,
    explanation: {
      missing: 'Consumer care contact information (phone number, email, or address for complaints) was not detected.',
      whyItMatters: 'Consumers must have a way to reach the manufacturer/packer for complaints, feedback, or product-related queries.',
      suggestion: 'Provide a consumer care phone number (preferably toll-free starting with 1800), email address, or postal address for consumer complaints.'
    }
  },
  {
    id: 'LMR-R6-USP',
    field: 'unitSalePrice',
    description: 'Unit sale price should be declared where applicable',
    applicableCondition: (extractedFields) => {
      // Unit sale price is applicable for commodities sold by weight/volume
      const netQty = extractedFields.find(f => f.field === 'netQuantity');
      if (!netQty?.value) return false;
      const val = netQty.value.toLowerCase();
      return /\d+\s*(g|gm|kg|ml|l|ltr)/i.test(val);
    },
    severity: 'minor',
    reference: 'Rule 6 — Legal Metrology (Packaged Commodities) Rules, 2011',
    weight: 4,
    explanation: {
      missing: 'Unit sale price (price per standard unit of weight/volume) was not detected. Verify whether this declaration is applicable to this product category.',
      notApplicable: 'Unit sale price may not be applicable for this product type.',
      whyItMatters: 'Unit sale price helps consumers compare value across different package sizes and brands, promoting informed purchasing decisions.',
      suggestion: 'If applicable, declare the price per standard unit (e.g., "₹[amount] per kg" or "₹[amount] per litre").'
    }
  },
  {
    id: 'LMR-FSSAI',
    field: 'fssaiLicense',
    description: 'FSSAI License number must be displayed on food products',
    applicableCondition: (extractedFields, category) => {
      return category === 'food';
    },
    severity: 'critical',
    reference: 'Food Safety and Standards Act, 2006 — Section 31',
    weight: 9,
    explanation: {
      missing: 'FSSAI License number was not found. All food products sold in India must display a valid 14-digit FSSAI license number.',
      notApplicable: 'FSSAI licensing is applicable to food products only. This product does not appear to be a food item.',
      whyItMatters: 'The FSSAI license confirms that the food business operator is registered and the product meets food safety standards set by the Food Safety and Standards Authority of India.',
      suggestion: 'Display the 14-digit FSSAI license number along with the FSSAI logo on the food product label.'
    }
  },
  {
    id: 'LMR-BATCH',
    field: 'batchNumber',
    description: 'Batch or lot number for traceability',
    applicableCondition: () => true,
    severity: 'minor',
    reference: 'Legal Metrology (Packaged Commodities) Rules, 2011 — Good Manufacturing Practice',
    weight: 3,
    explanation: {
      missing: 'Batch/lot number was not detected on the label.',
      whyItMatters: 'Batch numbers enable product traceability, facilitate targeted recalls, and support quality control processes.',
      suggestion: 'Include a batch or lot number (e.g., "Batch No: [alphanumeric code]") for traceability purposes.'
    }
  }
];
