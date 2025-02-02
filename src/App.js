import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';
import './i18n';
import 'leaflet/dist/leaflet.css';

// Создаем кастомную иконку для маркеров
const customIcon = new L.Icon({
  iconUrl: '/icons/marker-icon.webp',
  iconSize: [38, 38],
  iconAnchor: [22, 38],
  popupAnchor: [-3, -38],
});

// Компонент для содержимого Popup с возможностью листания
const PopupContent = ({ place }) => {
  const [currentPart, setCurrentPart] = useState(0);
  const wordsPerPart = 30; // Количество слов в одной части

  // Разбиваем текст на части по словам
  const words = place.description.split(' ');
  const textParts = [];
  for (let i = 0; i < words.length; i += wordsPerPart) {
    textParts.push(words.slice(i, i + wordsPerPart).join(' '));
  }

  const handleNext = () => {
    if (currentPart < textParts.length - 1) {
      setCurrentPart(currentPart + 1);
    }
  };

  const handlePrev = () => {
    if (currentPart > 0) {
      setCurrentPart(currentPart - 1);
    }
  };

  return (
    <div>
      <strong>{place.name}</strong><br />
      <img src={place.imageUrl} alt={place.name} style={{ width: '100%', height: 'auto' }} /><br />
      <p>{textParts[currentPart]}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handlePrev} disabled={currentPart === 0}>
          Назад
        </button>
        <button onClick={handleNext} disabled={currentPart === textParts.length - 1}>
          Далее
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const places = [
    {
      name: t('Красная площадь'),
      position: [51.729854, 36.192476],
      description: t('Красная площадь - главная площадь областного центра. Площадь была образована в 1782 году, когда Екатерина 2 утвердила генеральный план застройки Курска. Этим событиям предшествовал большой пожар 1781 года, уничтоживший все здания, расположенные на этом месте. Свое название площадь также получила в конце XVIII века, когда слово красная означало красивая. Говорят, что именно Екатерина II захотела, чтобы главная площадь Курска называлась именно так. В советское время считалось, что название Красный произошло из-за пожара в 1781 году, эта версия была официальной.'),
      imageUrl: '/images/Red Square.jpg'
    },
    {
      name: t('Знаменский собор'),
      position: [51.727663, 36.192593],
      description: t('Знаменский собор стоит в самом центре города, на территории Знаменского монастыря, созданного в 1597-1613 годах курянами в честь освобождения Курска от польского Гетмана Жолкевского, захватившего и разорившего город. Храм настолько значителен и величественен, что многие сравнивают его с храмом Христа Спасителя в Москве.'),
      imageUrl: '/images/Znamensky Cathedral.jpg'
    },
    {
      name: t('Театральная площадь'),
      position: [51.738963, 36.191674],
      description: t('Конец 1940-х годов. История строительства здания театра на площади была, пожалуй, самой насыщенной различными коллизиями: длительная дискуссия, всесоюзный конкурс, множество проектов. Для будущего Дома Советов в сентябре 1935 года был объявлен только местный конкурс, на него было представлено пять проектов. Проект самого молодого участника, недавнего выпускника Ленинградского института инженеров коммунального строительства Евгения Ивановича Громаковского, получил первую премию и был принят к реализации. Курская драматическая сцена является одной из старейших в России - она была основана в 1792 году. За время своего существования театр сменил несколько зданий. Сегодня он располагается в здании, построенном в 1983 году. Имя А. С. Пушкина было присвоено сцене в 1937 году в честь 100-летия поэта. На сегодняшний день спектакли проходят в больших и малых залах, репертуар состоит из классических произведений и современных пьес.'),
      imageUrl: '/images/Theatre square.jpg'
    },
    {
      name: t('Мемориальный комплекс Курская дуга'),
      position: [51.786646, 36.171089],
      description: t('На северном выезде из Курска, на бульваре протяженностью 600 метров, находится мемориал, посвященный одному из решающих сражений Великой Отечественной войны. Комплекс был построен в 1998 году к 55-летию победы советских войск в Курской битве. \n Мемориальный комплекс включает в себя Триумфальную арку, церковь Святого Георгия Победоносца, памятник Георгию Жукову, братскую могилу и аллею военной техники. Триумфальная арка высотой 24 метра была возведена в 2000 году. Арку венчает скульптура Георгия Победоносца, поражающего копьем змею. С четырех сторон у подножия памятника расположены скульптуры русских воинов разных эпох. На стенах арки размещены тексты о русском воинском духе. Храм святого великомученика Георгия Победоносца был построен по проекту курских архитекторов Валерия Михайлова и Павла Пахомова в 2008 году. Высота кирпичного трехъярусного храма составляет 47 метров. Храм увенчан позолоченным куполом, на звоннице установлены девять бронзовых колоколов. Рядом с храмом находится около семи тысяч мраморных табличек с именами русских воинов, погибших на Курской дуге.В мемориальном комплексе находится один из немногих памятников четырехкратному Герою Советского Союза Георгию Жукову.\n Бронзовая скульптура военачальника была изготовлена по оригинальным фотографиям из личного архива семьи Жуковых. В комплексе Курская дуга представлены образцы военной техники 1941-1945 годов выпуска. Здесь представлены легендарные Катюши, танк Т-34, а также ствольная артиллерия и самоходные артиллерийские установки.На братской могиле установлено гранитное надгробие Неизвестный солдат Курской земли, здесь похоронены расстрелянные нацистами красноармейцы - они были обнаружены во время строительства комплекса. В память о героях Великой Отечественной войны на мемориале Курская дуга горит Вечный огонь.'),
      imageUrl: '/images/Memorial complex Kursk Bulge.jpg'
    }
  ];

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '10px' }}>
        <img
          src="/flags/russia.jpg"
          alt="Русский"
          style={{ width: '50px', cursor: 'pointer', marginRight: '10px' }}
          onClick={() => changeLanguage('ru')}
        />
        <img
          src="/flags/uk.jpg"
          alt="English"
          style={{ width: '50px', cursor: 'pointer' }}
          onClick={() => changeLanguage('en')}
        />
      </div>
      
      <MapContainer center={[51.7308, 36.1939]} zoom={13} style={{ height: '100vh', width: '100%' }} attributionControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.map((place, idx) => (
          <Marker key={idx} position={place.position} icon={customIcon}>
            <Popup maxWidth={300} autoPan={true} keepInView={true}>
              <PopupContent place={place} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default App;
