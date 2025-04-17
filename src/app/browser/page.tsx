"use client"

import { useState, useEffect } from "react"


export default function Aboutpage() {
    const [boxWidth, setBoxWidth] = useState(100)
    const [boxHeight, setBoxHeight] = useState(100)
    const [positionX, setPositionX] = useState(0)
    const [positionY, setPositionY] = useState(0)
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [geoError, setGeoError] = useState<string | null>(null)


    const getGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude.toFixed(6))
                    setLongitude(position.coords.longitude.toFixed(6))
                    setGeoError(null)
                },
                (error) => {
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            setGeoError("Zugriff auf Standort wurde verweigert.")
                            break
                        case error.POSITION_UNAVAILABLE:
                            setGeoError("Standortinformation nicht verfügbar.")
                            break
                        case error.TIMEOUT:
                            setGeoError("Zeitüberschreitung bei der Standortabfrage.")
                            break
                        default:
                            setGeoError("Unbekannter Fehler bei der Standortabfrage.")
                    }
                }
            )
        } else {
            setGeoError("Geolocation wird von diesem Browser nicht unterstützt.")
        }
    }

    useEffect(() => {
        getGeolocation()
    }, [])

    useEffect(() => {
        const moveStep = 10;
        const sizeStep = 10;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key.toLowerCase()) {

                case 'a':
                    setPositionX(prev => prev - moveStep);
                    break;
                case 'd':
                    setPositionX(prev => prev + moveStep);
                    break;
                case 'w':
                    setPositionY(prev => prev - moveStep);
                    break;
                case 's':
                    setPositionY(prev => prev + moveStep);
                    break;
                
                case 'arrowup':
                    setBoxWidth(prev => prev + sizeStep);
                    e.preventDefault();
                    break;
                case 'arrowdown':
                    setBoxWidth(prev => Math.max(10, prev - sizeStep))
                    e.preventDefault();
                    break;
                case 'arrowleft':
                    setBoxHeight(prev => Math.max(10, prev - sizeStep));
                    e.preventDefault();
                    break;
                case 'arrowright':
                    setBoxHeight(prev => prev + sizeStep);
                    e.preventDefault();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <main className="h-full w-full flex flex-col items-center justify-center mb-30 z-0">
            <div style={{ width: boxWidth, height: boxHeight, transform: `translate(${positionX}px, ${positionY}px)`, transition: 'transform 0.1s ease'}} className="bg-cyan-500"></div>

            <div className="fixed bottom-0 w-full h-fit text-white flex gap-15 p-1.5 items-center justify-center">
                <p>Position X-Achse: <span>{positionX}</span></p>
                <p>Position Y-Achse: <span>{positionY}</span></p>
                <p>Aktuelle Fläche: {boxWidth} x {boxHeight} px</p>
                <div className="flex flex-col items-center">
                    {geoError ? (
                        <div className="text-red-500">{geoError}</div>
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <p>Dein aktueller Standort</p>
                            <p>Breitengrad: {latitude} Längengrad: {longitude}</p>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="mt-5 text-center fixed top-15 left-15 text-white p-2">
                <p className="font-semibold mb-2">Steuerung:</p>
                <p>WASD: Bewege das blaue Quadrat</p>
                <p>Pfeiltasten: Ändere die Größe des Quadrats</p>
            </div>
        </main>
    )
}