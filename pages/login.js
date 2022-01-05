import Head from "next/head";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function login() {

const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
};
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo
                    src="https://us.123rf.com/450wm/katflare/katflare1610/katflare161000116/66591687-vector-flat-taxi-logo-isolated-on-white-background-car-face-icon-silhouette-auto-logo-template-taxi-.jpg?ver=6"
                />
                <Button onClick={signIn} variant="outlined">Acceder con Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default login

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
    `;

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 5px;
`;