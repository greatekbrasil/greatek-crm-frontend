import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Box, Typography } from '@mui/material';

// Fonte do GEOJSON atualizada para mapa do Brasil em níveis estaduais
const geoUrl = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

function BrazilMap({ highlightStates = [], highlightColor = '#0081cc', defaultColor = '#e9e9e9' }) {
  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Typography variant="subtitle2" align="center" color="text.secondary" sx={{ mb: 1 }}>
        Sua Região de Atuação
      </Typography>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 600,
          center: [-54, -15] // Centraliza no Brasil
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // Os IDs/nomes no geojson geralmente vem como geo.properties.sigla ou geo.properties.name
              // Ajustamos para verificar se a sigla do estado está no array de destaque
              const isHighlighted = highlightStates.includes(geo.properties.sigla) || highlightStates.includes('TODOS');
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHighlighted ? highlightColor : defaultColor}
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover:   { fill: isHighlighted ? highlightColor : "#cccccc", outline: "none" },
                    pressed: { fill: highlightColor, outline: "none" }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </Box>
  );
}

export default BrazilMap;
