module.exports = {
  hooks: {
    "pre-push": "yarn run lint:format:check && yarn run test:ci:all",
  },
};
