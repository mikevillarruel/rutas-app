import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";
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
        Geolocation.watchPosition(
            ({ coords }) => {
                console.log(coords);
                setUserLocation({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                })

            },
            (err) => console.log({ err }),
            { enableHighAccuracy: true, distanceFilter: 10 }
        );
    }

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
    }
}
