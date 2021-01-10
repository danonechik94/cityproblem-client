import React, { useRef, useState, FunctionComponent } from 'react';
import { inject } from 'mobx-react';

import classnames from 'classnames';
import styles from './map.module.css';

import GoogleMapReact from 'google-map-react';
import Point from './shapes/point';
import ClusterMarker from './shapes/cluster';
import useSupercluster from 'use-supercluster';

import cities from '#/constants/cities';

interface Props {
  items: Issue[];
  city: City;
  store: Store;
}

const Map: FunctionComponent<Props> = inject('store')(({ store, city = cities.tula, items = [] }) => {
  const { center: defaultCenter, zoom: defaultZoom } = city;

  const mapRef = useRef();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(defaultZoom);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const points = items.map(({ geo_feature: { properties, ...restFeatureProps }, ...restItemProps }) => ({
    ...restFeatureProps,
    properties: {
      ...properties,
      cluster: false,
      ...restItemProps,
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  const handleItemClick = (item) => {
    setSelectedItemId(item.id);
    store.setSelectedIssue(item);
    store.showModal('issue');
  };

  const itemRenderer = (item) => {
    // TODO render shapes not only points

    const {
      properties: {
        cluster,
        ...itemData
      },
      geometry: {
        coordinates: [longitude, latitude]
      },
    } = item;

    const coordinates = {
      lng: longitude,
      lat: latitude,
    };

    const selected = itemData.id === selectedItemId;

    return <Point
      className={classnames({ [styles.selectedItem]: selected })}
      selected={selected}
      itemData={itemData}
      onClick={handleItemClick}
      {...coordinates}
    />
  }


  return (
    <GoogleMapReact
      yesIWantToUseGoogleMapApiInternals={true}
      bootstrapURLKeys={{ key: 'AIzaSyCYoNVELQUIe4H9tqS1G-PT1GG87jvs2ak' }}
      defaultCenter={defaultCenter}
      defaultZoom={zoom}
      onGoogleApiLoaded={({ map }) => {
        mapRef.current = map;
      }}
      options={() => ({
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false
      })}
      onChange={({ zoom, bounds }) => {
        setZoom(zoom);
        setBounds([
          bounds.nw.lng,
          bounds.se.lat,
          bounds.se.lng,
          bounds.nw.lat
        ]);
      }}
    >
      {clusters.map(cluster => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const {
          cluster: isCluster,
          point_count: pointCount
        } = cluster.properties;

        if (isCluster) {
          return (
            <ClusterMarker
              key={`cluster-${cluster.id}`}
              lat={latitude}
              lng={longitude}
              style={{
                width: `${10 + (pointCount / points.length) * 20}px`,
                height: `${10 + (pointCount / points.length) * 20}px`
              }}
              onClick={() => {
                const expansionZoom = Math.min(
                  supercluster.getClusterExpansionZoom(cluster.id),
                  20
                );

                if (mapRef && mapRef.current) {
                  mapRef.current.setZoom(expansionZoom);
                  mapRef.current.panTo({ lat: latitude, lng: longitude });
                }
              }}
            >
              {pointCount}
            </ClusterMarker>
          );
        }

        return itemRenderer(cluster);
      })}
    </GoogleMapReact>
  )
});

export default Map;