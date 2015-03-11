Project Plan
============

Modules
-------
- Game
  * Car
    + Car API
    + Car Artwork
    + Multiple Cars
  * Environment
    + Path
    + Terrain
  * Camera
    + Follow individual cars

- Wrapper
  * Code Entry
  * Testing
  * Saving Data
    + Save locally
    + Send to server
  
- Tournament Server
  * Database
    + Keep track of users, code and times from a round
  * Testing
    + Run race with multiple cars

Timeline
--------
### Week 5
Work on plan

### Week 6
Aim for MVP with timing and obstacle detection

### Week 7
Testing and prep for next meeting

### Week 8
Write progress report

### Vacation
- Continue work on modules
- Get server up and running
- Finalize environment (terrain/path)

### Week 0 TT
Integrate modules

### Week 1
Testing and report

### Week 2
Work on final presentation

Goals by Week 8
---------------
+ User will be able to submit the code for the bot, under an email address
+ The bots will be timed going around a track with checkpoints
+ The results will be displayed to the user, and sent to a server
+ The server will display the times on a leaderboard
+ We will have multiple sample AIs to test these features
+ The Car API will have obstacle detection

Goals by Week 0
---------------
+ Advanced timing with multiple checkpoints
 - start/restart timing after code submission
+ Rescaled map
+ New car artwork
+ Code submission
+ Formatted leaderboard

Responsibilities
----------------
### Ilya - Wrapper
+ bot editing
+ code submission
+ select camera
+ car artwork

### John - Environment
+ path
+ terrain
+ timing

### Joshua and Kevin - Server
+ provide API to client wrappers
+ collect code
+ run tournaments
+ display results

### Victor - Car API
+ movement
+ obstacle detection
+ multiple cars for tournament
+ sample AIs
+ tournament
