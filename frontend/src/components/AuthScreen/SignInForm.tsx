import React from 'react';
import { useCallback, useState } from 'react';
import { useSignIn } from '../../services/auth.service';
import {
    SignInForm,
    AcutalForm,
    Legend,
    Section,
    TextField,
    Button,
    ErrorMessage
} from './form-components';
import { RouteComponentProps } from 'react-router-dom';

const SignInForm : React.FC<RouteComponentProps<any>> = ({ history }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = userState('');
    const [signIn] = useSignIn();

    const onUsernameChange = useCallback(({ target }) => {
        setError('');
        setUsername(target.value);
    }, []);

    const onPasswordChange = useCallback(({ target }) => {
        setError('');
        setPassword(target.value);
    }, []);

    const maySignIn = useCallback(() => {
        return !!(username && password);
    }, [username, password]);

    const handleSignIn = useCallback(() => {
        signIn({ variables : { username, password}})
            .then(() => {
                history.replace('/chats');
            })
            .catch(error => {
                setError(error.message || null);
            });
    }, [username, password, history, signIn]);

    return (
        <SignInForm>
            <ActualForm>
                <Legend>Sign In</Legend>
                <Section style={{ width : '100%'}}>
                    <TextField
                    data-testid="username-input"
                    label="username"
                    value={username}
                    onChange={onUsernameChange}
                    margin="normal"
                    placeholder="Enter your username"
                    />
                    <TextField
                    data-testid="password-input"
                    label="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChange}
                    margin="normal"
                    placeholder="Enter your password" 
                    />
                </Section>
                <Button
                data-testid="sign-in-button"
                type="button"
                color="secondary"
                variant="contained"
                disabled={!maySignIn()}
                onClick={handleSignIn}
                >
                Sign In
                </Button>
                <ErrorMesage data-testid="error-message">{error}</ErrorMesage>
            </ActualForm>
        </SignInForm>    
    );
};
export default SignInForm;