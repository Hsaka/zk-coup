import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import Preloader from './scenes/Preloader';
import MenuScene from './scenes/MenuScene';
import Utils from './utils/utils';

export default {
  width: Utils.GlobalSettings.width,
  height: Utils.GlobalSettings.height,
  // zoom: 1,
  // resolution: 1,
  type: Phaser.AUTO,
  parent: 'game',
  // canvas: null,
  // canvasStyle: null,
  // seed: null,
  title: 'Template', // 'My Phaser 3 Game'
  url: 'https://gamepyong.xyz',
  version: '0.0.1',
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false,
  },
  disableContextMenu: true,
  pixelArt: false,
  // banner: false
  banner: {
    // hidePhaser: false,
    // text: 'white',
    background: ['#e54661', '#ffa644', '#998a2f', '#2c594f', '#002d40'],
  },
  // fps: {
  //   min: 10,
  //   target: 60,
  //   forceSetTimeout: false,
  // },
  // pixelArt: false,
  // transparent: false,
  clearBeforeRender: false,
  // backgroundColor: 0x000000, // black
  loader: {
    // baseURL: '',
    path: '',
    maxParallelDownloads: 6,
    // crossOrigin: 'anonymous',
    // timeout: 0
  },
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {},
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: Utils.GlobalSettings.width,
    height: Utils.GlobalSettings.height,
  },
  scene: [BootScene, Preloader, MenuScene]
};
