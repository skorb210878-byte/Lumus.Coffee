// ============================================================================
// Плавное появление секций при прокрутке
// ----------------------------------------------------------------------------
// Используем IntersectionObserver — браузер сам следит, когда секция
// появляется во вьюпорте, и не нужно вручную слушать событие scroll
// и каждый раз вычислять координаты (это было бы медленнее и нагружало
// бы процессор при каждом пикселе прокрутки).
// ============================================================================

const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1,
  }
);

sections.forEach((section) => observer.observe(section));

// ============================================================================
// Огонёк "Lumos" — мягкое свечение, следующее за курсором мыши.
// Включается только когда устройство реально сообщает о движении мыши
// (на тач-экранах mousemove не срабатывает, элемент остаётся скрытым).
// ============================================================================

const wandGlow = document.getElementById('wandGlow');

if (wandGlow && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', (event) => {
    wandGlow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    wandGlow.classList.add('is-active');
  });
}

// ============================================================================
// Звёздное небо в hero — точки со случайным положением, размером и
// задержкой мерцания, как зачарованный потолок Большого зала
// ============================================================================

const starsContainer = document.getElementById('heroStars');

if (starsContainer) {
  const STAR_COUNT = 60;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('span');
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.opacity = String(0.2 + Math.random() * 0.6);
    fragment.appendChild(star);
  }

  starsContainer.appendChild(fragment);
}

// ============================================================================
// Волшебная пыль — мелкие тусклые искры, медленно всплывающие и
// смещающиеся в сторону, с разной скоростью и задержкой, чтобы не
// двигались синхронно
// ============================================================================

const dustContainer = document.getElementById('heroDust');

if (dustContainer) {
  const DUST_COUNT = 18;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < DUST_COUNT; i++) {
    const mote = document.createElement('span');
    mote.style.left = `${Math.random() * 100}%`;
    mote.style.top = `${30 + Math.random() * 65}%`;
    mote.style.setProperty('--dust-dx', `${(Math.random() * 60 - 30).toFixed(0)}px`);
    mote.style.setProperty('--dust-peak', (0.2 + Math.random() * 0.25).toFixed(2));
    mote.style.animationDuration = `${14 + Math.random() * 14}s`;
    mote.style.animationDelay = `${Math.random() * 12}s`;
    fragment.appendChild(mote);
  }

  dustContainer.appendChild(fragment);
}

// ============================================================================
// Свечи в hero — всего 3, в шахматном (зигзагом) порядке: x чередуется
// между двумя значениями, пока y равномерно растёт сверху вниз — так
// между свечами остаётся большое расстояние и по горизонтали, и по
// вертикали. Все одного размера. Коридор между текстом (слева) и
// окном (справа), ниже шапки сайта.
// ============================================================================

const candlesContainer = document.getElementById('heroCandles');

if (candlesContainer) {
  const CANDLE_SCALE = 1.1;

  const positions = [
    { x: 60, y: 16 },
    { x: 74, y: 50 },
    { x: 60, y: 84 },
  ];

  const fragment = document.createDocumentFragment();

  positions.forEach(({ x, y }, i) => {
    const delay = (i * 1.3).toFixed(2);
    const duration = (8 + i).toFixed(2);

    const wrap = document.createElement('span');
    wrap.className = 'candle-wrap';
    wrap.style.left = `${x}%`;
    wrap.style.top = `${y}%`;
    wrap.style.transform = `scale(${CANDLE_SCALE})`;

    const candle = document.createElement('span');
    candle.className = 'candle';
    candle.style.animationDelay = `${delay}s`;
    candle.style.animationDuration = `${duration}s`;

    const glow = document.createElement('span');
    glow.className = 'candle__glow';

    const wick = document.createElement('span');
    wick.className = 'candle__wick';

    const flame = document.createElement('span');
    flame.className = 'candle__flame';
    flame.style.animationDelay = `${delay}s`;

    candle.append(glow, wick, flame);
    wrap.appendChild(candle);
    fragment.appendChild(wrap);
  });

  candlesContainer.appendChild(fragment);
}
