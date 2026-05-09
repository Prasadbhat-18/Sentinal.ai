/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.html"],
  ...{
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-secondary-container": "#0f6d00",
                        "outline": "#849495",
                        "secondary": "#d7ffc5",
                        "surface-container-low": "#1a1b21",
                        "on-primary": "#00363a",
                        "on-error-container": "#ffdad6",
                        "surface-bright": "#38393f",
                        "inverse-primary": "#006970",
                        "on-surface": "#e3e1e9",
                        "inverse-surface": "#e3e1e9",
                        "primary-fixed": "#7df4ff",
                        "tertiary-fixed-dim": "#ebb2ff",
                        "on-secondary": "#053900",
                        "primary": "#dbfcff",
                        "outline-variant": "#3b494b",
                        "on-primary-fixed": "#002022",
                        "on-tertiary-container": "#9900d1",
                        "tertiary": "#fff2fe",
                        "on-background": "#e3e1e9",
                        "primary-container": "#00f0ff",
                        "surface-container-high": "#292a2f",
                        "error-container": "#93000a",
                        "surface-container-highest": "#34343a",
                        "surface-variant": "#34343a",
                        "surface-container-lowest": "#0d0e13",
                        "on-secondary-fixed-variant": "#095300",
                        "secondary-fixed": "#79ff5b",
                        "on-error": "#690005",
                        "background": "#121318",
                        "on-surface-variant": "#b9cacb",
                        "on-tertiary": "#520072",
                        "on-primary-fixed-variant": "#004f54",
                        "surface-tint": "#00dbe9",
                        "on-secondary-fixed": "#022100",
                        "on-tertiary-fixed-variant": "#74009f",
                        "on-primary-container": "#006970",
                        "surface-dim": "#121318",
                        "on-tertiary-fixed": "#320047",
                        "secondary-container": "#2ff801",
                        "inverse-on-surface": "#2f3036",
                        "primary-fixed-dim": "#00dbe9",
                        "tertiary-fixed": "#f8d8ff",
                        "error": "#ffb4ab",
                        "surface": "#121318",
                        "surface-container": "#1e1f25",
                        "tertiary-container": "#f4ccff",
                        "secondary-fixed-dim": "#2ae500"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "gutter": "16px",
                        "margin-desktop": "48px",
                        "container-max": "1440px",
                        "margin-mobile": "16px",
                        "unit": "4px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Space Grotesk", "sans-serif"],
                        "label-md": ["JetBrains Mono", "monospace"],
                        "headline-md": ["Space Grotesk", "sans-serif"],
                        "headline-sm": ["Space Grotesk", "sans-serif"],
                        "label-sm": ["JetBrains Mono", "monospace"],
                        "headline-lg-mobile": ["Space Grotesk", "sans-serif"],
                        "body-sm": ["Geist", "sans-serif"],
                        "body-md": ["Geist", "sans-serif"],
                        "body-lg": ["Geist", "sans-serif"]
                    },
                    "fontSize": {
                        "headline-lg": ["42px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-md": ["14px", { "lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500" }],
                        "headline-md": ["28px", { "lineHeight": "1.2", "fontWeight": "600" }],
                        "headline-sm": ["20px", { "lineHeight": "1.2", "fontWeight": "600" }],
                        "label-sm": ["12px", { "lineHeight": "1", "letterSpacing": "0.1em", "fontWeight": "500" }],
                        "headline-lg-mobile": ["32px", { "lineHeight": "1.1", "fontWeight": "700" }],
                        "body-sm": ["14px", { "lineHeight": "1.4", "fontWeight": "400" }],
                        "body-md": ["16px", { "lineHeight": "1.5", "fontWeight": "400" }],
                        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }]
                    }
                }
            }
        }
};