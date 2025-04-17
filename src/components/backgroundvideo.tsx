const videoSrc = "/small.mp4";

export default function Backgroundvideo() {
    return (
        <video autoPlay controls muted loop playsInline className="w-full fixed -z-10">
            <source src={videoSrc} type="video/mp4"/>
            <track
            />
        </video>
    )
}