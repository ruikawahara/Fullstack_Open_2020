# Full Stack Open 2020 - Part 3

## Link to Web Application
https://vast-hamlet-86517.herokuapp.com/

## Overview
This segment is a copy of part 3 exercise. It was merged to this master repository for record purpose. 
Stand alone part 3 repository is [this]https://github.com/ruikawahara/part3).

Since this segment is archive, there is no gurantee that this repo will run. It may cuase an issue with heroku. Furthermore, path location for "build:ui" and "deploy:full" is different. If deploying using this archive, make sure to adjust any path you find. 

## Index:
1. Section A - Node.js, and Express (ex 3.1 - 3.8)
2. Section B - Deploying App to Internet (ex 3.9 - 3.11)
3. Section C - Saving Data to MongoDB (ex 3.12 - 3.18)
4. Section D - Validation and ESLint (ex 3.19 - 3.22)

## Misc. Notes:
* Completed part A before creating this new repo. If you wish to see the progress, please check commit history on master repository.

* For front-end, I used __Phonebook__ exercise, which is my personal solution, from part 2 of this course. 

* For ESLint excersie, indentation restriction is not as strict as examples given. This is because my VS Code has __Prettier__ code formatting extension, which automatically adjusts its own indentation for better readability. 

* For ESLint exercise, ```.eslintrc.js``` setting is based mostly on examples provided on Part 3D. However, default setting is not modified if it was not touched on exercise (e.g. version number). Furthermore, setting for "unix" is changed to "windows" since my development environment is Windows

* You may see more than usual amount of comments in this exercise. Since impelmentation of backend differes significantly throughout the section, I have left the previous implementation as a comment. This is so that the commented out parts can be used to run the exercises from previous sections.

* Since it was not in the requirements, my front end implementation will count space as additional character when inputting "name". e.g. name "Test" and "Test " will be recorded as different person.

[comment]: # (Below should be uncommented when merging with main repo)

[comment]: # (For part 3, there may be issue with 3.10.
While everything for part 3 may still be in here, 
author will create new repo just for this part if
there are any issue with heroku depolyment.)