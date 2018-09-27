# MWS Restaurant App Stage-1

## About

This is a restaurant review app. It shows the restaurant details on landing page and their location on map. It is part of Udacity Front End Nanodegree and project for part 4 of nanodegree.

## What I learned?

This Project is given with redundant code and with almost zero user experience. I learned how to use redundant code usable by using some parts of it and remove the unnecessary code. 
I learned about responsive website, accessibility features than can make app accessible to screen reader users. After that I learned how making an app offline first can increase user experience.
The following things are conclusions:- 
 * How to reuse redundant code.
 * Make site responsive using bootstrap.
 * Give accessibility features using `tabindex` and `aria role`.
 * Make offline or progressive web apps using `Service Workers` and `Cache API`.

## Project Structure
```
  ├── CODEOWNERS - Contains information about code owner.
  ├── gulpfile.js - Contains automated task for gulp build tool.
  ├── package.json - Project dependencies and information
  ├── package-lock.json - Generated by dependencies
  └── src - source folder of project
      ├── css
      │   ├── bootstrap.min.css - Bootstrap library 
      │   └── styles.css - Custom style sheet 
      ├── data
      │   └── restaurants.json - json data of all restaurants
      ├── img - contains restaurant images
      │   ├── 10.jpg
      │   ├── 1.jpg
      │   ├── 2.jpg
      │   ├── 3.jpg
      │   ├── 4.jpg
      │   ├── 5.jpg
      │   ├── 6.jpg
      │   ├── 7.jpg
      │   ├── 8.jpg
      │   └── 9.jpg
      ├── index.html - Landing page of project
      ├── js
      │   ├── dbhelper.js - data base helper file to get data from json file
      │   ├── main.js - To render the information about restaurants on landing page
      │   ├── restaurant_info.js - To render the information about individual restaurant
      │   └── ServiceWorkerController.js - Serive worker controller file to manage service worker
      ├── restaurant.html - Individual page of restaurant
      └── sw.js - service worker for project
```
## Prerequisites 
  * npm installed version 6.2.0 or higher
## How to run locally?
  * Clone the repository:
    * clone by https: 
      > $ git clone https://github.com/aditya81070/mws-restaurant-stage-1.git
    * clone by SSH:
      > $ git clone git@github.com:aditya81070/mws-restaurant-stage-1.git
  * Get into the clone repository:
    > $ cd mws-restaurant-stage-1
  * Install project dependencies:
    > $ npm install 
  * Run the project server:
    > $ gulp serve
    
## Leaflet.js and Mapbox:

This repository uses [leafletjs](https://leafletjs.com/) with [Mapbox](https://www.mapbox.com/). You need to replace `<your MAPBOX API KEY HERE>` with a token from [Mapbox](https://www.mapbox.com/). Mapbox is free to use, and does not require any payment information. 

### Note about ES6

Most of the code in this project has been written to the ES6 JavaScript specification for compatibility with modern web browsers and future proofing JavaScript code. As much as possible, try to maintain use of ES6 in any additional JavaScript you write. 



