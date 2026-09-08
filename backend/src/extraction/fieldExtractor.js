/**
 * Field Extractor — Regex + heuristic matching for label fields.
 * Extracts structured data from raw OCR text.
 */

const FIELD_PATTERNS = {
  mrp: {
    label: 'Maximum Retail Price (MRP)',
    patterns: [
      /(?:M\.?R\.?P\.?|Maximum\s+Retail\s+Price)\s*[:\-]?\s*(?:Rs\.?|₹|INR)\s*([\d,]+(?:\.\d{1,2})?)/i,
      /(?:Rs\.?|₹|INR)\s*([\d,]+(?:\.\d{1,2})?)\s*(?:\(?\s*(?:incl|inclusive|including)\s+(?:of\s+)?(?:all\s+)?taxes?\s*\)?)?/i,
      /(?:price|mrp)\s*[:\-]?\s*([\d,]+(?:\.\d{1,2})?)/i
    ],
    extract: (match) => {
      const value = match[1].replace(/,/g, '');
      return `₹${value}`;
    }
  },

  netQuantity: {
    label: 'Net Quantity',
    patterns: [
      /(?:Net\s+(?:Qty|Quantity|Wt|Weight|Vol|Volume|Content|Contents))\s*[:\-]?\s*([\d.]+\s*(?:g|gm|gms|gram|grams|kg|kgs|ml|mL|l|L|ltr|litre|litres|liter|liters|oz|pieces?|pcs?|units?|nos?)\.?)/i,
      /(?:Contents?|Qty|Quantity)\s*[:\-]?\s*([\d.]+\s*(?:g|gm|gms|kg|ml|mL|l|L|ltr|pieces?|pcs?|nos?)\.?)/i,
      /([\d.]+\s*(?:g|kg|ml|l|ltr)\b)/i
    ],
    extract: (match) => match[1].trim()
  },

  manufacturer: {
    label: 'Manufacturer / Packer / Importer',
    patterns: [
      /(?:Mfg\.?\s*(?:by)?|Manufactured\s+by|Packer|Packed\s+by|Marketer|Marketed\s+by|Importer|Imported\s+by)\s*[:\-]?\s*([A-Z][A-Za-z\s&.,()]+(?:Ltd|Pvt|Inc|Corp|Co|LLC|LLP|Industries|Foods|Enterprises|Products|International)?\.?)/i,
      /(?:Company|Brand\s+Owner)\s*[:\-]?\s*([A-Z][A-Za-z\s&.,()]+(?:Ltd|Pvt|Inc|Corp|Co)?\.?)/i
    ],
    extract: (match) => match[1].trim().replace(/\s+/g, ' ')
  },

  address: {
    label: 'Address',
    patterns: [
      /(?:Address|Regd\.?\s*(?:Office)?|Registered\s+Office|Corporate\s+Office|Factory)\s*[:\-]?\s*([A-Za-z0-9\s,.\-/#()]+?(?:India|Tamil\s*Nadu|Karnataka|Maharashtra|Delhi|Gujarat|Rajasthan|Kerala|Telangana|Andhra\s*Pradesh|West\s*Bengal|Uttar\s*Pradesh|Madhya\s*Pradesh|Bihar|Punjab|Haryana|Odisha|Assam|Jharkhand|Chhattisgarh|Goa|Himachal\s*Pradesh|Uttarakhand)[\s,.\-]*(?:\d{6})?)/i,
      /(?:Plot|Survey|No\.|Door)\s*[:\-]?\s*([A-Za-z0-9\s,.\-/#()]+?(?:\d{6}))/i
    ],
    extract: (match) => match[1].trim().replace(/\s+/g, ' ')
  },

  consumerCare: {
    label: 'Consumer Care Details',
    patterns: [
      /(?:Consumer\s+Care|Customer\s+Care|Helpline|Toll\s*Free|Contact\s*Us|Grievance|Complaints?)\s*[:\-]?\s*((?:\+?\d[\d\s\-()]{7,})|(?:1800[\d\s\-]+))/i,
      /(?:Consumer\s+Care|Customer\s+Care|Contact)\s*[:\-]?\s*([A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,})/i,
      /(1800[\s\-]?\d{3}[\s\-]?\d{4,})/i
    ],
    extract: (match) => match[1].trim()
  },

  countryOfOrigin: {
    label: 'Country of Origin',
    patterns: [
      /(?:Country\s+of\s+Origin|Made\s+in|Product\s+of|Manufactured\s+in|Origin)\s*[:\-]?\s*(India|China|USA|United\s+States|Japan|Korea|Germany|France|Italy|Thailand|Vietnam|Bangladesh|Sri\s+Lanka|Nepal|Malaysia|Indonesia|Taiwan|UK|United\s+Kingdom|Australia|Canada|Brazil|Mexico|Turkey|Switzerland|Netherlands|Sweden|Spain|Singapore|Philippines)/i
    ],
    extract: (match) => match[1].trim()
  },

  dateOfManufacture: {
    label: 'Date of Manufacture / Packing',
    patterns: [
      /(?:Mfg\.?\s*(?:Date)?|Mfd\.?\s*(?:Date)?|Manufactured|Date\s+of\s+(?:Mfg|Manufacture|Manufacturing|Packing|Pkg)|Packed\s+on|Pkg\.?\s*Date)\s*[:\-]?\s*(\d{1,2}[\s/.\-]\d{1,2}[\s/.\-]\d{2,4}|\w+[\s/.\-]\d{2,4}|\d{1,2}[\s/.\-]\w+[\s/.\-]\d{2,4})/i
    ],
    extract: (match) => match[1].trim()
  },

  bestBefore: {
    label: 'Best Before / Expiry Date',
    patterns: [
      /(?:Best\s+Before|BB|Exp\.?\s*(?:Date)?|Expiry|Use\s+(?:Before|By)|Shelf\s+Life)\s*[:\-]?\s*(\d{1,2}[\s/.\-]\d{1,2}[\s/.\-]\d{2,4}|\d+\s*(?:months?|days?|years?)\s*(?:from\s+(?:mfg|manufacture|packing|pkg))?|\w+[\s/.\-]\d{2,4})/i
    ],
    extract: (match) => match[1].trim()
  },

  unitSalePrice: {
    label: 'Unit Sale Price',
    patterns: [
      /(?:Unit\s+(?:Sale\s+)?Price|Price\s+per\s+(?:unit|kg|g|ml|l|ltr|litre|piece))\s*[:\-]?\s*(?:Rs\.?|₹|INR)\s*([\d,]+(?:\.\d{1,2})?)/i,
      /(?:Rs\.?|₹)\s*([\d,]+(?:\.\d{1,2})?)\s*(?:per|\/)\s*(?:kg|g|ml|l|ltr|litre|piece|unit)/i
    ],
    extract: (match) => `₹${match[1].replace(/,/g, '')}`
  },

  productName: {
    label: 'Product Name',
    patterns: [
      /^([A-Z][A-Za-z\s'&\-]+(?:Rice|Oil|Soap|Wash|Cream|Powder|Noodles|Biscuits?|Chips|Juice|Water|Tea|Coffee|Sugar|Salt|Flour|Spice|Masala|Sauce|Ketchup|Pickle|Jam|Honey|Butter|Ghee|Milk|Curd|Paneer|Cheese|Bread|Cookies?|Chocolate|Candy|Gum|Shampoo|Conditioner|Lotion|Sunscreen|Detergent|Cleaner))/im
    ],
    extract: (match) => match[1].trim()
  },

  fssaiLicense: {
    label: 'FSSAI License Number',
    patterns: [
      /(?:FSSAI|Lic|License)\s*(?:No\.?|Number)?\s*[:\-]?\s*(\d{14})/i,
      /(\d{14})\s*(?:FSSAI)/i
    ],
    extract: (match) => match[1].trim()
  },

  batchNumber: {
    label: 'Batch / Lot Number',
    patterns: [
      /(?:Batch|Lot|B\.?\s*No|L\.?\s*No)\s*[:\-]?\s*([A-Za-z0-9\-/]+)/i
    ],
    extract: (match) => match[1].trim()
  }
};

/**
 * Calculate confidence for an extracted field based on match quality.
 */
function calculateConfidence(text, match, patternIndex) {
  let confidence = 90;

  // First pattern match is most specific → highest confidence
  confidence -= patternIndex * 8;

  // Longer matches tend to be more reliable
  if (match[0].length > 20) confidence += 3;

  // Short matches may be false positives
  if (match[0].length < 5) confidence -= 15;

  // Cap between 40-99
  return Math.max(40, Math.min(99, confidence));
}

/**
 * Extract structured fields from raw OCR text.
 * @param {string} ocrText - Raw text from OCR
 * @returns {Array<ExtractedField>} - Array of extracted fields
 */
export function extractFields(ocrText) {
  if (!ocrText || typeof ocrText !== 'string') {
    return Object.entries(FIELD_PATTERNS).map(([field, config]) => ({
      field,
      label: config.label,
      value: null,
      confidence: 0,
      status: 'not_found'
    }));
  }

  const results = [];

  for (const [field, config] of Object.entries(FIELD_PATTERNS)) {
    let matched = false;

    for (let i = 0; i < config.patterns.length; i++) {
      const match = ocrText.match(config.patterns[i]);
      if (match) {
        const value = config.extract(match);
        const confidence = calculateConfidence(ocrText, match, i);

        results.push({
          field,
          label: config.label,
          value,
          confidence,
          status: confidence >= 70 ? 'found' : 'low_confidence'
        });
        matched = true;
        break;
      }
    }

    if (!matched) {
      results.push({
        field,
        label: config.label,
        value: null,
        confidence: 0,
        status: 'not_found'
      });
    }
  }

  return results;
}

/**
 * Attempt to detect the product category from OCR text.
 * Used by rule engine to determine applicable rules.
 */
export function detectProductCategory(ocrText) {
  if (!ocrText) return 'general';

  const text = ocrText.toLowerCase();

  const foodKeywords = ['fssai', 'ingredients', 'nutritional', 'nutrition facts', 'calories', 'protein', 'carbohydrate', 'fat', 'sugar', 'sodium', 'dietary', 'allergen', 'contains', 'veg', 'non-veg', 'vegetarian', 'best before', 'use by', 'serving size'];
  const cosmeticKeywords = ['for external use', 'dermatologically', 'skin', 'hair', 'face', 'body', 'shampoo', 'conditioner', 'lotion', 'cream', 'sunscreen', 'spf', 'moisturizer'];
  const electronicKeywords = ['voltage', 'watt', 'power', 'bis', 'isi', 'electronic', 'battery', 'adapter', 'charger', 'warranty'];

  const foodScore = foodKeywords.filter(k => text.includes(k)).length;
  const cosmeticScore = cosmeticKeywords.filter(k => text.includes(k)).length;
  const electronicScore = electronicKeywords.filter(k => text.includes(k)).length;

  if (foodScore >= 2) return 'food';
  if (cosmeticScore >= 2) return 'cosmetic';
  if (electronicScore >= 2) return 'electronic';
  return 'general';
}
