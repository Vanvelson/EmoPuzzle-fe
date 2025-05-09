import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./camera.css";

const Camera = () => {
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
      scene: "Сцена",
      sceneTitle: "Солодкий сюрприз",
      question: "Питання: Що відчувала Белла, коли ділилася ягодами з Міло під дощем?",
      takeBasket: "Взяти кошик",
      takeCart: "Взяти візок",
      goWithoutBasket: "Йти в магазин без кошика чи візка",
      next: "Далі",
      whyThisAnswer: "Чому має бути саме ця відповідь?",
      modalText:
        "Міло відчуває смуток, бо він дуже любив свою червону шапочку, а тепер не може її знайти. Він шукав її всюди – на полиці, під ліжком і навіть у скриньці з іграшками, але вона зникла. Через це він засмутився і вийшов надвір, опустивши вушка й хвостик. Коли ми втрачаємо щось важливе для нас, це може зробити нас сумними, так само, як сталося з Міло.",
      close: "Закрити",
      back: "Назад",
      sceneDescription: "Прочитай ситуацію та покажи емоцію",
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
      scene: "Scene",
      sceneTitle: "A Sweet Surprise",
      question: "Question: What did Bella feel when sharing berries with Milo in the rain?",
      takeBasket: "Take a basket",
      takeCart: "Take a cart",
      goWithoutBasket: "Go to the store without a basket or cart",
      next: "Next",
      whyThisAnswer: "Why should this be the answer?",
      modalText:
        "Milo feels sad because he loved his red cap very much, and now he can't find it. He looked everywhere – on the shelf, under the bed, and even in the toy box, but it was gone. Because of this, he became sad and went outside, lowering his ears and tail. When we lose something important to us, it can make us sad, just like what happened to Milo.",
      close: "Close",
      back: "Back",
      sceneDescription: "Read the situation and show the emotion",
    },
  };

  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef(null);
  const [answer, setAnswer] = useState("incorrect");

  let cameraBorderColor;

  if (answer === "default") {
    cameraBorderColor = "#C5C5C5";
  } else if (answer === "correct") {
    cameraBorderColor = "#83DA40";
  } else {
    cameraBorderColor = "#E85E40";
  }

  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const handleEmotionClick = (emotion) => {
    if (emotion === "Смуток") {
      setSelectedEmotion("Смуток");
      navigate("/scene_1");
    } else {
      setSelectedEmotion(emotion);
      setShowModal(true);
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="scene-container">
      <nav className="container">
        <img src="./images/logo1.png" alt="" className="logo" onClick={() => navigate("/")}/>
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
        <h2>{translations[language].sceneTitle}</h2>
        <p className="scene-description">{translations[language].sceneDescription}</p>

        <div className="camera_feed_container" style={{ borderColor: cameraBorderColor }}>
          <video ref={videoRef} autoPlay muted className="camera_video" />
        </div>

        

        <footer className="container footer">
          <div className="footer_text">
            <p>{translations[language].footerText1}</p>
            <p>{translations[language].footerText2}</p>
            <p>{translations[language].contactUs}</p>
          </div>
          <p className="background_text">EmoPuzzle</p>
        </footer>
      </main>
    </div>
  );
};

export default Camera;