"use client"

import React from "react";
import Link from "next/link";

export default function RegisterPage(){
  return (
    <main style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#071129',color:'white',padding:24}}>
      <div style={{maxWidth:680,background:'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))',padding:28,borderRadius:14}}>
        <h2 style={{margin:0}}>Teacher Registration</h2>
        <p style={{color:'rgba(255,255,255,0.8)'}}>This is a placeholder registration page. Implement registration form here.</p>
        <div style={{marginTop:14}}>
          <Link href="/login/teacher" style={{color:'#7c3aed',textDecoration:'underline'}}>Back to Login</Link>
        </div>
      </div>
    </main>
  )
}
