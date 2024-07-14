import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppContext } from '@/providers/context/context';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { auth } from '@/firebase/firebase';
import primaryLogo from '/public/logo/rastro-logo.jpg';

const AuthModal: React.FC<{}> = () => {
  const { openAuthModal, setOpenAuthModal } = useAppContext();
  const [email, setEmail] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [useEmailMethod, setUseEmailMethod] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const [mouseDownTarget, setMouseDownTarget] = useState<EventTarget | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearForm();
        setOpenAuthModal(false);
      }
    };

    const handleBeforeUnload = () => {
      clearForm();
      setOpenAuthModal(false);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [setOpenAuthModal]);

  const toggleMode = (mode: 'LOGIN' | 'SIGNUP') => {
    setIsSignUp(mode == 'SIGNUP' ? true : false);
    setUseEmailMethod(true);
    setAuthError('');
    setIsPasswordReset(false);
    setResetMessage('');
    setPasswordInvalid(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setEmailInvalid(false);
    setPasswordInvalid(false);
    setIsPasswordReset(false);
    setResetMessage('');
    setShowPassword(false);
    setAuthError('');
    setUseEmailMethod(false);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setMouseDownTarget(event.target);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    if (mouseDownTarget === event.target && event.target === event.currentTarget) {
      clearForm();
      setOpenAuthModal(false);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordReset = async (email: string) => {
    try {
      if (!validateEmail(email)) {
        setEmailInvalid(true);
        return;
      }
      await sendPasswordResetEmail(auth, email);
      setResetMessage('Recovery email sent');
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleAuthError(error);
      } else {
        setAuthError('An unexpected error occurred.');
      }
    }
  };

  const handleAuthError = (error: FirebaseError) => {
    if (error.code === 'auth/email-already-in-use') {
      setAuthError('The email address is already in use by another account.');
    } else if (error.code === 'auth/invalid-email') {
      setAuthError('The email address is not valid.');
    } else if (error.code === 'auth/invalid-credential') {
      setAuthError('The provided credentials are invalid.');
    } else if (error.code === 'auth/operation-not-allowed') {
      setAuthError('Email/password accounts are not enabled.');
    } else if (error.code === 'auth/weak-password') {
      setAuthError('The password is too weak.');
    } else {
      setAuthError('An unexpected error occurred.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      clearForm();
      setOpenAuthModal(false);
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleAuthError(error);
      } else {
        setAuthError('An unexpected error occurred.');
      }
    }
  };

  const handleEmailLogin = async (email: string, password: string) => {
    try {
      if (!validateEmail(email)) {
        setEmailInvalid(true);
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      clearForm();
      setOpenAuthModal(false);
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleAuthError(error);
      } else {
        setAuthError('An unexpected error occurred.');
      }
    }
  };

  const handleEmailSignup = async (email: string, password: string) => {
    try {
      const errors = validatePassword(password);
      if (errors) {
        setPasswordInvalid(true);
        return;
      }
      if (!validateEmail(email)) {
        setEmailInvalid(true);
        setAuthError('Invalid email format.');
        return;
      }
      setAuthError('');
      await createUserWithEmailAndPassword(auth, email, password);
      clearForm();
      setOpenAuthModal(false);
    } catch (error) {
      if (error instanceof FirebaseError) {
        handleAuthError(error);
      } else {
        setAuthError('An unexpected error occurred.');
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    if (!isSignUp) return ''; // Skip password validation in login mode
    const rules = [
      { regex: /.{8,}/, message: 'Minimum 8 characters' },
      { regex: /[A-Z]/, message: '1 uppercase letter' },
      { regex: /\d/, message: '1 number' },
      { regex: /[\W_]/, message: '1 special character' }
    ];

    const failingRules = rules.filter(rule => !rule.regex.test(password)).map(rule => rule.message);
    return failingRules.length > 0 ? failingRules.join(', ') : '';
  };


  return (
    openAuthModal ? (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        overflow: 'auto'
      }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '10px',
          width: '90%',
          maxWidth: '400px',
          margin: '20px'

        }}>
          <Image src={primaryLogo} alt='rastro-ai' style={{
            top: '10px',
            right: '10px',
            width: '10%',
            height: '10%',
            marginBottom: '30px'
          }} />
          <div style={{ gap: '20px', marginBottom: '20px' }}>
            <button style={{ width: '100%', padding: '12px', borderRadius: '5px', fontWeight: 'bold', backgroundColor: 'white', color: 'black', border: '2px solid #ccc', fontSize: '14px', display: 'flex', alignItems: 'center', position: 'relative' }} onClick={handleGoogleLogin}>
              <span style={{ position: 'absolute', left: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 7.844v3.463h4.844a4.107 4.107 0 0 1-1.795 2.7v2.246h2.907c1.704-1.558 2.685-3.85 2.685-6.575 0-.633-.056-1.246-.162-1.83H9v-.004Z" fill="#3E82F1"></path>
                  <path d="M9 14.861c-2.346 0-4.328-1.573-5.036-3.69H.956v2.323A9.008 9.008 0 0 0 9 18.42c2.432 0 4.47-.8 5.956-2.167l-2.907-2.247c-.804.538-1.835.855-3.049.855Z" fill="#32A753"></path>
                  <path d="M3.964 5.456H.956a8.928 8.928 0 0 0 0 8.033l3.008-2.318a5.3 5.3 0 0 1-.283-1.699 5.3 5.3 0 0 1 .283-1.699V5.456Z" fill="#F9BB00"></path>
                  <path d="m.956 5.456 3.008 2.317c.708-2.116 2.69-3.69 5.036-3.69 1.32 0 2.508.453 3.438 1.338l2.584-2.569C13.465 1.41 11.427.525 9 .525A9.003 9.003 0 0 0 .956 5.456Z" fill="#E74133"></path>
                </svg>
              </span>
              <span style={{ margin: '0 auto' }}>Continue with Google</span>
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
            <div style={{ padding: '0 10px', backgroundColor: 'white', color: '#777', border: '1px solid #ccc', borderRadius: '5px' }}>OR</div>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '20px', fontSize: '14px' }}>
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => toggleMode('LOGIN')}>
              {'LOGIN'}
            </span>
            {' or '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => toggleMode('SIGNUP')}>
              {'SIGN UP'}
            </span>
            {' with email'}
          </div>
          {useEmailMethod && (
            <>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'normal', fontSize: '14px' }}>Email</label>
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => {
                    if (!validateEmail(email) && email) {
                      setEmailInvalid(true);
                    } else {
                      setEmailInvalid(false);
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: emailInvalid ? '1px solid red' : '1px solid #ccc',
                    fontSize: '14px'
                  }}
                />
                {emailInvalid && (
                  <div style={{
                    color: 'red',
                    textAlign: 'left',
                    position: 'absolute',
                    bottom: '-20px', // Position directly below the input box
                    left: '0',
                    fontWeight: 'bold',
                    fontSize: '12px'
                  }}>
                    Please enter a valid email address
                  </div>
                )}
              </div>
              {!isPasswordReset && (
                <>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'normal', fontSize: '14px' }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: passwordInvalid ? '1px solid red' : '1px solid #ccc', fontSize: '14px' }} />
                    <span onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                  {isSignUp ? <div style={{
                    color: passwordInvalid ? 'red' : '#777',
                    textAlign: 'left',
                    fontWeight: passwordInvalid ? 'bold' : 'normal',
                    fontSize: '12px'
                  }}>
                    Must be 8 or more characters and contain number, uppercase letter, and special character
                  </div> : null}
                </>
              )}
              <div style={{ position: 'relative', marginBottom: '40px', marginTop: '20px' }}>
                <button style={{ width: '100%', padding: '12px', borderRadius: '5px', backgroundColor: '#0e21f2', color: 'white', fontSize: '14px' }} onClick={isPasswordReset ? () => handlePasswordReset(email) : (isSignUp ? () => handleEmailSignup(email, password) : () => handleEmailLogin(email, password))}>
                  {isPasswordReset ? 'RESET PASSWORD' : (isSignUp ? 'SIGN UP' : 'LOGIN')}
                </button>
                {authError && <div style={{ color: 'red', textAlign: 'left', marginBottom: '20px', fontWeight: 'bold', fontSize: '12px' }}>{authError}</div>}
                {resetMessage && <div style={{ color: 'green', textAlign: 'left', marginBottom: '20px', fontWeight: 'bold', fontSize: '12px' }}>{resetMessage}</div>}
                {!isPasswordReset && !isSignUp && (
                  <div style={{ textAlign: 'right', fontSize: '12px', cursor: 'pointer', marginTop: '5px', color: '#777', textDecoration: 'underline' }} onClick={() => setIsPasswordReset(true)}>
                    Forgot Password?
                  </div>
                )}
              </div>
            </>
          )}
          <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-left', flexGrow: 0, marginTop: '40px', padding: '0 24px' }}>
            <p style={{ fontFamily: 'Inter', color: '#74767e', fontSize: '12px', display: 'block', unicodeBidi: 'isolate' }}>
              {'By joining, you agree to our '}
              <a href="/html/terms.html" target="_blank" rel="noreferrer noopener" style={{ textDecoration: 'underline', transition: 'all 0.2s ease-in-out' }}>
                {'Terms of Service'}
              </a>
              {'. Read our '}
              <a href="/html/privacy.html" target="_blank" rel="noreferrer noopener" style={{ textDecoration: 'underline', transition: 'all 0.2s ease-in-out' }}>
                {' Privacy Policy'}
              </a>
              {' to learn about data usage. Learn more '}
              <a href="//getrastro.app" target="_blank" rel="noreferrer noopener" style={{ textDecoration: 'underline', transition: 'all 0.2s ease-in-out' }}>
                {' About us.'}
              </a>
            </p>
          </section>
        </div>
      </div>
    ) : null
  );
};

export default AuthModal;