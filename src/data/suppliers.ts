import { useState, useEffect } from 'react';
import { parseCSV } from '../lib/parseCSV';

export interface Supplier {
  slug: string;           // e.g., "charleston-sc"
  name: string;           // e.g., "Tony's Salty Stand"
  isPremium: boolean;     // TRUE/FALSE from sheet
  rank: number;           // 1-10 for sorting
  navphone: string;       // Dynamic phone for the Navbar
  partnerDiscount: string; // Special offer text
  flavor_tags: string;    // e.g., "cajun, classic, green"
  address: string;
  business_bio: string;   
  stall_photo: string;    // Image URL
  city_description: string;
  city_hero_image: string;
  faq_question_1: string;
  faq_answer_1: string;
  faq_question_2: string;
  faq_answer_2: string;
  faq_question_3: string;
  faq_answer_3: string;
  faq_question_4: string;
  faq_answer_4: string;
}

// Your verified Google Sheet CSV link
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRMiAOPOVCHMkRtXcr8mGTKwmbHjkRGPRyYCLJr2nIq5XPwbbKwrhCA5B5AX5u-PLLzmixJVic37voY/pub?output=csv";

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await parseCSV(GOOGLE_SHEET_CSV_URL);
        setSuppliers(data);
      } catch (err) {
        console.error("Failed to fetch peanut data:", err);
        setError("Could not load directory data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { suppliers, loading, error };
}
