import React, { useEffect, useRef } from "react";

const AutoScrollSection = ({ title, data, customImageClass }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    content.innerHTML += content.innerHTML;

    const animate = () => {
      if (!isPaused.current) {
        container.scrollLeft += 1;
        if (container.scrollLeft >= content.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const handleMouseEnter = () => {
    isPaused.current = true;
  };

  const handleMouseLeave = () => {
    isPaused.current = false;
  };

  return (
    <section className="w-full my-8 px-4">
      <div className="bg-green-800 text-white text-center py-3 rounded-lg text-xl font-bold mb-4">{title}</div>
      <div
        ref={containerRef}
        className="overflow-hidden whitespace-nowrap scrollbar-hide"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={contentRef} className="flex gap-4 w-max">
          {data.map((item, i) => (
            <div
              key={i}
              className="w-72 flex-shrink-0 bg-white shadow-lg p-4 rounded-lg text-center transition-transform duration-500 hover:scale-105"
            >
              <img
                src={item.img}
                alt={item.title}
                className={
                  customImageClass ||
                  "w-full h-40 object-cover rounded-lg"
                }
              />
              <h4 className="mt-2 text-lg font-bold bg-green-700 text-white py-1 rounded-lg">
                {item.title}
              </h4>
              <p className="mt-1 bg-green-100 p-2 rounded-lg">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AutoScrollSection;
