const functions = {
    
    getDateString: () => {
        const date = new Date().getDate() 
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        const hours = new Date().getHours()
        const min = new Date().getMinutes()

        const data = date + '/' + month + '/' + year + ' ' + hours + 'h' + min
        return data
    }
}

export default functions