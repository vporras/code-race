Api for Bots
============


Input
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
   - `Flipped() : boolean`

Output
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

Ideas
-----

* run race with/without other racers
* make test AIs
