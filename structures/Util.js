const suffixes = ["Bytes", "KB", "MB", "GB"];

const moment = require("moment-timezone");
require("moment");

module.exports = class Util {
  constructor(client) {
    this.client = client;
  }

  get hexColor() {
    let color = Math.floor(Math.random()*16777215).toString(16);
    return `#${color}`;
  }
  
  get color() {
    return {
      error: 0xff0051,
      success: 0x00FF61,
      warning: 0xFFDC00,
      primary: 0xf10f5a //
    }
  }
  
  get emoji() {
    return {
      success: "<a:checkmark:755254019689283594>",
      error: "<a:crossmark:755253920934133879>",
      search: "🔍",
      warning: "⚠️",
    }
  }

  get intColor() {
    let color = Math.floor(Math.random()*16777215).toString(16);
    return `${parseInt(color, 16)}`;
  }

  get getTime() {
    return moment(new Date()).tz('Asia/Kolkata').format('dddd MMMM Do h:mm A');
  }
  
  toProperCase(str) {
    return str.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  shuffle(array) {
    let tmp;
    let current;
    let top = array.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

  random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  getBytes(bytes) {
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (!bytes && "0 Bytes") || `${(bytes / Math.pow(1024, i)).toFixed(2)} ${suffixes[i]}`;
  }
  
  codeBlock(string, code) {
    if(code) return `\`\`\`${code}\n${string}\`\`\``;
    return `\`\`\`${string}\`\`\``;
  };
  
  async haste(text) {
     const req = await this.client.snek.post("https://haste.ntmnathan.com/documents", { text });
     return `https://haste.ntmnathan.com/${req.data.key}`   
  };
  
  escapeRegex(str) {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  
  // Convert milliseconds into human readable string.
  getDuration(time) {
    const seconds = Math.floor(time / 1000) % 60 ;
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor((time / (1000 * 60 * 60 * 24)) % 7);
    return [`${days} Days`, `${hours} Hours`, `${minutes} Minutes`,
      `${seconds} Seconds`].filter((time) => !time.startsWith("0")).join(", ");
  }

  formatSeconds (time, yt = false) {
    let days = Math.floor(time % 31536000 / 86400);
    let hours = Math.floor(time % 31536000 % 86400 / 3600);
    let minutes = Math.floor(time % 31536000 % 86400 % 3600 / 60);
    let seconds = Math.round(time % 31536000 % 86400 % 3600 % 60);days = days > 9  ? days : `0${  days}`;
    hours = hours > 9 ? hours : `0${  hours}`;
    minutes = minutes > 9 ? minutes : `0${  minutes}`;
    seconds = seconds > 9 ? seconds : `0${  seconds}`;
    if (yt === true && time > 3600000000) return 'Live';
    else return `${(parseInt(days) > 0 ? `${days  }:` : '') + (parseInt(hours) === 0 && parseInt(days) === 0 ? '' : `${hours  }:`) + minutes  }:${  seconds}`;
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
	}
  
  delay(ms) {
		return new Promise(res => setTimeout(res, ms));
	}
  
  randomNum(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async fetchChannel(channelID) {
    return await this.client.channels.fetch(channelID).catch(() => false);
  }
};