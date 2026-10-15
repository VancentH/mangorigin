export default {
  getImageSource(id, type) {
    return require(`@/assets/image/${id}.${type}`);
  }
}