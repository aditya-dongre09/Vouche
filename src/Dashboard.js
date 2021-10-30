import React, { useState } from 'react'
import { Layout, message } from 'antd';
import { Typography } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';

const { Title } = Typography;

const { Header, Footer, Sider, Content } = Layout;

export default function Dashboard() {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState(null);
   async function login(){
        let item={email,password};
       let result= await fetch("https://reqres.in/api/login",{
           method:'POST',
           headers:{
               "Content-Type":"application/json",
               "Accept":'application/json'
           },
           body:JSON.stringify(item)
       })
       result = await result.json()
       localStorage.setItem("user-info",JSON.stringify(result))
       console.log(result)
       if(result.error){
        message.error("Error: "+result.error, 2.5);
       }
       else
       message.success("Login Successful Token: "+result.token, 5);
    }
    

    return (
        <div>
            <Layout>
                <Header className="Header">
                <img src="./logo.png" className="logo"></img>
                <Button className="button login"><span>Login</span></Button>
                <Button type="Primary" className="button trial"><span>Start Free Trial</span></Button>
                </Header>
                <Layout style={{width:"100%",overflow:"hidden",marginTop:"75px" }}>
                    <Sider style={{width:"30%" }} className="sider"><Title className="title">Welcome to ATools</Title>
                    <Form name="basic" labelCol={{ span: 8,}} wrapperCol={{ span: 13}} 
                    initialValues={{ remember: true,}} autoComplete="off">
                        <Form.Item wrapperCol={{}} name="username" 
                        rules={[{ required: true, message: 'Please input your username!',},]}>
                            <Input placeholder="Email Address *" className="input" onChange={(e)=>setEmail(e.target.value)} />
                        </Form.Item>
                        <Form.Item wrapperCol={{}} name="password" 
                        rules={[{ required: true, message: 'Please input your password!',},]}>
                            <Input.Password placeholder="Password *" className="pass-input" onChange={(e)=>setPassword(e.target.value)} />
                        </Form.Item >
                        <Form.Item wrapperCol={{}}>
                            <Button onClick={login}className="signin"  type="primary" htmlType="submit" 
                            rules={[{ onClick: true, message: "hi",},]}>Login</Button>
                        </Form.Item>
                        
                        <Button style={{}} className="forgot" type="link" htmlType="button">
                            Forgot Password?
                        </Button>
                        
                    </Form>
                        <p>©2019-2020 All Rights Reserved<br></br>
                           Atools® is a registered trademark of ATools Ltd. Cookie Policy, Privacy and Terms.
                        </p>
                    </Sider>
                    <Content className="content"><img src="./Picture.png"></img></Content>
                    
                </Layout>
            </Layout>
        </div>
    )
}
