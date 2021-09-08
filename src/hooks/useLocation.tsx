import Geolocation from "@react-native-community/geolocation";
import { useEffect, useRef, useState } from "react";
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);
    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });

    const [userLocation, setUserLocation] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });

    const watchId = useRef<number>();

    useEffect(() => {
        getCurrentLocation().then((location) => {
            setInitialPosition(location);
            setUserLocation(location);
            setHasLocation(true);
        });
    }, [])

    const getCurrentLocation = () => {
        return new Promise<Location>((resolve, reject) => {

            Geolocation.getCurrentPosition(
                ({ coords }) => {

                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    })
                },
                (err) => reject({ err }),
                { enableHighAccuracy: true, }
            );

        })
    }

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({ coords }) => {

                setUserLocation({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                })

            },
            (err) => console.log({ err }),
            { enableHighAccuracy: true, distanceFilter: 10 }
        );
    }

    const stopFollowUserLocation = () => {
        if (watchId.current) {
            Geolocation.clearWatch(watchId.current!);
        }
    }

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation
    }
}
