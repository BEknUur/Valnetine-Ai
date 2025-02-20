export async function fetchSupportedLanguages() {
    try {
      const response = await fetch("http://localhost:8000/supported_languages");
      const data = await response.json();
      return data.languages;
    } catch (error) {
      console.error("Error fetching languages:", error);
      return [];
    }
  }
  