import dotenv from 'dotenv'
dotenv.config()

const EnvVars = {
  NodeEnvs: process.env.NODE_ENV ?? 'development',
  Port: process.env.PORT ?? 0,
  Jwt: {
    Secret: process.env.JWT_SECRET ?? '',
    Exp: process.env.JWT_EXP ?? ''
  },
  Mongodb: {
    uri: `${process.env.MONGOD_URI}` ?? '',
    DbName: process.env.DB_NAME ?? '',
    DbUser: process.env.DB_USER ?? '',
    DbPass: process.env.DB_PASS ?? ''
  },
  MySalt: process.env.MY_SECRET_SALT ?? ''
}

export default EnvVars
