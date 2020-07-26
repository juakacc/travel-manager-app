import moment from 'moment';

const functions = {
  getDateTimeString: (date = moment()) => {
    return moment(date).format('DD/MM/YYYY HH[h]mm');
  },

  getDateString: (date = moment()) => {
    return moment(date).format('DD/MM/YYYY');
  },

  getTimeString: (time = moment()) => {
    return moment(time).format('HH[h]mm');
  },

  getAddress: () => {
    return 'http://192.168.31.20:8080/';
  },

  formatNumber: num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  },
};

export default functions;
