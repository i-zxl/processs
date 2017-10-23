// PipeLine

class PipeLine {
  constructor() {
    this.transforms = [];
  }

  add (transform) {
    this.transforms.push(transform);
    return this;
  }

  use (file) {
    return new Promise( (resolve, reject) => {
      var trs = this.transforms,
          self = this;
      const done = function (_file) {
        file = _file;
        resolve(file);
      }
      let next = function (index = 0) {
        let tr = trs[index];
        if (!tr) {
          return done(file);
        }
        try{
          tr(file, function (_file) {
            file = _file;
            next(index + 1);
          }, done);
        } catch (err) {
          console.error(err);
          done(file);
        }
      }
      process.nextTick(next);
    })
  }

}

module.exports = PipeLine

