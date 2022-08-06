import React, {FC, useEffect, useRef, useState} from "react"
import Loader from "components/Loader/Loader"
import StationsList from "components/StationsList"
import {useActions, useAppSelector} from "hooks/redux"
import {useGetCountriesQuery, useGetStationsByCountryQuery,} from "store/radio/radioApi"
import CountryList from "components/CountryList"
import VolumeIcon from "components/VolumeIcon"


const App: FC = () => {
    const {setStation, setCountry} = useActions()
    const {station, country} = useAppSelector(state => state.radio)
    const [isPlay, setPlay] = useState<boolean>(false)
    const [canPlay, setCanPlay] = useState<boolean>(false)
    const [volume, setVolume] = useState<number>(100)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const {
        isLoading: isStationsLoading,
        isError: isStationsError,
        data: stations
    } = useGetStationsByCountryQuery({country: country?.iso_3166_1 || "ru", limit: 50,})
    const {
        isLoading: isCountriesLoading,
        isError: isCountriesError,
        data: countries
    } = useGetCountriesQuery()

    const play = () => {
        audioRef.current?.play()
        if (imgRef.current) {
            imgRef.current.style.animationPlayState = "running"
        }
        setPlay(true)
    }

    const pause = () => {
        audioRef.current?.pause()
        if (imgRef.current) {
            imgRef.current.style.animationPlayState = "paused"
        }
        setPlay(false)
    }

    useEffect(() => {
        if (!isStationsLoading && stations) {
            setStation(stations[0])
        }
    }, [stations])

    useEffect(() => {
        setCanPlay(false)
        pause()
    }, [station])

    useEffect(() => {
        if (countries) {
            setCountry(countries[0])
        }
    }, [countries])

    return (
        <div className="appContainer">
            {(isStationsError || isCountriesError) && <h2 className="text-center text-5xl">Something were wrong...</h2>}
            <div className="relative">
                {
                    (canPlay && !isStationsLoading && !isCountriesLoading)
                        ?
                        <button
                            className="posCenter"
                            onClick={isPlay ? pause : play}>
                            {
                                isPlay
                                    ?
                                    <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor"
                                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="6" y="4" width="4" height="16"/>
                                        <rect x="14" y="4" width="4" height="16"/>
                                    </svg>
                                    :
                                    <svg className="h-8 w-8 text-white ml-1" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor"
                                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="5 3 19 12 5 21 5 3"/>
                                    </svg>
                            }
                        </button>
                        :
                        <div
                            className="posCenter scale-50">
                            <Loader/>
                        </div>
                }
                <img ref={imgRef}
                     src={station?.favicon ||
                         "https://images.unsplash.com/photo-1602848596140-33c2b48c6ade?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1156&q=80"}
                     alt="background"
                     className="diskBg"/>
                <div className="blackCircle"/>
            </div>
            <div className="mt-5 mx-auto flex items-center gap-x-2">
                <VolumeIcon volume={volume}/>
                <input className="w-full" type="range" min={0} max={100} value={volume} onChange={(e) => {
                    setVolume(Number(e.currentTarget.value))
                    if (audioRef.current) {
                        audioRef.current.volume = Number(e.currentTarget.value) / 100
                    }
                }}/>
            </div>
            <div className="relative mt-2 z-10">
                <CountryList countries={countries || []} isLoading={isCountriesLoading}/>
            </div>
            <div className="relative mt-2">
                <StationsList stations={stations || []} isLoading={isStationsLoading}/>
            </div>
            <audio src={station?.url} ref={audioRef}
                   onCanPlay={() => setCanPlay(true)}/>
        </div>
    )
}

export default App
