import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./module_1_first.css";

const Bella = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ⬇️ Завантаження даних з бекенду
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://your-api.com/api/pages"); // 🔁 Заміни на свій URL
        const data = await res.json();
        setPages(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Не вдалося завантажити дані.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEmotionClick = (emotion, correct) => {
    setSelectedEmotion(emotion);
    if (correct) {
      if (pageIndex < pages.length - 1) {
        setPageIndex((prev) => prev + 1);
        setSelectedEmotion(null);
      } else {
        navigate("/login");
      }
    } else {
      setShowModal(true);
    }
  };

  if (loading) return <div className="container">Завантаження...</div>;
  if (error) return <div className="container">{error}</div>;

  const data = pages[pageIndex];

  return (
    <div>
      <nav className="container">
        <img src="/images/logo1.png" alt="Logo" className="logo" onClick={() => navigate("/")} />
        <ul>
          <li>Як це працює?</li>
          <li>Мобільний застосунок</li>
          <li>Почати навчання</li>
        </ul>
      </nav>

      <main className="container">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h3>{`${pageIndex + 1} / ${pages.length}`}</h3>

        <div className="first_story">
          <div className="text_block">
            <p>{data.text}</p>
          </div>
          <div>
            <img src={data.imageUrl} alt="Story visual" className="image_fox image_fox2" />
          </div>
        </div>

        <h2>{data.question}</h2>

        <div className="variables">
          {data.answers.map((ans, idx) => (
            <button
              key={idx}
              className={`btn_variant ${selectedEmotion === ans.text ? (ans.correct ? "green" : "wrong_btn") : ""}`}
              onClick={() => handleEmotionClick(ans.text, ans.correct)}
            >
              {ans.text}
              <img src={ans.gifUrl} className="image_gif" />
            </button>
          ))}
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="inmodal">
                <h3 className="modal_h3">Чому має бути саме ця відповідь?</h3>
                <p>{data.explanation}</p>
                <button className="close_btn" onClick={() => setShowModal(false)}>Закрити</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="container footer">
        <div className="footer_text">
          <p>© 2025 EmoPuzzle. Усі права захищено.</p>
          <p>Допомагаємо дітям відчувати світ серцем.</p>
          <p>Зв'яжіться з нами: email@example.com | Телефон: +380 ХХХ ХХХ ХХХХ</p>
        </div>
        <p className="background_text">EmoPuzzle</p>
      </footer>
    </div>
  );
};

export default Bella;
