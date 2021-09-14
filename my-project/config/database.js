module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        // client: 'sqlite',
        // filename: env('DATABASE_FILENAME', '.tmp/data.db'),
        uri: 'mongodb+srv://dohyun:rlaehgus1@cluster0.rf0jv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
      },
      options: {
        // useNullAsDefault: true,
        ssl: true,
      },
    },
  },
});
