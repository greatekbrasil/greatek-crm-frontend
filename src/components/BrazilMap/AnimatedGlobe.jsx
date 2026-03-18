import React, { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import { Box, useTheme, Typography } from '@mui/material';

export default function AnimatedGlobe({ highlightStates = [] }) {
  const [statesData, setStatesData] = useState([]);
  const globeEl = useRef();
  const theme = useTheme();

  useEffect(() => {
    // Carrega o GeoJSON dos estados do Brasil
    fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson')
      .then(res => res.json())
      .then(data => {
        setStatesData(data.features);
        
        // Direcionar a câmera com animação exatamente para o Brasil após carregar
        setTimeout(() => {
          if (globeEl.current) {
            globeEl.current.pointOfView({ lat: -14.235, lng: -51.925, altitude: 1.2 }, 3000);
            
            // Fixo: sem girar sozinho, apenas permitindo o usuário mover se quiser
            globeEl.current.controls().autoRotate = false;
            globeEl.current.controls().enableZoom = false; // Desativa o zoom no scroll para não bugar a página
          }
        }, 500);
      });
  }, []);

  const isHighlighted = (feat) => {
    return highlightStates.includes(feat.properties.sigla) || highlightStates.includes('TODOS');
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <Globe
        ref={globeEl}
        width={350} 
        height={350}
        
        // Um fundo Claro/Branco do Planeta Terra (Minimalista)
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
        
        // Fundo transparente para incorporar perfeitamente no cartão branco
        backgroundColor="rgba(0,0,0,0)"
        
        // Dados dos nossos estados
        polygonsData={statesData}
        
        // Altura plana (sem relevo saltado)
        polygonAltitude={() => 0.005}
        
        // Cores impressionantes usando a paleta da Greatek (Azul para destaque, Branco/Cinza para o resto)
        polygonCapColor={d => (isHighlighted(d) ? theme.palette.primary.main : 'rgba(230, 230, 230, 0.8)')}
        polygonSideColor={d => (isHighlighted(d) ? theme.palette.secondary.main : 'rgba(200, 200, 200, 0.4)')}
        polygonStrokeColor={() => '#ffffff'}
        
        // Atmosfera clara
        showAtmosphere={true}
        atmosphereColor="#ffffff"
        atmosphereAltitude={0.15}
        
        // Animação ao subir os dados
        polygonsTransitionDuration={1000}
      />
      
      <Typography variant="caption" color="text.secondary" sx={{ position: 'absolute', bottom: 10, fontStyle: 'italic', zIndex: 10 }}>
        Renderizado em 3D (Arraste para rotacionar)
      </Typography>
    </Box>
  );
}
