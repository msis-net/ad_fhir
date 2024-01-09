module.exports = {
    apps : [{
      name   : "adminlte",
      script: "./package.json",
      args: 'astro dev',
      error_file: ".error.log",
      out_file: ".app.log",
    }]
  }