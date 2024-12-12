import { useEffect, useState } from 'react'
import Header from '../../components/header/header'
import Main from '../../components/main/main'
import './home.css'
import DefaultLayout from '../default-layout/default-layout';

function Home() {
    const [dateTime, setDateTime] = useState(new Date());
    const [ip, setIp] = useState()
    const [ipData, setIpData] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
          setDateTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

    useEffect(() => {
        const getIp = async () => {
            try{
                const ip = await (await fetch('https://api.ipify.org?format=json')).json()
                setIp(ip.ip)
            }
            catch (e){
                console.error("Error:", e);
            }
        }

        const getIpData = async () => {
            try{
                setIsLoading(true)
                getIp()
                if (ip){
                    const ipData = await (await fetch(`https://ipinfo.io/${ip}/geo`)).json()
                    console.log(ipData)
                    setIpData(ipData)
                    setIsLoading(false)
                }
            }
            catch (e){
                console.error("Error:", e);
            }
        }

        getIpData()
    
    }, [ip])

    const localOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      };
    
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <>
            <DefaultLayout>
            <h2>Confectionery</h2>
                {!isLoading && ip && ipData ? (
                    <>
                        <div id='userIp'>
                            <h3>Your ip</h3>
                            <p>{ip}</p>
                        </div>
                        <div id='userIpData'>
                            <h3>Your ip data</h3>
                            <div>
                                <p>Hostname: {ipData.hostname}</p>
                                <p>City: {ipData.city}</p>
                                <p>Region: {ipData.region}</p>
                                <p>Timezone: {ipData.timezone}</p>
                                <p>Postal: {ipData.postal}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <p>API data is loading</p>
                    </>
                )}
                <div id='userTime'>
                    <h3>User time and timezone</h3>
                    <p>Users timezone: {timeZone}</p>
                    <p>Local datetime: {dateTime.toLocaleString('en-US', localOptions)}</p>
                    <p>UTC time: {dateTime.toUTCString()}</p>
                </div>
            </DefaultLayout>
        </>
    )
}

export default Home