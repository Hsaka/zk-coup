import Utils from "../utils/utils";

export default class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: 'boot',
      pack: {
        files: [{ type: 'image', key: 'logo', url: 'assets/logo.png' }]
      }
    });
  }

  create() {
    if (Utils.mobilecheck()) {
      Utils.checkOrientation();
    }

    if (
      this.sys.game.device.os.iOS ||
      this.sys.game.device.os.iPad ||
      this.sys.game.device.os.iPhone ||
      this.sys.game.device.os.macOS
    ) {
      Utils.GlobalSettings.isIOS = true;
    }

    Utils.setupStorage();
    Utils.load();
    this.scene.start('preloader');
  }
}
