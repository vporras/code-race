Car API
============
This is how the bots interact with the cars in the game.

Car → Bot
-----

* direction to next check point (relative)
    - `GetCheckpointDirection() : float`

* your speed (optional?)
    - `GetSpeed() : float`

* obstacles
   - `GetDistanceToObstacle() : float`
   - `GetDistanceToObstacle(azimuth : float) : float`
   - `GetDistanceToObstacle(azimuth : float, altitude : float) : float`

* flipping
   - `IsFlipped() : boolean`

Bot → Car
------

* steering angle
   - `Turn(angle : float);`
   - `TurnLeft()`
   - `TurnRight()`

* speed
   - `Accelerate()`
   - `Accelerate(power : float)`
   - `Brake()`
   - `Brake(power : float)`

* flipping
   - `UnFlip()`

Game API
============
This is how the client wrapper interacts with the game.

Game → Wrapper
--------------
* `getAICode()`
* `printError(logString : String, stackTrace : String, type : LogType)`
* `printScore(score : int)`
    
Wrapper → Game
--------------
* `testAICode(code : String)`

Server API
==========

* Times are stored in the database with type:

  `:t LapSignature = {"Time": float64, "Email": string, "Name": string, "Code": string}`

* `GET localhost:8080/times` will retrieve the Db.

* `POST localhost:8080/times` will add a time to the database.

* `GET localhost:8080/lookup/:email` will retrive all Db entries with
  email :email.

* `GET localhost:8080/ws` is the websocket connection URL.

* Data written to the websocket will be of the type:
  `{"Leaderboard": [LapSignature]}`

* We currently do not have the need to send any messages to the server.

* To connect to the wsocket using jQuery:
```
    url = `ws://localhost:8080/ws`
    c = new Websocket(url);
```

Tournament API
==============
This is how the server wrapper interacts with the tournament instance of the game.
