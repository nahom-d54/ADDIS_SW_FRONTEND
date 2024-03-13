import { css } from "@emotion/react";
import { useState } from "react";
import { Box, Button, Flex, Image, Text } from "rebass";
import Editor from "./Editor";
import AboutPage from "./AboutPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { types } from "../redux/sagas/userSaga";



export default function Header() {
    const [editorActive, setEditorActive] = useState(false);
    const [loginFormActive, setLoginFormActive] = useState(false);
    const [registerFormActive, setRegisterFormActive] = useState(false);
    const [aboutPageActive, setAboutPageActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
  };
  return (
    <>
    {aboutPageActive && <AboutPage aboutPageActive={aboutPageActive} setAboutPageActive={setAboutPageActive}/>}
    {editorActive && <Editor editorActive={editorActive} setEditorActive={setEditorActive} type={'add'}/>}
    

    {loginFormActive && <LoginForm loginFormActive={loginFormActive} setLoginFormActive={setLoginFormActive}/>}
    {registerFormActive && <RegistrationForm registerFormActive={registerFormActive} setRegisterFormActive={setRegisterFormActive}/>}
    <header>
      <Flex css={css`padding:1rem 3rem;justify-content: space-between`}>
        <Text className='brand' css={css`
          display: flex;
          align-items: center;
          gap: 1rem;
        `}>
          <Image src="/img/music_database.png"/>
          MusicDB
        </Text>
        <nav className="" >
        
          <Box className="humburgermenu" onClick={toggleMenu}><FontAwesomeIcon icon={faBars} size="2xl"/></Box>
          <Flex className={`menu ${isOpen ? 'open': ''}`}>

            {user.loggedIn && 
            <Button backgroundColor="var(--link-color);cursor: pointer;
            &:hover {
              background-color: var(--link-color-light);
              }"
              onClick={() => setEditorActive(!editorActive)}>Add Music
              </Button>
            }
            <Button css={css`background: none;
            border-bottom: 1px solid #fff;
            padding:3px 0px;
            border-radius:0;
            margin: 0 .7rem;
            cursor: pointer;
            &:hover {
              border-color: #999;
              color: #999;
            }`}
            
            onClick={()=> setAboutPageActive(!aboutPageActive)}>About</Button>
            <Flex>
            { user.loggedIn ?  (<Button css={css`background: none;
            border-bottom: 1px solid #fff;
            padding:3px 0px;
            border-radius:0;
            margin: 0 0.7rem;
            cursor: pointer;
            &:hover {
              border-color: #999;
              color: #999;
            }`}
            
            onClick={() => dispatch({type: types.LOGOUT_USER})}>
              Logout</Button>): 
            (<><Button css={css`background: none;
            border-bottom: 1px solid #fff;
            padding:3px 0px;
            border-radius:0;
            margin: 0 .7rem;
            cursor: pointer;
            &:hover {
              border-color: #999;
              color: #999;
            }`}
            
            onClick={()=> setLoginFormActive(!loginFormActive)}>
              Login</Button>
            <Button css={css`background: none;
            border-bottom: 1px solid #fff;
            padding:3px 0px;
            border-radius:0;
            margin: 0 .7rem;
            cursor: pointer;
            &:hover {
              border-color: #999;
              color: #999;
            }`}
            
            onClick={()=> setRegisterFormActive(!registerFormActive)}>
              Register</Button></>)
              }
            </Flex>
           </Flex>
           
        </nav>
      </Flex>
    </header>

    </>
  )
}
