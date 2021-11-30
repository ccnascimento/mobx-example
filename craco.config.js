const path = require("path");

module.exports = () => {
  return {
    webpack: {
      alias: {
        environment: path.join(
          __dirname,
          "src",
          "environments",
          process.env.CLIENT_ENV || "production"
        ),
      },
    },
    style: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
  };
};
