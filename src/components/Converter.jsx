import { useEffect, useState } from "react";
import styles from "./Converter.module.css";

function Converter() {
    const [fromAssetAmount, setFromAssetAmount] = useState(0);
    const [toAssetAmount, setToAssetAmount] = useState(0);
    const [fromAssetName, setFromAssetName] = useState("");
    const [toAssetName, setToAssetName] = useState("");

    const [rubPrices, setRubPrices] = useState({
        'USD': 0,
    });

    useEffect(
        () => {
            fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(
                result => {
                    if(result.status == 200){
                        result.json().then(
                            res => {
                                setRubPrices({...rubPrices,
                                    'USD': res['Valute']['USD']['Value']
                                });
                            }
                        )
                    }
                }
            );
    },[]);

    useEffect(
        () => {
            if(fromAssetName == 'usd'){
                if(toAssetName == 'rub'){
                    setToAssetAmount(fromAssetAmount * rubPrices['USD']);
                }
            }

            if(fromAssetName == 'rub'){
                if(toAssetName == 'usd'){
                    setToAssetAmount(fromAssetAmount / rubPrices['USD']);
                }
            }

            if(fromAssetName === toAssetName){
                setToAssetAmount(fromAssetAmount);
            }

            if(fromAssetName === '' || toAssetName === ''){
                setToAssetAmount(0);
            }
    }, [fromAssetName, fromAssetAmount, toAssetName, toAssetAmount]);

    return <div className={styles.container}>
        <div className={styles.label}>From</div>
        <select className={styles.select} onChange={(e) => setFromAssetName(e.target.value)}>
            <option value="">Select an asset</option>
            <option value="rub">RUB</option>
            <option value="usd">USD</option>
        </select>
        <input className={styles.input} type="text" name="" id="fromAsset" value={fromAssetAmount} onChange={(e) => setFromAssetAmount(e.target.value)} />
        <div className={styles.label}>To</div>
        <select className={styles.select} onChange={(e) => setToAssetName(e.target.value)}>
            <option value="">Select an asset</option>
            <option value="rub">RUB</option>
            <option value="usd">USD</option>
        </select>
        <input className={styles.input} type="text" name="" id="toAsset" value={toAssetAmount} onChange={(e) => setToAssetAmount(e.target.value)} />
    </div>
}

export default Converter;