const API_URL = "https://valnetine-ai.onrender.com";  

export async function fetchSupportedLanguages() {
    try {
      const response = await fetch(`${API_URL}/supported_languages`);
      const data = await response.json();
      return data.languages;
    } catch (error) {
      console.error("Error fetching languages:", error);
      return [];
    }
}
