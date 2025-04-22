// inLineSvg.jsx
import React, { useEffect, useRef, useState } from "react";

const InlineSVG = ({
  src,
  id,
  className,
  style,
  onLoad,
  width = "450",
  height = "400",
}) => {
  const ref = useRef();
  const [svgContent, setSvgContent] = useState(null);
  const [loadAttempted, setLoadAttempted] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch(src)
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(text, "image/svg+xml");
        const svg = parsed.querySelector("svg");


        if (svg && isMounted) {
          if (id) svg.id = id;
          if (className) svg.setAttribute("class", className);

          // Set the size explicitly
          svg.setAttribute("width", width);
          svg.setAttribute("height", height);

          // Always ensure viewBox is set for proper scaling
          if (!svg.getAttribute("viewBox")) {
            const originalWidth = svg.width?.baseVal?.value || 700;
            const originalHeight = svg.height?.baseVal?.value || 500;
            svg.setAttribute(
              "viewBox",
              `0 0 ${originalWidth} ${originalHeight}`
            );
          }

          svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

          // Apply custom style if provided
          if (style) {
            const currentStyle = svg.getAttribute("style") || "";
            const styleString =
              typeof style === "object"
                ? Object.entries(style)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join("; ")
                : style;
            svg.setAttribute("style", `${currentStyle}; ${styleString}`);
          }

          setSvgContent(svg.outerHTML);
          setLoadAttempted(true);
        }
      })
      .catch((error) => {
        console.error("Error loading SVG:", error);
        setLoadAttempted(true); // Mark as attempted even if failed
      });

    return () => {
      isMounted = false;
    };
  }, [src, id, className, style, width, height]);

  // Call onLoad after the SVG content has been set and the component has re-rendered
  useEffect(() => {
    if (svgContent && ref.current && onLoad && loadAttempted) {
      // Give React time to render the SVG content
      const timer = setTimeout(() => {
        if (ref.current) {
          const svgElement = ref.current.querySelector("svg");
          if (svgElement) {
            onLoad(svgElement);
          } else {
            console.warn("No SVG element found in the rendered content");
            onLoad(null); // Call onLoad anyway to progress the loading state
          }
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [svgContent, onLoad, loadAttempted]);

  return (
    <div ref={ref} dangerouslySetInnerHTML={{ __html: svgContent || "" }} />
  );
};

export default InlineSVG;
