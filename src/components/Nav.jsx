import React from 'react'
// assets
import logomark from "../assets/logomark.svg"
// rrd imports
import { Form, NavLink } from 'react-router-dom'

// library
import { TrashIcon } from '@heroicons/react/24/solid'
const Nav = ({userName}) => {
  return (
    <div>
        <NavLink
            to="/"
            aria-label="Go to home"
        >
            <img src={logomark} alt="" height={30} />
            <span>HomeBudget</span>
        </NavLink>
        {
            userName && (
                <Form 
                    method='post'
                    action='/logout'
                    onSubmit={(event)=>{
                        if(!confirm("Delete user and all data")){
                            event.preventDefault()
                        }
                    }}
                >
                <button type='submit' className='btn btn--warning'>
                    <span>Delete User</span>
                    <TrashIcon width={20} />
                </button>
                </Form>
            )
        }
    </div>
  )
}

export default Nav