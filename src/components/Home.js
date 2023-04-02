import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";


function Home() {

    const [addresss, setAddresss] = useState('');
    const [transactions, setTransactions] = useState([]);

    function handleAddress(event) {
        setAddresss(event.target.value);
    }

    useEffect(() => {
        const address = '0x9F620cCbcb854f15575bCEFFfC41DAc3173f2b48';
        const apiKey = '8D4WT79TMH7NPDQ7WR4MJSRF33IIRM2V34';
        const url = `https://api.polygonscan.com/api?module=account&action=tokentx&address=${addresss}&startblock=0&endblock=999999999&sort=asc&apikey=${apiKey}`;

        axios.get(url).then(response => {
            const transactions = Array.isArray(response.data.result) ? response.data.result : [];
            const formattedTransactions = transactions.map((transaction) => ({
              tokenName: transaction.tokenSymbol,
              tokenAmount: transaction.value / 10 ** transaction.tokenDecimal,
              timestamp: parseInt(transaction.timestamp),
            }));
            setTransactions(formattedTransactions);
          }).catch(error => {
            console.log(error);
          });

    }, [addresss]);


  /*  axios.get(url).then(response => {
        response.data.result.forEach(transaction => {


            const tokenName = transaction.tokenSymbol;
            const tokenAmount = transaction.value / 10 ** transaction.tokenDecimal;
            const timestamp = parseInt(transaction.timeStamp);
            const date = new Date(timestamp * 1000);
            const formattedDate = date.toLocaleString();

            // get current Date 
            const currentDate = new Date();

            const currentTimestamp = currentDate;
            const currentTimestamps = currentTimestamp;
            console.log(currentTimestamps.toLocaleString());

            console.log(`${addresss} is holding ${tokenName} ${tokenAmount} since ${formattedDate}`);
            
        });
    }).catch(error => {
        console.log(error);
    }); */

    return (
        <div>
          <div className="jumbotron text-center">
            <h1>Onchain Analysis</h1>
            <p>watch your idolo wallet</p> 
          </div>
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <form>
                        <div className="form-group">
                        <label htmlFor="address">Enter the address to watch:</label>
                        <input type="text" className="form-control" id="address" value={addresss} onChange={handleAddress} placeholder="Enter the address to watch..." />
                        </div>
                    </form>
      <h6>You are watching: {addresss}</h6>
      <ul>
              {transactions.map(transaction => (
                <li key={transaction.timestamp}>
                  {addresss} is holding {transaction.tokenName} {transaction.tokenAmount} since {new Date(transaction.timestamp * 1000).toLocaleString()}
                </li>
              ))}
            </ul>
    </div>
    </div>
    </div>
    </div>
    );
}

export default Home;