import { FC } from 'react'

import TourEditor from "@/components/screens/ToursEditor/tourEditor";
const page:FC<{params: Promise<{ slug: string }>}> = async({params}) => {
    const { slug } = await params
    return (
    <div style={{marginBottom:"50px"}}>
        <TourEditor id={+slug} ></TourEditor>
    </div>)
};
export default page;