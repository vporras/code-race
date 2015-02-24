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



Ideas
-----

* run race with/without other racers
* make test AIs
