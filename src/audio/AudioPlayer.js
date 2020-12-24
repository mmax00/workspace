import alarmSound from "./alarm_classic.mp3";

class AudioPlayer {
  constructor() {
    this.audio = new Audio(alarmSound);
  }
  play = () => this.audio.play();
  pasue = () => this.audio.pause();
}

export default AudioPlayer;