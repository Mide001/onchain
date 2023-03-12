console.log("Let's get started!!!");
const axios = window.axios;
console.log(axios)
const address = '0x5275c18961c83045B9a8e034Ac00140F50850f13';
const apiKey = '8D4WT79TMH7NPDQ7WR4MJSRF33IIRM2V34';

const url = `https://api.polygonscan.com/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&sort=asc&apikey=${apiKey}`;
const now = moment();
console.log(now)

axios.get(url)
.then(response => {
    response.data.result.forEach(transaction => {
        const tokenName = transaction.tokenSymbol;
        const tokenAmount = transaction.value / 10 ** transaction.tokenDecimal;
        const timestamp = parseInt(transaction.timeStamp);
        const hodlDuration = moment().diff(moment.unix(timestamp), 'days');

        console.log(`${address} is holding ${tokenAmount} ${tokenName} for ${hodlDuration} days`);

    });
})
.catch(error => {
    console.log(error);
});
