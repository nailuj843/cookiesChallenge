import { useState, useEffect } from 'react'
import { Card, Col, Button, ListGroupItem } from 'react-bootstrap';

const CookieContainer = () => {
    const api = 'http://localhost:5000/api'
    const [cookies, setCookies] = useState([]);
    const [counter, setCounter] = useState(0)
    const [statusText, setStatusText] = useState('OK')

    useEffect(() => {
        const getCookiesAsync = async () => {
            

            const response = await fetch(`${api}/cookies`, { credentials: 'include', method: 'get' });
            const cookies = await response.json();
            console.log('this is what came back from cookies'+  cookies)
            setCookies(cookies);
            
        }
        getCookiesAsync();
    },[])

    const addRandomCookie = async () => {

        let value = Math.random()

        let c = counter + 1
        let name = "random" + c

        let data = {[name] : value}
        setCounter(c)

        let newCookies = await fetch(`${api}/cookies/random`, {  credentials: 'include', 
                                                method: 'post',
                                                headers: {
                                                            'Content-Type': 'application/json'
                                                         },
                                                body: JSON.stringify(data)
        })
        let JSONCookies = await newCookies.json();
        setCookies(JSONCookies)
        setStatusText('Random Cookie Added')
        
    }

    const updateUsernameCookie = async () => {
         await fetch(`${api}/login`, {credentials: 'include', method: 'get'}) 

        console.log('you clicked update user name')
    };

    const deleteUsernameCookie = async () => {

       

        setStatusText('deleted cookie ' + counter)
        await fetch(`${api}/cookies/username`, {credentials: 'include', method: 'delete'})

       
    };

    const handleLocalClick = () =>{
        setStatusText('localhost:3000')
    } 

    const handleHelloClick = async () => {
        console.log('hello was clicked')
        let response = await fetch(`${api}/hello`, {credentials: 'include', method: 'get'}) 
        console.log(response)
        let text = await response.json()
        console.log(text)

        let greeting = `${text.response}`

        setStatusText(greeting)
    }

    console.log(`cookies '${cookies}'`)
    console.log(Object.entries(cookies))

    return (
        <Col xs={{ span: 6, offset: 3 }} className="mt-4">
            
            <Button onClick={addRandomCookie}>Add a random cookie</Button>
            <Button variant='success' onClick={() => updateUsernameCookie()}>Update Username Cookie</Button>
            <Button variant='danger' onClick={() => deleteUsernameCookie()}>Delete Username Cookie</Button>
            <Button onClick={handleLocalClick}> localhost:5000 </Button>
            <Button onClick={handleHelloClick}> Go To Hello? </Button>

            <h1> {statusText} </h1>

            <Card>
                <Card.Header>Cookies:</Card.Header>
                <Card.Body>
                    {Object.entries(cookies).map((cookie, index) => <ListGroupItem key={index}>{JSON.stringify(cookie)}</ListGroupItem>)}
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CookieContainer;
