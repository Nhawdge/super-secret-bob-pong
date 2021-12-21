import GameEngine from "./GameEngine.js";

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;


var game = new GameEngine(canvas);

game.Start();