So you want to build trump money maker huh?
Well get ready for a roller coaster of emotional distress and ecstasy.

You have already checked it out or cloned it and you're looking at the
code like wtf, I need to change all of this.


*Pop over to gulp.js and readup bro!*



## Getting it Running


The *watch* task will probably handle everything you need as it is a live reloading server.
If for some reason you needed the base tasks, go for it!
The common situation that might require some actual fiddling would be if you are adding media for
the resources directory or actually changing some directory structure.


'That's great you say, but I'm just sitting in the terminal.'
When you serve, it will log what the address is, but for now it is hosted on
localhost:LEET

## Structural Layout

test - has tests, duh
src - has everything else

Running the server will constantly update the 'build' directory, which is actively being served.
images and media just get moved into 'build'

Starting with 'entrypoint.jsx' everything involved will be grabbed and transpiled into some regular JS for the browser.


Redux has some good docs if you don't know how it works, but a unfairly simply flow would be:
 State (made of models) -> Reducers -> Containers -> Components

 Actions will trigger the change in state and start the process over again.


## Development

There is linting and a small suite of unit tests, these are configured to run through the npm run task.

You can simply write `npm run` with [test|lint|build|watch] to access each action.

