import moment from "moment"

const functions = {
    
    getDateString: (date = moment()) => {
        return moment(date).format('DD/MM/YYYY HH[h]mm')
    },

    getAddress: () => {
        return 'http://192.168.31.20:8080/'
    },
}

export default functions