import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'; // For additional jest-dom matchers
import SignIn from './SignIn'; // Adjust the import path as needed

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

describe('SignIn Component', () => {
  test('should render the login form by default', () => {
    render(<SignIn />);
    const loginElements = screen.queryAllByText('Log In');
    expect(loginElements.length).toBeGreaterThan(1);
    // expect(screen.queryAllByText('Sign Up')).not.toBeInTheDocument();
    const signUpTextElements = screen.queryAllByText('Sign Up');
    expect(signUpTextElements).toHaveLength(0);
    // expect(screen.queryAllByText('RESET PASSWORD')).not.toBeInTheDocument();
    const resetPasswordTextElements = screen.queryAllByText('Sign Up');
    expect(resetPasswordTextElements).toHaveLength(0);
  });

  test('should switch to the sign-up form when "Sign up here!" is clicked', async() => {
    const user = userEvent.setup()
    render(<SignIn />);
    const signUpHereElement = screen.queryByText((content, element) => {
        return content === 'Sign Up here!' && element.tagName.toLowerCase() === 'span';})
    await user.click(signUpHereElement)
    const signUpElement = screen.queryByText((content, element) => {
        return content === 'Sign Up' && element.tagName.toLowerCase() === 'h1';
    });
    expect(signUpElement).toBeInTheDocument();
    const logInTextElements = screen.queryAllByText('Log In');
    expect(logInTextElements).toHaveLength(0);
    const resetPasswordTextElements = screen.queryAllByText('Sign Up');
    expect(resetPasswordTextElements).toHaveLength(0);
  });

  test('should switch to the reset password form when "Forgot your password?" is clicked', () => {
    render(<SignIn />);
    fireEvent.click(screen.getByText('Forgot your password? Click'));
    expect(screen.getByText('RESET PASSWORD')).toBeInTheDocument();
    expect(screen.queryByText('Log In')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });

  test('should call the logIn function when "Log In" button is clicked', () => {
    const logInMock = jest.fn();
    render(<SignIn changeSign={logInMock} />);
    fireEvent.click(screen.getByText('Log In'));
    expect(logInMock).toHaveBeenCalled();
  });

  test('should submit createUserWithEmailAndPassword API call when "Sign Up" button is clicked', async () => {
    // set state for Sign in onSignUp=true
    // const firebaseAuth = jest.spyOn(firebase, 'auth');
    const createUserWithEmailAndPasswordFn = jest.spyOn(firebase.auth(), 'createUserWithEmailAndPassword');
    jest.mock('../firebase', () => ({
        auth: () => ({
          createUserWithEmailAndPassword: (email, password) => ({
            then: () => ({
              user: { updateProfile: () => {} },
            }),
            catch: () => {},
          })
        }),
    }));
    
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
    expect(createUserWithEmailAndPasswordFn).toHaveBeenCalledWith({lazy: true});
  });

  test('should call the handleResetPassword function when "Reset Password" button is clicked', () => {
    const handleResetPasswordMock = jest.fn();
    render(<SignIn />);
    fireEvent.click(screen.getByText('Forgot your password? Click'));
    fireEvent.click(screen.getByText('Reset Password'));
    expect(handleResetPasswordMock).toHaveBeenCalled();
  });

  // Add more tests as needed for other interactions and edge cases

});
