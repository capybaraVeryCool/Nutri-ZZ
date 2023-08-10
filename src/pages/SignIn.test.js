import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import SignIn from './SignIn'; // Adjust the import path as needed
import firebase from '../firebase';

// Mock firebase.auth() to simulate successful login
jest.mock('../firebase', () => ({
  auth: () => ({
    signInWithEmailAndPassword: () => ({
      then: () => {},
      catch: () => {},
    }),
    createUserWithEmailAndPassword: () => ({
      then: () => ({
        user: { updateProfile: () => {} },
      }),
      catch: () => {},
    }),
    sendPasswordResetEmail: () => ({
      then: () => {},
      catch: () => {},
    }),
  }),
}));

const user = userEvent.setup()

describe('SignIn Component', () => {
    test('should render the login form by default', () => {
        render(<SignIn />);
        const loginElements = screen.queryAllByText('Log In');
        expect(loginElements.length).toBeGreaterThan(1);
        // expect(screen.queryAllByText('Sign Up')).not.toBeInTheDocument();
        const signUpTextElements = screen.queryAllByText('Sign Up');
        expect(signUpTextElements).toHaveLength(0);
        // expect(screen.queryAllByText('RESET PASSWORD')).not.toBeInTheDocument();
        const resetPasswordTextElements = screen.queryAllByText('Reset Password');
        expect(resetPasswordTextElements).toHaveLength(0);
    });
    
    test('should switch to the sign-up form when "Sign up here!" is clicked', async() => {
        render(<SignIn />);
        // user click on Sign Up here!
        const signUpHereElement = screen.queryByText((content, element) => {
            return content === 'Sign up here!' && element.tagName.toLowerCase() === 'span';})
        await user.click(signUpHereElement)
        //query Sign Up header
        const signUpElement = screen.queryByText((content, element) => {
            return content === 'Sign Up' && element.tagName.toLowerCase() === 'h1';
        });
        expect(signUpElement).toBeInTheDocument();

        //query Log In header
        const logInHeaderElement = screen.queryByText((content, element) => {
            return content === 'Log In' && element.tagName.toLowerCase() === 'h1';
        });
        expect(logInHeaderElement).not.toBeInTheDocument;

    //query RESET PASSWORD header
        const resetPasswordHeaderElement = screen.queryByText((content, element) => {
            return content === 'Reset Password' && element.tagName.toLowerCase() === 'h1';
        });
        expect(resetPasswordHeaderElement).not.toBeInTheDocument;
    });

    test('should switch to the reset password form when "Forgot your password?" is clicked', async() => {
        render(<SignIn />);
        // user click on here in forgot your password? Click here
        const forgotPwElement = screen.queryByText((content, element) => {
            return content === 'here' && element.tagName.toLowerCase() === 'span';})
        await user.click(forgotPwElement)
        //query Sign Up header
        const resetPasswordHeader = screen.queryByText((content, element) => {
            return content === 'Reset Password' && element.tagName.toLowerCase() === 'h1';
        });
        expect(resetPasswordHeader).toBeInTheDocument();

        //query Log In header
        const logInHeaderElement = screen.queryByText((content, element) => {
            return content === 'Log In' && element.tagName.toLowerCase() === 'h1';
        });
        expect(logInHeaderElement).not.toBeInTheDocument;

    //query RESET PASSWORD header
        const signUpHeaderElement = screen.queryByText((content, element) => {
            return content === 'Sign Up' && element.tagName.toLowerCase() === 'h1';
        });
        expect(signUpHeaderElement).not.toBeInTheDocument;
    });

    test('should display homepage when "Sign Up" button is clicked', async () => {
        // set state for Sign in onSignUp=true
        // const firebaseAuth = jest.spyOn(firebase, 'auth');
        // const createUserWithEmailAndPasswordFn = jest.spyOn(firebase.auth(), 'createUserWithEmailAndPassword');
        // jest.mock('../firebase', () => ({
        //     auth: () => ({
        //       createUserWithEmailAndPassword: (email, password) => ({
        //         then: () => ({
        //           user: { updateProfile: () => {} },
        //         }),
        //         catch: () => {},
        //       })
        //     }),
        // }));
        
        render(<SignIn />);
        const signUpHereElement = screen.queryByText((content, element) => {
            return content === 'Sign up here!' && element.tagName.toLowerCase() === 'span';})
        await user.click(signUpHereElement)

        const usernameInput = screen.getByRole('textbox',{name:"Username"});
        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        await user.type(usernameInput, 'test3');
        await user.type(emailInput, 'test3@gmail.com');
        await user.type(passwordInput, 'test1234');
        const signUpButton = screen.queryByText((content, element) => {
            return content === 'Sign Up' && element.tagName.toLowerCase() === 'button';})
        await user.click(signUpButton);
        // expect(firebaseMock).toHaveBeenCalledTimes(1);
        const homePageElem = screen.queryByText('Nutrient Data');
        expect(homePageElem).toBeInTheDocument;
      });

});