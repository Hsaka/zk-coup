import Utils from "./utils";

export default class UIHelper {
  constructor() { }

  static get COLOR_PRIMARY() {
    return 0x4e342e;
  }

  static get COLOR_LIGHT() {
    return 0x7b5e57;
  }

  static get COLOR_DARK() {
    return 0x260e04;
  }

  static createToast(scene) {
    var toast = scene.rexUI.add.label({
      background: scene.rexUI.add
        .roundRectangle(0, 0, 10, 10, 10, UIHelper.COLOR_PRIMARY)
        .setStrokeStyle(2, UIHelper.COLOR_LIGHT),
      text: scene.add.text(0, 0, '', {
        fontSize: '16px',
      }),
      expandTextWidth: true,
      expandTextHeight: true,

      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    });
    toast.setOrigin(0);
    toast.visible = false;

    return toast;
  }

  static showToast(scene, toast, x, y, message, duration = 500, hold = 100) {
    if (toast) {
      toast.x = x;
      toast.y = y;
      toast.setText(message);
      toast.layout();
      toast.alpha = 0;
      toast.visible = true;

      scene.tweens.add({
        targets: [toast],
        alpha: { from: 0, to: 1 },
        ease: 'Sine.easeOut',
        duration: duration,
        hold: hold,
        yoyo: true,
      });
    }
  }

  static createMenuButton(scene, img, y, text, addToGroup = true) {
    var button = scene.add.sprite(
      Utils.GlobalSettings.width / 2,
      y,
      'atlas1',
      img + '1'
    );
    button.alpha = 0;
    button.setInteractive();
    if (addToGroup) {
      scene.screenGroup.add(button);
    }

    var buttonTxt = scene.add.bitmapText(
      button.x,
      button.y + 15,
      'sakkalbold',
      text,
      60
    );
    buttonTxt.alpha = 0;
    buttonTxt.setOrigin(0.5);
    if (addToGroup) {
      scene.screenGroup.add(buttonTxt);
    }

    button.buttonTxt = buttonTxt;

    button.on('pointerover', (event) => {
      button.setFrame(img + '2');
      buttonTxt.setTint(0x009dfd);
    });

    button.on('pointerout', (event) => {
      button.setFrame(img + '1');
      buttonTxt.setTint(0xffffff);
    });

    return button;
  }

  static createNavButton(scene, x, img) {
    var button = scene.add.sprite(
      x,
      Utils.GlobalSettings.height - 60,
      'atlas1',
      img + '1'
    );
    button.setInteractive();
    scene.screenGroup.add(button);

    button.on('pointerover', (event) => {
      button.setFrame(img + '2');
    });

    button.on('pointerout', (event) => {
      button.setFrame(img + '1');
    });

    return button;
  }

  static createSkillButton(scene, x, y, skillName, skillDescription) {
    var panel = this.createDialog(scene, x, y, 380, 75, 'dialog9patch2', 15);
    panel.setOrigin(0);
    panel.setInteractive();

    var skillTxt = scene.add.bitmapText(
      panel.x + 10,
      panel.y + 5,
      'sakkalbold',
      skillName,
      40
    );
    skillTxt.setOrigin(0);

    var descTxt = scene.add.bitmapText(
      skillTxt.x,
      skillTxt.y + 30,
      'sakkalicon',
      skillDescription,
      38
    );
    descTxt.setOrigin(0);

    panel.on('pointerover', (event) => {
      panel.setTint(0xc1a589);
      skillTxt.setTint(0x009dfd);
    });

    panel.on('pointerout', (event) => {
      panel.setTint(0xffffff);
      skillTxt.setTint(0xffffff);
    });

    panel.skillTxt = skillTxt;
    panel.skillDescriptionTxt = descTxt;
    return panel;
  }

  static createDialog(scene, x, y, width, height, ninePatchImg, size) {
    var ninePatch = scene.add.rexNinePatch({
      x: x,
      y: y,
      width: width,
      height: height,
      key: ninePatchImg,
      columns: [size, size, size],
      rows: [size, size, size],
    });

    return ninePatch;
  }

  static createTextDialog(
    scene,
    x,
    y,
    width,
    height,
    text,
    ninePatchImg = 'dialog9patch1',
    size = 50,
    textSize = 38
  ) {
    var ninePatch = this.createDialog(
      scene,
      x,
      y,
      width,
      height,
      ninePatchImg,
      size
    );

    var txt = scene.add.bitmapText(x, y, 'sakkal', text, textSize);
    txt.setOrigin(0.5, 0.5);
    txt.setCenterAlign();

    ninePatch.textContent = txt;

    return ninePatch;
  }

  static endsWithS(text) {
    return text.charAt(text.length - 1) === 's';
  }
}
