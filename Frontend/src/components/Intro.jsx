// HeroIcon's import
import { KeyIcon, UserPlusIcon } from '@heroicons/react/24/solid'
// 
import React, {useState} from 'react'
// assets
import illustration from "../assets/illustration.jpg"
// rrd imports
import { useFetcher, Form } from 'react-router-dom'
const Intro = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    // Local state to toggle between Login and Register UI
    const [isLogin, setIsLogin] = useState(true);
  return (
    <div className='intro'>
        <div>
            <h1>
                Take Control of <span className='accent'>Your Money</span>
            </h1>
            <p>
                Personal budgeting is the secret to financial freedom. Start your journey today.
            </p>
            <fetcher.Form method='post'>
                {/* We send the action type to the Dashboard action */}
                <input type="hidden" name='_action' value={isLogin ? "login" : "register"} />

                {/* Only show Name field during Registration */}
                {!isLogin && (
                    <input
                        type='text'
                        name='userName'
                        required
                        placeholder='What is your name?'
                        aria-label='Your Name'
                        autoComplete='given-name'
                    />
                )}
                <input 
                    type='email'
                    name='email'
                    required
                    placeholder='Enter your email'
                    aria-label='Email Address'
                    autoComplete='email'
                />
                <input 
                    type='password'
                    name='password'
                    required
                    placeholder='Enter your Password'
                    aria-label='Password'
                    autoComplete='current-password'
                />
                <button
                    type='submit'
                    className='btn btn--dark'
                    disabled={isSubmitting}
                ><span>{isLogin ? "Login" : "Create Account"}</span>
                {isLogin ? <KeyIcon width={20}/> : <UserPlusIcon width={20}/>}
                </button>  
            </fetcher.Form>
            {/* Toggle between Login and Register modes */}
            <div style={{marginTop: "1.5rem"}}>
                <p style={{fontSize: "0.9rem", color: "var(--muted)"}}>
                    {isLogin ? "Don't have an account" : "Already have an account?"}
                    {" "}
                    <button
                        type='button'
                        className='btn btn--warning'
                        style={{padding: "0.2rem 0.6rem", fontSize: "0.8 rem", display: "inline-block"}}
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Register here" : "Login here"}
                    </button>
                </p>
            </div>
        </div>
        <img src={illustration} alt="Person with money" width={600} />
    </div>
  )
}

export default Intro