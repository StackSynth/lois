/**
 * In-memory scan store — implements a PostgreSQL-compatible interface.
 * Swap this with a real PostgreSQL adapter for production.
 */

const scans = new Map();

export const scanStore = {
  create(scan) {
    scans.set(scan.id, { ...scan });
    return scan;
  },

  findById(id) {
    return scans.get(id) || null;
  },

  findAll(filters = {}) {
    let results = Array.from(scans.values());

    // Sort by timestamp descending (newest first)
    results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Filter by status
    if (filters.status) {
      results = results.filter(s => s.overallStatus === filters.status);
    }

    // Filter demo/real
    if (filters.isDemo !== undefined) {
      results = results.filter(s => s.isDemo === filters.isDemo);
    }

    // Search by product name or manufacturer
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(s => {
        const name = (s.productName || '').toLowerCase();
        const manufacturer = (s.extractedFields?.find(f => f.field === 'manufacturer')?.value || '').toLowerCase();
        return name.includes(q) || manufacturer.includes(q);
      });
    }

    return results;
  },

  update(id, data) {
    const existing = scans.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...data };
    scans.set(id, updated);
    return updated;
  },

  delete(id) {
    return scans.delete(id);
  },

  clear() {
    scans.clear();
  }
};
