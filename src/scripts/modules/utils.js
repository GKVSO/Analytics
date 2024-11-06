export function cubicBezier(p1x, p1y, p2x, p2y) {
  // Полином Бернштейна для кривой Безье
  function bezier(t, p0, p1, p2, p3) {
    const u = 1 - t;
    return (u * u * u * p0) +
           (3 * u * u * t * p1) +
           (3 * u * t * t * p2) +
           (t * t * t * p3);
  }

  return function(progress) {
    return bezier(progress, 0, p1y, p2y, 1); // Используем только Y координаты для анимации
  };
}

export function executeAtResolution(resolution, callback) {
  const currentResolution = window.innerWidth;

  if(currentResolution <= resolution) {
    callback()
  }
}

export function setEventHandler(arrEl, arrParams) {
  for(const el of arrEl) {
    for (const {event, handler} of arrParams) {
      el.addEventListener(event, () => {
        handler(el); 
      })
    }
  }
}
