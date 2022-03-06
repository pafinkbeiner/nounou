import React, { useEffect, useState } from 'react'
import axios from 'axios'

/* Use AnimationRevealPage as a wrapper component for your pages if you are building a custom one yourself */
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Hero from "components/hero/TwoColumnWithFeaturesAndTestimonial.js";
import FeatureStats from "components/features/ThreeColCenteredStatsPrimaryBackground.js";
import ContactUsForm from 'components/forms/TwoColContactUsWithIllustrationFullForm';
import Footer from 'components/footers/MiniCenteredFooter';


const Home = () => {

    const [navigationData, setNavigationData] = useState([{name: "Features", url: "#"}, {name: "Pricing", url: "#"}, {name: "Testimonials", url: "#"}, {name: "Support", url: "#"}])

    const [heroData, setHeroData] = useState({
        heading: "Better, Faster and Cheaper Cloud.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        imageDecoratorBlob: true,
        primaryButtonUrl: "https://google.com",
        primaryButtonText: "Get Started",
        buttonRounded: true,
        features: ["Available in 7 Locations", "Premium Internet Backbone", "99.99% Uptime SLA"],
        testimonial: {
            quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            customerName: "Charlotte Hale",
            customerCompany: "Delos Inc."
        }
    })

    const [statsData, setStatsData] = useState({
        subheading: "",
        heading: "Over 9000 Projects Completed",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stats: [
            {
                key: "Clients",
                value: "2500+",
            },
            {
                key: "Revenue",
                value: "$100M+",
            },
            {
                key: "Employees",
                value: "150+",
            },
        ]
    })

    const [contactData, setContactData] = useState({
        subheading: "Contact Us",
        heading: <>Feel free to <span tw="text-primary-500">get in touch</span><wbr /> with us.</>,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        submitButtonText: "Send",
        formAction: "#",
        formMethod: "get",
        textOnLeft: true,
    })

    useEffect(() => {
        document.title = "Home"
        window.scrollTo(0, 0)
        axios.get(`${process.env.REACT_APP_CMS_URL}/api/collections/get/Navigation`,{headers: {'Cockpit-Token': `${process.env.REACT_APP_CMS_TOKEN}`}}).then(res => {setNavigationData(res.data.entries)})
        axios.get(`${process.env.REACT_APP_CMS_URL}/api/singletons/get/Home`,
            {
                headers: {
                    'Cockpit-Token': `${process.env.REACT_APP_CMS_TOKEN}`
                }
            })
            .then(res => {
                console.log(res.data)
                setHeroData({
                    heading: res.data.hero_heading,
                    description: res.data.hero_description,
                    imageSrc: `${process.env.REACT_APP_CMS_URL}/${res.data.hero_imageSrc?.path}`,
                    imageDecoratorBlob: res.data.hero_imageDecoratorBlob,
                    primaryButtonUrl: res.data.hero_primaryButtonUrl,
                    primaryButtonText: res.data.hero_primaryButtonText,
                    buttonRounded: res.data.hero_buttonRounded,
                    features: res.data.hero_features?.map(item => item.value),
                    testimonial: {
                        quote: res.data.hero_testimonal_quote,
                        customerName: res.data.hero_testimonal_customerName,
                        customerCompany: res.data.hero_testimonal_customerCompany
                    }
                })
                setStatsData({
                    subheading: res.data.stats_subheading,
                    heading: res.data.stats_heading,
                    description: res.data.stats_description,
                    stats: [
                        {
                            key: "Clients",
                            value: "2500+",
                        },
                        {
                            key: "Revenue",
                            value: "$100M+",
                        },
                        {
                            key: "Employees",
                            value: "150+",
                        },
                    ]
                })
                setContactData({
                    subheading: res.data.subheading,
                    heading: res.data.heading,
                    description: res.data.description,
                    submitButtonText: res.data.submitButtonText,
                    formAction: res.data.formAction,
                    formMethod: res.data.formMethod,
                    textOnLeft: res.data.textOnLeft,
                
                })
            })
    }, [])

    return (
        <AnimationRevealPage>
            <Hero {...heroData} navigation={navigationData}/>
            <FeatureStats {...statsData} />
            <ContactUsForm {...contactData} />
            <Footer />
        </AnimationRevealPage>
    )
}

export default Home