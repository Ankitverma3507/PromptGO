"use client";

import Link from 'next/link' // Link is a component that allows you to link to other pages in your app
import Image from 'next/image' // Image is a component that allows you to display images
import { useState, useEffect } from 'react'
import {signIn ,useSession, getProviders, signOut} from 'next-auth/react'

const Nav = () => {

    const {data: session} = useSession();

    const [providers, setProviders] = useState(null);
    const [toggledropdown, settoggledropdown] = useState(false);
    useEffect(() => {
        const setUpProviders = async () => {
            const response= await getProviders();

            setProviders(response);
        }

        setUpProviders();
    }, []);

// alert (providers)
return (
    <nav className='w-full flex-between mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
                <Image 
                src='/assets/images/logo.svg' 
                width={40} 
                height={40} 
                alt='Prompto Logo' 
                className='object-contain'
                />
                <p className='logo_text'>Prompto</p>
        </Link>

        {/* {Desktop view} */}

        <div className='sm:flex hidden'>
            {session?.user ?(
                <div className='flex gap-3 md:gap-5'>
                    <Link href='/create-prompt' className='black_btn'>
                        Create post
                    </Link>

                    <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>

                    <Link href='/profile'>
                        <Image 
                        src={session?.user.image}
                        width={40} 
                        height={40} 
                        alt='Profile' 
                        className='rounded-full'
                        />
                    </Link>
                </div>
            ):
            <>
                {
                    providers && Object.values(providers).map((provider) => (
                        
                            <button 
                            type='button' 
                            key={provider.name}
                            onClick={() => signIn(provider.id)} className='black_btn'
                            >
                            Sign In
                            </button>
                        
                    ))
                }
            </>
            }
        </div>

        {/* {Mobile view} */}
        <div className='sm:hidden flex relative'>
            {session?.user ?(
                <div className='flex'>
                <Image 
                        src={session?.user.image} 
                        width={37} 
                        height={37} 
                        alt='Profile' 
                        className='rounded-full'
                        onClick={()=> settoggledropdown((prev)=>!prev)}
                        />

                        {toggledropdown &&
                        <div className='dropdown'>
                            <Link
                                href= '/profile'
                                className='dropdown_link'
                                onClick={()=> settoggledropdown(false)}
                            >
                            My Profile
                            </Link>
                            <Link
                                href= '/create-prompt'
                                className='dropdown_link'
                                onClick={()=> settoggledropdown(false)}
                            >
                            Create Prompt
                            </Link>
                            <button 
                            type='button'
                            onClick={()=>{
                                settoggledropdown(false)
                                signOut()
                            }}
                            className='mt-5 w-full black_btn'
                            >
                            Sign Out
                            </button>
                        </div>
                        }
                </div>


            ) :<>
                {
                    providers && Object.values(providers).map((provider) => (
                        
                            <button 
                            type='button' 
                            key={provider.name}
                            onClick={() => signIn(provider.id)} className='black_btn'
                            >
                            Sign In
                            </button>
                        
                    ))
                }
            </>}
        </div>
    </nav>
);
};

export default Nav