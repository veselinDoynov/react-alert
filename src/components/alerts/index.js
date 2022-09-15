import React, {useState} from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import {Layout, Menu} from 'antd';
import Alerts from "./Alerts";
import Home from "./Home";
import About from "./About";
import Error from "./Error";

const {Header, Content, Footer} = Layout;

const items = [
    {key: 'home', label: 'Home'},
    {key: 'about', label: 'About'},
    {key: 'alerts', label: 'Alerts'},
    {key: 'notFound', label: 'Not found component'}
]

const App = () => {
    const [selectedComponent, setSelectedComponent] = useState(<Home/>)
    const componentsSwitch = (key) => {

        switch (key) {
            case 'home':
                setSelectedComponent(<Home/>);
                break;
            case 'about':
                setSelectedComponent(<About/>);
                break;
            case 'alerts':
                setSelectedComponent(<Alerts/>)
                break;
            default:
                setSelectedComponent(<Error/>)
                break;
        }

    }
    return (
        <Layout className="layout">
            <Header>
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={items}
                    onClick={(e) =>
                        componentsSwitch(e.key)}
                >

                </Menu>
            </Header>

            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <br/>
                {selectedComponent}
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Alert Design ©2022 Created by Care squad
            </Footer>
        </Layout>
    )
};

export default App;
