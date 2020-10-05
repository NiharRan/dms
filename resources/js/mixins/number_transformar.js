module.exports = {
  data: function () {
    return {
      obj: {
        1: '১',
        2: '২',
        3: '৩',
        4: '৪',
        5: '৫',
        6: '৬',
        7: '৭',
        8: '৮',
        9: '৯',
        0: '০',
      }
    }
  },
  methods: {
    translate: function (str) {
      if (this.$page.locale === 'bn') {
        let output = '';
        for (let i = 0; i < str.length; i++) {
          if (this.obj.hasOwnProperty(str[i])) {
            output += this.obj[str[i]];
          }else {
            output += str[i] + ' ';
          }
        }
        return output;
      }
      return str;
    }
  }
};
