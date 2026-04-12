export async function parseCSV(url: string) {
  try {
    const response = await fetch(url);
    const csvText = await response.text();
    
    // Split by rows and handle potential carriage returns
    const rows = csvText.split(/\r?\n/).filter(row => row.trim() !== "");
    const headers = rows[0].split(",").map(header => header.trim());

    return rows.slice(1).map(row => {
      // Handles commas inside quotes (standard CSV behavior)
      const values = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
      const cleanValues = values.map(v => v.replace(/^"|"$/g, "").trim());
      
      const entry: any = {};
      headers.forEach((header, index) => {
        let value: any = cleanValues[index];
        
        // Convert specific types for the "Money Sort" logic
        if (value === "TRUE") value = true;
        if (value === "FALSE") value = false;
        if (header === "rank") value = parseInt(value, 10) || 99;
        
        entry[header] = value;
      });
      return entry;
    });
  } catch (error) {
    console.error("Error parsing CSV:", error);
    return [];
  }
}
