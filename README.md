# Falcon Social app

NodeJS, AngularJS, Socket.io

The application does not uses a database, it communicates with jsonblob.com through it's [API](https://jsonblob.com/api). It also makes use a lot of [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) in order to avoid make a lot of requests to the "server" (assuming there is one).


# Running it

Download the app, go to the folder, execute:

```npm start```

Then browse to ```http://localhost:3000```

The node_modules is within the project, so no need to download dependencies.

# Where is the CRUD ?

```
routes/rest.js
```

## Why not bootstrap?

I have no idea i regreted this half way through.

## Why Express?

It's simpler for it's ease of routing, i was going to do it without it based on what's [here](https://github.com/ssotomayor/nodejs-no-express), but my lack of time lately avoids me to play with code much.

## Why no mongodb ?

It wasn't in the specs to use mongo, it could be changed, but since jsonblob has an API, why not use it?

## What would you add to this if it was a prod app?

A lot of stuff, testing (Karma, Mocha), Gulp, a better design for mobiles, polishing code, profile testing.

### I do not like your code.
Ok...


![ok](http://mashable.com/wp-content/uploads/2013/07/Dr.-Who.gif)
