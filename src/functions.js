import moment from "moment"

const functions = {
    
    getDateString: () => {
        return moment().format('DD/MM/YYYY HH[h]mm')
    },

    getAddress: () => {
        return 'http://192.168.43.89:8080/'
    }
}

export default functions