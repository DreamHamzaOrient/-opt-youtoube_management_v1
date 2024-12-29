module.exports = {
  apps: [{
    name: "youtube-manager",
    script: "serve",
    args: "-s dist",
    env: {
      NODE_ENV: "production"
    }
  }]
}
