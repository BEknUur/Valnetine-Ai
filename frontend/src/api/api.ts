import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export interface LoveLetterResponse {
  letter_id: string;
  letter: string;
}

export const generateLetter = async (data: any): Promise<LoveLetterResponse> => {
  const response = await axios.post<LoveLetterResponse>(`${API_URL}/generate_letter/`, data);
  return response.data;
};
