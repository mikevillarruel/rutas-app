import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from '../components/Fab';

interface Props {
    markers?: Marker[];
}

export const Map = ({ markers }: Props) => {

    const {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
    } = useLocation();

    const mapViewRef = useRef<MapView>();
    const following = useRef(true);

    useEffect(() => {
        followUserLocation();
        return () => {
            stopFollowUserLocation();
        }
    }, [])

    useEffect(() => {
        if (!following.current) return;
        mapViewRef.current?.animateCamera({
            center: userLocation,
        })
    }, [userLocation])


    const centerPosition = async () => {
        const location = await getCurrentLocation();

        mapViewRef.current?.animateCamera({
            center: location,
        })
    }

    if (!hasLocation) {
        return <LoadingScreen />
    }

    return (
        <>
            <MapView
                ref={(element) => {
                    mapViewRef.current = element!
                }}
                style={{ flex: 1 }}
                // provider={PROVIDER_GOOGLE}
                showsUserLocation
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onTouchStart={() => following.current = false}
            >
                {/* <Marker
                    // key={index}
                    image={require('../assets/custom-marker.png')}
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title={'Title'}
                    description={'Description'}
                /> */}

            </MapView>
            <Fab
                iconName='locate-outline'
                onPress={()=>{
                    centerPosition();
                    following.current=true;
                }}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                }}
            />

        </>
    )
}
