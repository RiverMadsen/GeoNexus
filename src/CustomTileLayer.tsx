import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

interface CustomTileLayerProps {
    url: string;
    attribution: string;
    onTileLayerLoaded: () => void;
}

const CustomTileLayer: React.FC<CustomTileLayerProps> = (props) => {
    const map = useMap();
    const { onTileLayerLoaded } = props;
    useEffect(() => {
        const tileLayer = L.tileLayer(props.url, props);
        tileLayer.on('add', function () {
            //ebugger;
            onTileLayerLoaded();
        });
        tileLayer.addTo(map);
        //tileLayer.on('load', onTileLayerLoaded);

        return () => {
            //tileLayer.off('load', onTileLayerLoaded);
        };


    }, [map, props]);

    return null;
};

export default CustomTileLayer;