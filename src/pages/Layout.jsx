import React, { useEffect } from 'react'

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from 'components/footers/MiniCenteredFooter';
import Header from "components/headers/light"

const Layout = ({ children }) => {

    useEffect(() => {
      // fetch nav links
      // fetch footer links
    }, [])
    
    return (
        <AnimationRevealPage>
            <Header navigation={[{name: "Features", url: "#"}, {name: "Pricing", url: "#"}, {name: "Testimonials", url: "#"}, {name: "Support", url: "#"}]}/>
            {children}
            <Footer />
        </AnimationRevealPage>
    )
}

export default Layout