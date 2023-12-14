"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {

    return(
      <div>
        <p className="ml-2">Landing Page!</p>
        <br></br>
        <Button className="ml-2" asChild>
          <Link href="/sign-in">Login</Link>
        </Button>
      </div>
      
    )
  }
  export default LandingPage
  