import $ from 'jquery';
import { jsonrepair } from 'jsonrepair';
import localForage from "localforage";

let globalSettings = {
  namespace: 'template',
  width: 640,
  height: 960,
  text: null,
  mode: 0,
  version: '0.0.1',
  isIOS: false,
  bgm: null,
  battleBgm: null,
  selectSound: null,
  backSound: null,
  editingText: false,
  rnd: new Phaser.Math.RandomDataGenerator()
};

let savedSettings = {
  muted: true,
  lastNickname: '',
  firstTime: true,
  isMobile: false,
  continuing: false,
  timesPlayed: 0,
  seed: new Date().getTime(),
  characterData: undefined
};

export default class Utils {
  constructor() { }

  static get Config() {
    return config;
  }

  static get GlobalSettings() {
    return globalSettings;
  }

  static get SavedSettings() {
    return savedSettings;
  }

  static setupStorage() {
    localForage.config({
      driver: localForage.INDEXEDDB,
      name: globalSettings.namespace,
      version: 1.0
    });
  }

  static async save() {
    await localForage.setItem('saveData', savedSettings);
  }

  static async load() {
    savedSettings = await localForage.getItem('saveData');
  }

  static async saveItem(key, value) {
    await localForage.setItem(key, value);
  }

  static async loadItem(key) {
    return await localForage.getItem(key);
  }

  static async clear() {
    await localForage.clear();
  }

  static async generateImage(data, model) {
    return await Utils.query(data, model, Utils.GlobalSettings.huggingFaceAPIKey);
  }

  static async query(data, url, apikey) {
    return await Utils.fetchPlus(
      url,
      {
        headers: { Authorization: apikey },
        method: "POST",
        body: JSON.stringify(data)
      }, 3
    );
  }

  static fetchPlus(url, options = {}, retries) {
    return fetch(url, options)
      .then(res => {
        if (res.ok) {
          return res;
        }
        if (retries > 0) {
          return Utils.fetchPlus(url, options, retries - 1);
        }
        throw new Error(res.status);
      })
      .catch(error => console.error(error.message))
  }

  static async sendToAI(data, useJsonRepair = true) {

    try {
      var response = await Utils.fetchPlus(
        `${Utils.GlobalSettings.api}?operation=send-message`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
        }, 3
      );

      if (response) {
        try {
          var result = await response.json();
          if (useJsonRepair) {
            result = jsonrepair(result);

            var resp = JSON.parse(result);

            return resp;
          } else {
            return result;
          }

        } catch (err) {
          console.error(err);
          return null;
        }
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }    
  }

  static hexColorToInteger(color) {
    color = color.replace('#', '0x');
    return parseInt(color);
  }

  static mobilecheck() {
    var check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  static checkOrientation() {
    // Find matches
    var mql = window.matchMedia('(orientation: portrait)');

    // If there are matches, we're in portrait
    if (mql.matches) {
      // Portrait orientation
      $('#turn').hide();
    } else {
      // Landscape orientation
      if (!globalSettings.editingText) {
        $('#turn').insertAfter('canvas');
        $('#turn').show();
      } else {
        $('#turn').hide();
      }
    }

    // Add a media query change listener
    mql.addListener((m) => {
      if (m.matches) {
        // Changed to portrait
        $('#turn').hide();
      } else {
        // Changed to landscape
        if (!globalSettings.editingText) {
          $('#turn').insertAfter('canvas');
          $('#turn').show();
        } else {
          $('#turn').hide();
        }
      }
    });
  }
}
