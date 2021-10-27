require('dotenv').config()
const dir = process.env.NODE_DIST === 'dev' ? 'src' : 'dist'

module.exports = [
  {
    name: 'default',

    // -- POSTGRES DB * remove this line *
    type: 'postgres',
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,

    logging: false,

    migrations: [`./${dir}/shared/infra/typeorm/migrations/*.{ts,js}`],

    entities: [`./${dir}/modules/**/entities/*.{ts,js}`],
    factories: [`./${dir}/shared/infra/typeorm/factories/*.{ts,js}`],
    seeds: [`./${dir}/shared/infra/typeorm/seeds/*.{ts,js}`],

    cli: {
      migrationsDir: `./${dir}/shared/infra/typeorm/migrations`
    }
  },

  // -- MONGODB * remove this line *
  // {
    // name: 'mongo',
    // type: 'mongodb',

    // host: 'localhost',
    // port: process.env.MONGODB_PORT,
    // database: process.env.MONGODB_DATABASE,

    // logging: false,

    // useUnifiedTopology: true,

    // entities: ['./src/modules/**/schemas/*.{ts,js}']
  // }
]