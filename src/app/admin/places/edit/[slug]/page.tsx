import { FC } from 'react'
import PlacesEditor from "@/components/screens/PlacesEditor/PlacesEditor";

const page:FC<{params: Promise<{ slug: string }>}> = async({params}) => {
    const { slug } = await params
    return (
    <div style={{marginBottom:"50px"}}>
        <PlacesEditor id={+slug} ></PlacesEditor>
    </div>)
};
export default page;