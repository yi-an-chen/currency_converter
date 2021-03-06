// API Source: https://exchangerate.host/#/

const currencyA = document.querySelector('#currencyA')
const currencyB = document.querySelector('#currencyB')
const amountA = document.querySelector('#amountA')
const amountB = document.querySelector('#amountB')
const button = document.querySelector('button')
// console.log(currencyA, currencyB, amountA, amountB);

currencyA.addEventListener('change', getRate)
currencyB.addEventListener('change', getRate)
amountA.addEventListener('input', getRate)
amountB.addEventListener('input', getRate)
button.addEventListener('click', change)

function change() {
    const changeVal = currencyA.value
    currencyA.value = currencyB.value
    currencyB.value = changeVal
    getRate()
}

function getRate() {
    fetch('https://api.exchangerate.host/latest') // Base Currency:EUR
        .then(function (response) {
            // console.log(response);
            return response.json()
        })
        .then(function (data) {
            // console.log(data);
            let rates = data.rates
            // console.log(rates);
            const valueA = currencyA.value
            const valueB = currencyB.value
            // console.log(valueA, valueB);
            amountB.value = (amountA.value / rates[valueA] * rates[valueB]).toFixed(3).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            // console.log(amountA.value, amountB.value);
        })
        .catch(function (error) {
            console.log(error);
        })
}
