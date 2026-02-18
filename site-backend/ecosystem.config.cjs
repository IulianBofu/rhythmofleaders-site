module.exports = {
  apps: [
    {
      name: 'rhythmofleaders-api',
      script: 'index.js',
      cwd: '/var/www/rhythmofleaders/site-backend',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
