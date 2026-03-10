module.exports = {
  apps: [
    {
      name: "PERFUME-REACT",
      script: "serve",
      args: "-s build -l 80",
      cwd: "./",
      watch: false,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
