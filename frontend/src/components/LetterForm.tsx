import { useState, useEffect } from "react";
import { generateLetter, LoveLetterResponse } from "../api/api";
import { fetchSupportedLanguages } from "../api/language";

export default function LetterForm({ onLetterGenerated }: { onLetterGenerated: (data: LoveLetterResponse) => void }) {
  const [recipient, setRecipient] = useState("");
  const [preferences, setPreferences] = useState("");
  const [tone, setTone] = useState("romantic");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState<{ code: string; name: string }[]>([]);

  useEffect(() => {
    async function loadLanguages() {
      const langs = await fetchSupportedLanguages();
      setLanguages(langs);
    }
    loadLanguages();
  }, []);

  const handleSubmit = async () => {
    if (!recipient.trim()) {
      alert("Please enter your love's name");
      return;
    }

    setLoading(true);
    try {
      const response = await generateLetter({
        recipient_name: recipient,
        preferences,
        tone,
        language,
      });
      onLetterGenerated(response);
    } catch (error) {
      console.error("Error generating letter", error);
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <p className="language-support-message">🌍 Valentine AI supports English, Русский, Қазақша! 💕</p>

      <div className="language-selector">
        <select
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
          className="language-dropdown"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <h2 className="title">💖 Create Your Love Letter 💖</h2>

      <div className="input-group">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Your love's name"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Their interests (optional)"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-wrapper">
          <div className="select-wrapper">
            <select value={tone} onChange={(e) => setTone(e.target.value)} className="custom-select">
              <option value="romantic">Romantic</option>
              <option value="funny">Funny</option>
              <option value="classic">Classic</option>
              <option value="poetic">Poetic</option>
            </select>
          </div>
        </div>
      </div> 

      <button onClick={handleSubmit} disabled={loading} className="generate-button">
  <span>{loading ? "✨ Generating..." : "✨ Generate Love Letter"}</span>
</button>


      <p className="footer-text">Created with AI magic, delivered with love 💕</p>
    </div>
  );
}
