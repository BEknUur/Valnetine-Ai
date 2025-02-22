import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://valentine-ai.onrender.com"; 

export interface LoveLetterResponse {
  letter_id: string;
  letter: string;
}

export const generateLetter = async (data: any): Promise<LoveLetterResponse> => {
  const response = await axios.post<LoveLetterResponse>(`${API_URL}/generate_letter/`, data);
  return response.data;
};
