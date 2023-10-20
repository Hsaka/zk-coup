import Phaser from 'phaser';
import gameConfig from './gameConfig.js';
import Utils from './utils/utils.js';
import $ from 'jquery';

window.onload = function () {

  function newGame () {
    if (game) return;
    game = new Phaser.Game(gameConfig);
  }
  
  function destroyGame () {
    if (!game) return;
    game.destroy(true);
    game.runDestroy();
    game = null;
  }

  function resize() {
    var canvas = document.querySelector('canvas');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = Utils.GlobalSettings.width / Utils.GlobalSettings.height;
    if (windowRatio < gameRatio) {
      canvas.style.width = windowWidth + 'px';
      canvas.style.height = windowWidth / gameRatio + 'px';
    } else {
      canvas.style.width = windowHeight * gameRatio + 'px';
      canvas.style.height = windowHeight + 'px';
    }
  }

  function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }
  
  let game;
  
  if (module.hot) {
    module.hot.dispose(destroyGame);
    module.hot.accept(newGame);
  }
  
  if (!game) {
    newGame();
  }

  resize();
  window.addEventListener('resize', resize, false);

  $('body').css({ background: '#fff' });
};
