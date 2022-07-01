const API_KEY = '60da314eeb712b913e4069d8';

let currencyEl_one = document.getElementById('currency-one');
let currencyEl_two = document.getElementById('currency-two');
let amountEl_one = document.getElementById('amount-one');
let amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetching the Exchange rate from the API
const fetchCurrency = async() => {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    let rate = await fetch(
            `https://v6.exchangerate-api.com/v6/60da314eeb712b913e4069d8/latest/${currency_one}`
        )
        .then((res) => res.json())
        .then((data) => {
            return data.conversion_rates[`${currency_two}`];
        })
        .catch((err) => {
            alert(`There was an error processing your request: ${err}`);
        });
    return rate;
};

//Calculates and populates the DOM with the required result
const calculate = async() => {
    const rate = await fetchCurrency();
    rateEl.innerText = `1 ${currencyEl_one.value} = ${rate} ${currencyEl_two.value}`;
    amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
};
calculate();

//Event Listeners

currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);

// Swap

swap.addEventListener('click', () => {
    swap.classList.toggle('toggle__cur');
    let temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});