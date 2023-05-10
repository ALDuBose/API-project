const { sequelize } = require("./db/models");

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA);
  }
});

/*

psql -h dpg-chdca2ndvk4lclpl95eg-a -p 5432 -U app_academy_projects_xzq6_user -d App-Academy-Projects

once you enter pw enter \d to view database
view data for a specific table by running the following command:
\d <table-name>

*/
