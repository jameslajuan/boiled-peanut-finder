import { useState, useEffect } from 'react';
import { parseCSV } from '../lib/parseCSV';

export interface Supplier {
  slug: string;           
  name: string;           
  isPremium: boolean;     
  rank: number;           
  navphone: string;       
  partnerDiscount: string; 
  flavor_tags: string;    
  address: string;
  business_bio: string;   
  stall_photo: string;    
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

// TODO: Replace the URL below with your Google Sheet "Publish to Web" CSV link
const GOOGLE_SHEET_CSV_URL = "YOUR_PUBLISHED_CSV_URL_HERE";

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await parseCSV(GOOGLE_SHEET_CSV_URL);
      setSuppliers(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { suppliers, loading };
}
