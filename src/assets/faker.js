import ItemData from "./json/data.json"
import QAData from "../assets/json/question.json"

// var item_image = require.context('./image', false, /\.(png|jpg|gif|svg)$/)

// ItemData.data.forEach((x) => {
//   x.image = item_image('./' + x.image)
// })

export default {
  getQAData() {
    return QAData['data']
  },
  getItemData() {
    return ItemData['data']
  },
  searchItemDataById(id) {
    return ItemData.data.filter(item => {
      return !id || item.id.toLowerCase().indexOf(id.toLowerCase()) > -1;
    })[0];
  }
}