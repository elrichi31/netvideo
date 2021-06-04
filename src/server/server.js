import express from "express"
import dotenv from "dotenv"
import webpack from "webpack"
import React from 'react';
import helmet from 'helmet'
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {StaticRouter} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import reducer from '../frontend/reducers'
import serverRoutes from '../frontend/routes/serverRoutes'
import getManifest from './getManifest'
import cookieParser from 'cookie-parser'
import boom from '@hapi/boom'
import passport from 'passport'
import axios from 'axios'



dotenv.config()
const {ENV, PORT} = process.env
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

require("./utils/auth/strategies/basic")

if (ENV === 'development') {
    console.log('Development config');
    const webpackConfig = require('../../webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);
    const { publicPath } = webpackConfig.output;
    const serverConfig = { serverSideRender: true, publicPath };
  
    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));
  
} else {
    app.use((req, res, next) =>{
        if(!req.hashManifest) req.hashManifest = getManifest()
        next()
    })
    app.use(express.static(`${__dirname}/public`))
    app.use(helmet())
    app.use(helmet.permittedCrossDomainPolicies())
}

  const setResponse = (html, preloadedState, manifest) => {
    const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css'
    const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js'
    const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js' 
    return (`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <link rel="stylesheet" href="${mainStyles}" type="text/css">
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <div id="app">${html}</div>
                <script>
                    window.__PRELOADED_STATE__ =${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
                </script>
                <script src="${mainBuild}" type="text/javascript"></script>
                <script src="${vendorBuild}" type="text/javascript"></script>                
            </body>
        </html>`
      )
  }
  const renderApp = async (req, res) => {
    let initialState;
    
    const {token, email, name, id} = req.cookies;
    try{
      let movieList = await axios({
        url: `${process.env.API_URL}/api/movies`,
        headers: {Authorization: `Bearer ${token}`},
        method: 'get',
      })
      let myMovieList = await axios({
        url: `${process.env.API_URL}/api/user-movies`,
        headers: {Authorization: `Bearer ${token}`},
        method: 'get',
      })
      myMovieList = myMovieList.data.data   
      movieList = movieList.data.data
      let myList = []
      myMovieList.forEach(userMovie => {movieList.forEach(movie => {if (movie._id == userMovie.movieId){myList.push(movie)}})})
      initialState = {
        user: {
          id, name, email
        },
        myList,
        trends: movieList.filter(movie => movie.contentRating == 'PG' && movie._id),
        originals: movieList.filter(movie => movie.contentRating == 'G' && movie._id),
        searchResults: []
      }
    } catch(err){
      initialState = {
        user: {},
        myList: [],
        trends: [],
        originals:[],
        searchResults: []
      }
    }
    const store = createStore(reducer, initialState);
    const preloadedState = store.getState()
    const isLogged = (initialState.user.id)
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                { renderRoutes(serverRoutes(isLogged))}
            </StaticRouter>
        </Provider>
    )
    res.removeHeader("x-powered-by")
    res.send(setResponse(html, preloadedState, req.hashManifest))
}



app.post("/auth/sign-in", async function(req, res, next) {
    passport.authenticate("basic", {session: false}, function(error, data) {
      try {
        if (error || !data) {
          next(boom.unauthorized());
        }
  
        req.login(data, { session: false }, async function(err) {
          if (err) {
            next(err);
          }
          const { token, ...user } = data;  
          res.cookie("token", token, {
            httpOnly: !(ENV==='development'),
            secure: !(ENV==='development')
          });
  
          res.status(200).json(user);
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });
  
app.post("/auth/sign-up", async function(req, res, next) {
    const { body: user } = req;
  
    try {
      const userData = await axios({
        url: `${process.env.API_URL}/api/auth/sign-up`,
        method: "post",
        data: {
          'email': user.email,
          'name': user.name,
          'password': user.password
        }
      });
  
      res.status(201).json({
        name: req.body.name,
        email: req.body.email,
        id: userData.data.id
      })
    } catch (error) {
      next(error);
    }
  });

app.post("/api/user-movies", async function(req, res, next){
  try{
    axios({
      url: `${process.env.API_URL}/api/user-movies`,
      method: 'POST',
      headers: {Authorization: `Bearer ${req.body.token}`},
      data: {
        'userId': req.body.userId1,
        'movieId': req.body._id
      }
    }).then(data => console.log(data.data))
    res.status(201).json({
      id: req.body.id,
      cover : req.body.cover,
      year: req.body.year,
      contentRating: req.body.contentRating,
      duration: req.body.duration,
      isList: req.body.isList,
      _id: req.body._id 
    })
  }
  catch (err){
    next(err)
  }
})

app.post("/api/delete-movie", async function (req, res, next) {
  try{
    let userData = await axios({
      url: `${process.env.API_URL}/api/user-movies`,
      headers: {Authorization: `Bearer ${req.cookies.token}`},
      method: 'get',
    })
    userData = userData.data.data
    let totalData = ''
    userData.forEach(data => {if(data.movieId === req.body.id){totalData = data}})
    axios({
      url: `${process.env.API_URL}/api/user-movies/${totalData._id}`,
      method: 'DELETE',
      headers: {Authorization: `Bearer ${req.cookies.token}`},
    }).then(data => console.log(data.data))
    res.status(201).json(req.body.id)
  }catch(err){
    next(err)
  }
})

app.get('*', renderApp)

app.listen(PORT, (err) => {
    if (err) console.log(err)
    else console.log(`Server on port ${PORT}`)
})