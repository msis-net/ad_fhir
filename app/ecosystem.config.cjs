module.exports = {
  apps: [
    {
      name: 'adimin4',
      //exec_mode: 'cluster',
      //instances: '1', // またはインスタンスの数
      script: './node_modules/astro/astro.js',
      args: 'start'
    }
  ]
}