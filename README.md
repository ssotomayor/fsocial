# Falcon Social app

NodeJS, AngularJS, Socket.io

The application does not uses a database, it communicates with jsonblob.com through it's [API](https://jsonblob.com/api).

# Running it

Download the app, go to the folder, execute:

```npm start```

Then browse to ```http://localhost:3000```

The node_modules is within the project, so no need to download dependencies.

# Where is the CRUD ?

```
routes/rest.js
```

# Why not bootstrap?

I have no idea i regreted this half way through.

# Why Express?

It's simpler for it's ease of routing, i was going to do it without it based on what's [here](https://github.com/ssotomayor/nodejs-no-express), but my lack of time lately avoids me to play with code much.

# Why no mongodb ?

It wasn't in the specs to use mongo, it could be changed, but since jsonblob has an API, why not use it?

# I do not like your code.

Ok...
![ok](http://mashable.com/wp-content/uploads/2013/07/Dr.-Who.gif)
