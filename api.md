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
This is how the client interacts with the server.


Tournament API
==============
This is how the server wrapper interacts with the tournament instance of the game.
