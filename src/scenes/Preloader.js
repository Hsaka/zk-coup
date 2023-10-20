import AnimatedText from "../utils/animatedText";
import Utils from "../utils/utils";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
    this.progressBar = null;
    this.progressBarRectangle = null;
  }

  preload() {
    this.load.setCORS('Anonymous');

    this.load.image('bg', 'assets/bg1.png');

    this.load.multiatlas({
      key: 'atlas',
      atlasURL: 'assets/atlas-multi.json',
      path: 'assets/',
    });

    this.load.audio('gp', ['assets/audio/gp.ogg', 'assets/audio/gp.m4a']);
    this.load.audio('click', [
      'assets/audio/click.ogg',
      'assets/audio/click.m4a',
    ]);
    this.load.audio('bgm1', ['assets/audio/bgm1.ogg', 'assets/audio/bgm1.m4a']);

    this.load.bitmapFont(
      'kenpixel',
      'assets/fonts/kenpixel_0.png',
      'assets/fonts/kenpixel.xml'
    );

    this.load.bitmapFont(
      'sakkal',
      'assets/fonts/sakkal_0.png',
      'assets/fonts/sakkal.xml'
    );

    this.load.json('text', 'assets/data/text.json');
    this.load.json('particles', 'assets/data/effects.json');

    this.load.on('progress', this.onLoadProgress, this);
    this.load.on('complete', this.onLoadComplete, this);
    this.createProgressBar();

    this.icon = this.add.image(
      Utils.GlobalSettings.width / 2,
      Utils.GlobalSettings.height / 2,
      'logo'
    );
    this.icon.setOrigin(0.5, 0.5);
  }

  create() {
    Utils.GlobalSettings.bgm = this.sound.add('bgm1');
    Utils.GlobalSettings.text = this.cache.json.get('text');

    this.message = new AnimatedText(this, Utils.GlobalSettings.width/2,
      Utils.GlobalSettings.height - 350,
      'Tap To Play!',
      'sakkal',
      50);

    this.input.on('pointerdown', () => {

      Utils.load();

      this.transitionOut();
      //this.scale.toggleFullscreen();
    });

    this.events.on('shutdown', this.shutdown, this);
  }

  transitionOut(target = 'menu') {
    var tween = this.tweens.add({
      targets: [this.icon, this.message.message],
      alpha: 0,
      ease: 'Power1',
      duration: 1000,
      onComplete: () => {
        this.scene.start(target, { from: 'preloader' });
      },
    });
  }

  // extend:

  createProgressBar() {
    var main = this.cameras.main;
    this.progressBarRectangle = new Phaser.Geom.Rectangle(
      0,
      0,
      0.75 * main.width,
      20
    );
    Phaser.Geom.Rectangle.CenterOn(
      this.progressBarRectangle,
      0.5 * main.width,
      main.height - 150
    );
    this.progressBar = this.add.graphics();
  }

  onLoadComplete(loader) {
    //console.log('onLoadComplete', loader);
    this.progressBar.destroy();
  }

  onLoadProgress(progress) {
    var rect = this.progressBarRectangle;
    var color = 0xca59ff;
    this.progressBar
      .clear()
      .fillStyle(0x222222)
      .fillRect(rect.x, rect.y, rect.width, rect.height)
      .fillStyle(color)
      .fillRect(rect.x, rect.y, progress * rect.width, rect.height);
    //console.log('progress', progress);
  }

  update(time, dt) {
    this.message.update(dt);
  }

  shutdown() {
    if (this.icon) {
      this.icon.destroy();
      this.icon = null;
    }

    if (this.progressBarRectangle) {
      this.progressBarRectangle = null;
    }

    this.events.off('shutdown', this.shutdown, this);

    console.log('kill preloader');
  }
}
