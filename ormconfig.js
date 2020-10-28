let host, port, username, password, database;
if(process.env.DATABASE_URL) {
    url = new URL(process.env.DATABASE_URL);
    host = url.hostname;
    port = url.port;
    username = url.username;
    password = url.password;
    database = url.pathname.substring(1);
}
else {
    host = "localhost";
    port = 5432;
    username = "postgres";
    password = "postgres";
    database = "concord-db";
}

module.exports = {
    "type": "postgres",
    "host": host,
    "port": port,
    "username": username,
    "password": password,
    "database": database,
    "synchronize": false,
    "entities": ["dist/services/template/entity/**/*.js"],
    "migrations": ["dist/services/template/migrations/*.js"],
    "subscribers": ["dist/services/template/subscriber/**/*.js"],
    "cli": {
        "entitiesDir": "src/services/template/entity",
        "migrationsDir": "src/services/template/migrations",
        "subscribersDir": "src/services/template/subscriber"
    },
    "extras": {
        "ssl": true
    }
  }