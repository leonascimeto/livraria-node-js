/**
 * @description: Utilize apenas os metodos staticos right e left para criar uma instancia de Either
 */

module.exports = class Either {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  static left(left) {
    return new Either(left, null);
  }

  static right(right) {
    return new Either(null, right);
  }
}
