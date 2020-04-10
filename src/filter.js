const filter = {

    '1000': function (val) {

        if (typeof (val) === 'number') {

            return (val).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')

        }

    }

}

export default filter

