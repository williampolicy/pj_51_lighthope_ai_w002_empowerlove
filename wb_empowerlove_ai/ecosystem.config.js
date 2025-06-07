module.exports = {
  apps: [{
    name: 'empowerlove-ai',
    script: 'npm',
    args: 'start',
    cwd: '/home/kangxiaowen/code_lh_server/code_lh_pj_ai/pj_51_lighthope_ai_w002_empowerlove/wb_empowerlove_ai',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true
  }]
}
