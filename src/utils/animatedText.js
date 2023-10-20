import Utils from "./utils";

export default class AnimatedText {
    constructor(scene, x, y, text, font, size, colors) {
        this.scene = scene;

        this.message = this.scene.add.dynamicBitmapText(
            x,
            y,
            font,
            text,
            size
        );
        this.message.setOrigin(0.5);

        this.messageWaveIdx = 0;
        this.messageWave = 0;
        this.messageDelay = 0;
        this.messageColor = colors ? colors : [
            0xffa8a8,
            0xffacec,
            0xffa8d3,
            0xfea9f3,
            0xefa9fe,
            0xe7a9fe,
            0xc4abfe,
        ];
        this.messageColorOffset = 0;

        this.message.setDisplayCallback((data) => {
            data.color = this.messageColor[
                (this.messageColorOffset + this.messageWaveIdx) %
                this.messageColor.length
            ];
            this.messageWaveIdx =
                (this.messageWaveIdx + 1) % this.messageColor.length;
            data.y = Math.cos(this.messageWave + this.messageWaveIdx) * 10;
            this.messageWave += 0.01;

            return data;
        });
    }

    setVisible(visible) {
        this.message.setVisible(visible);
    }

    setText(text) {
        this.message.setText(text);
    }

    update(deltaTime) {
        if (this.message.visible) {
            this.messageWaveIdx = 0;

            if (this.messageDelay++ === 6) {
                this.messageColorOffset =
                    (this.messageColorOffset + 1) % this.messageColor.length;
                this.messageDelay = 0;
            }
        }        
    }
}