export default class User {
  constructor(user) {
    this._image = user.image;
    this._email = user.email;
    this._username = user.username;
    this._fullName = user.fullName;
    this._usernameChanged = user.usernameChanged;

    Object.freeze(this);
  }

  get image(){
    return this._image;
  }

  get email(){
    return this._email;
  }

  get username(){
    return this._username;
  }

  get fullName(){
    return this._fullName;
  }

  get usernameChanged(){
    return this._usernameChanged;
  }
}
