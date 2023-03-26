export class UnsupportedCSStyleUnit extends Error {
  constructor(msg = 'Invalid usage of a css style unit.') {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UnsupportedCSStyleUnit.prototype);
  }
}
