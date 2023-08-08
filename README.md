# marcloe.github.io

Mobile App for showcasing animations developed in semester 6 at University of the Arts Berlin.

Using Bodymovin JS library for displaying AE animations.
Using Interact JS library for making animations interactable.
Using p5JS for creating further animation not created in AE.

Structure of app.js:

1) Creating variables for initial DOM elements (container, wrapper, button).

2) Get the frame count of animations via fetchAndReadJSON
  
Page layout:

3) wrapper = 85%, button = 15%
4) Pages object
5)  Function for handling resizes
6)  Defining resize actions

Button:

7) Define button contents
8) Function for injecting button texts

Create all page objects with their contents and animations without exposing them.

9) Start page (p0)
10) Page1 (p1)
11) Page2 (p2)
12) Page 3 (p3)
13) End page (p4)

(All are created with IIFE, featuring methods such as create(), destroy() or updateAnim()

Navigation:
14) Creating the navigation

Interaction:
15) Creating the swipe functionality

Listeners:
16) Adding event listeners

Start application:
17) Loading page on load event
