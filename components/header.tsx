import { UserButton } from "./auth/user-button";
import HeaderLogo from "./header-logo";
import Navigation from './navigation'
import WelcomeMsg from "./welcome-msg";


export default function Header({image, userName}: {image: string | null | undefined, userName: string | null | undefined})
{
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500  px-4 py-8 lg:px-14 pb-36">

        <div className="max-w-screen-2xl mx-auto">
        
            <div className="w-full flex items-center justify-between mb-14">
        
                <div className="flex items-center lg:gap-x-16">
                    <HeaderLogo/>
                    <Navigation/>
                </div>
                <UserButton image={image}/>
                
            </div>
            <WelcomeMsg userName={userName}/>
        </div>
    </header>
  )
}
