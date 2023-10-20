export default class SwipeHandler {
  constructor(scene, pointer, swipeThreshold = 20, swipeDuration = 1000) {
    //  The current Scene
    this.scene = scene;

    //  The Pointer we're monitoring for swipes
    this.pointer = pointer;

    //  They must move this distance on a single axis during the swipe
    this.swipeThreshold = swipeThreshold;

    //  They cannot move more than 80% in the opposite axis during the swipe
    this.swipeAxisThreshold = swipeThreshold * 0.8;

    //  The swipe must complete within this ms value, or less
    this.swipeDuration = swipeDuration;

    this.startTime = 0;
    this.endTime = 0;

    this.start();
  }

  start() {
    this.scene.input.on('pointerdown', this.onDown, this);
    this.scene.input.on('pointerup', this.onUp, this);
  }

  stop() {
    this.scene.input.off('pointerdown', this.onDown, this);
    this.scene.input.off('pointerup', this.onUp, this);
  }

  onDown(pointer) {
    if (pointer !== this.pointer) {
      return;
    }
    this.startTime = performance.now();
  }

  onUp(pointer) {
    this.endTime = performance.now();

    if (pointer !== this.pointer) {
      return;
    }

    const distanceX = pointer.getDistanceX();
    const distanceY = pointer.getDistanceY();

    const horizontal = distanceX > distanceY;

    const duration = this.endTime - this.startTime;

    if (duration < this.swipeDuration) {
      if (
        horizontal &&
        distanceX > this.swipeThreshold
        //&& distanceY < this.swipeAxisThreshold
      ) {
        //  Horizontal Swipe
        if (pointer.velocity.x < 0) {
          this.scene.input.emit('swipeleft', this.pointer);
        } else {
          this.scene.input.emit('swiperight', this.pointer);
        }
      } else if (
        !horizontal &&
        distanceY > this.swipeThreshold
        // && distanceX < this.swipeAxisThreshold
      ) {
        //  Vertical Swipe
        if (pointer.velocity.y < 0) {
          this.scene.input.emit('swipeup', this.pointer);
        } else {
          this.scene.input.emit('swipedown', this.pointer);
        }
      }
    }
  }

  destroy() {
    this.stop();
  }
}
