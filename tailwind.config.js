export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        keyframes: {
          slidein: {
            from: {
              opacity: "0",
              transform: "translateY(-10px)",
            },
            to: {
              opacity: "1",
              transform: "translateY(0)",
            },
          },
        },
        animation: {
          slidein: "slidein 1s ease 300ms",
        },
      },
    },
    plugins: [],
  };
  