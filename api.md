Api for Bots
============


Input
-----

* direction to next check point (relative)
    - `getCheckpointDirection()`

* your speed (optional?)
    - `getSpeed()`

* obstacles
   - `getDistanceToObstacle() : distance`
   - `getDistanceToObstacle(azimuth: angle) : distance`
   - `getDistanceToObstacle(altitude: angle, azimuth: angle) : distance`

Output
------

* steering angle
   - `steer(angle);`
   - `turnLeft();`
   - `turnRight();`

* speed
   - `accelerate()`
   - `accelerate(power: float);`
   - `brake();`



Ideas
-----

* run race with/without other racers
