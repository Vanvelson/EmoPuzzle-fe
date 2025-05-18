import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./scene.css";

const Scene = () => {
  const translations = {
    ua: {
      navHowItWorks: "Як це працює?",
      navPhone: "Мобільний застосунок",
      navStartLearning: "Почати навчання",
      howItWorks: "Як це працює?",
      howItWorksText:
        "Наша система допомагає дітям із аутизмом, синдромом Дауна та іншими особливостями розвитку навчитися розпізнавати та виражати емоції у відповідних ситуаціях. Ми використовуємо три інтерактивні модулі навчання:",
      mobileApp: "Мобільний додаток",
      startLearning: "Почати навчання",
      helpingChildren: "Допомагаємо дітям відчувати світ серцем",
      readingWithVisualization: "Читання з візуалізацією",
      readingDescription:
        "дитина читає текст по абзацах, а система генерує зображення до кожного фрагмента. Після прочитання проходить тест на визначення емоцій, представлених у тексті.",
      expressingEmotions: "Вираження емоцій",
      expressingDescription:
        "дитина отримує ситуацію для аналізу та повинна зобразити відповідну емоцію за допомогою камери (наприклад, посміхнутися, висловити здивування чи смуток).",
      decisionMaking: "Прийняття рішень",
      decisionDescription:
        "після прочитання історії дитина обирає, як би вона вчинила в цій ситуації. Це допомагає зрозуміти, як правильно реагувати у повсякденному житті.",
      resultText:
        "У результаті дитина навчається розпізнавати емоції, реагувати на них та взаємодіяти з оточенням впевнено та природно.",
      mobileTitle: "Мобільний застосунок",
      mobileDescription:
        "Навчайтеся зручно будь-де! Наша система доступна як у веб-версії на сайті, так і в мобільному застосунку для смартфонів та планшетів.",
      footerText1: "© 2025 EmoPuzzle. Усі права захищено.",
      footerText2: "Допомагаємо дітям відчувати світ серцем.",
      contactUs:
        "Зв'яжіться з нами: [email@example.com] | [Телефон: +380 ХХХ ХХХ ХХХХ]",
    },
    en: {
      navHowItWorks: "How does it work?",
      navPhone: "Mobile application",
      navStartLearning: "Start learning",
      howItWorks: "How does it work?",
      howItWorksText:
        "Our system helps children with autism, Down syndrome, and other special needs learn to recognize and express emotions in appropriate situations. We use three interactive learning modules:",
      mobileApp: "Mobile application",
      startLearning: "Start learning",
      helpingChildren: "Helping children feel the world with their hearts",
      readingWithVisualization: "Reading with visualization",
      readingDescription:
        "The child reads the text paragraph by paragraph, and the system generates images for each fragment. After reading, the child takes a test to identify the emotions presented in the text.",
      expressingEmotions: "Expressing emotions",
      expressingDescription:
        "The child is given a situation to analyze and has to depict the appropriate emotion using the camera (for example, smile, express surprise or sadness).",
      decisionMaking: "Decision-making",
      decisionDescription:
        "After reading the story, the child chooses what he or she would do in this situation. This helps to understand how to react in everyday life.",
      resultText:
        "As a result, the child learns to recognize emotions, respond to them, and interact with the environment confidently and naturally.",
      mobileTitle: "Mobile application",
      mobileDescription:
        "Study conveniently from anywhere! Our system is available both in a web version on the website and in a mobile application for smartphones and tablets.",
      footerText1: "© 2025 EmoPuzzle. All rights reserved.",
      footerText2: "We help children feel the world with their hearts.",
      contactUs:
        "Contact us: [email@example.com] | [Phone: +380 XXX XXX XXX XXX]",
    },
  };
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEmotionClick = (emotion) => {
    if (emotion === "Смуток") {
      setSelectedEmotion("Смуток");
      navigate("/scene_1");
    } else {
      setSelectedEmotion(emotion);
      setShowModal(true);
    }
  };

  const handleNextClick = () => {
    navigate("/scene_1");
  };

  return (
    <div className="scene-container">
      <nav className="container">
        <img
          src="./images/logo1.png"
          alt=""
          className="logo"
          onClick={() => navigate("/")}
        />
        <ul>
          <li>{translations[language].navHowItWorks}</li>
          <li>{translations[language].navPhone}</li>
          <li>{translations[language].navStartLearning}</li>
        </ul>
        <select className="change-lang" onChange={handleLanguageChange}>
          <option value="ua">UA</option>
          <option value="en">EN</option>
        </select>
      </nav>

      <main className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <h3>1/3</h3>
        <h2>Scene 1: Arriving at the store</h2>
        <div className="first_story">
          <div className="text_block">
            <p>
              The main character – a child named Andriy – comes to the store. He is accompanied by his mother (or another adult) or he goes alone. 
              Andriy (to himself): "I have a shopping list. First I'll grab a basket or a cart. What next?"
            </p>
          </div>

          <div>
            <img src="./images/market.png" className="image_fox image_market" />
          </div>
        </div>
        <h2>
          Question: How did Bella feel when she shared berries with Milo in the rain?
        </h2>

        <div className="variables">
          <div className="left_variant">
            <button
              className={`btn_variant correct_variant ${
                selectedEmotion === "Смуток" ? "green" : ""
              }`}
              onClick={() => handleEmotionClick("Смуток")}
            >
              Take a basket
            </button>
            <button
              className={`btn_variant correct_variant ${
                selectedEmotion === "Смуток" ? "green" : ""
              }`}
              onClick={() => handleEmotionClick("Смуток")}
            >
              Take a cart
            </button>
          </div>
          <div className="right_variant">
            <button
              className={`btn_variant wrong_btn ${
                selectedEmotion === "Злість" ? "red" : ""
              }`}
              onClick={() => handleEmotionClick("Злість")}
            >
              Going to the store without a basket or trolley
            </button>
          </div>
          <div className="variables_btn">
            <button
              type="submit"
              className="btn btn_next btn-primary"
              onClick={() => handleEmotionClick("Смуток")}
            >
              Next
            </button>
          </div>

          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <div className="bg"></div>
                <div className="inmodal">
                  <div className="mb-3-3">
                    <h3 className="modal_h3">
                      Why should this be the answer?
                    </h3>

                    <p>
                      Milo is sad because he loved his little red riding hood very much, and now he can't find it. He looked for it everywhere - on the shelf, under the bed, and even in the toy box, but it was gone. This made him sad and he went outside, his ears and tail down. When we lose something important to us, it can make us sad, just like it happened to Milo.
                    </p>
                  </div>
                  <button
                    className="close_btn"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="variables_btn"></div>
        </div>
      </main>

      <footer className="container footer">
        <div className="footer_text">
          <p>{translations[language].footerText1}</p>
          <p>{translations[language].footerText2}</p>
          <p>{translations[language].contactUs}</p>
        </div>
        <p className="background_text">EmoPuzzle</p>
      </footer>
    </div>
  );
};

export default Scene;