
declare global {
  interface Date {
    addHours(hours: number): Date;
    withoutOffset(): Date;
  }
}

/** it will return grinwich time */
Date.prototype.withoutOffset = function() {
  this.setTime(this.getTime() - this.getTimezoneOffset() * 60000);
  return this;
}

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

export {};