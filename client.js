// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Surface, Location} from 'react-360-web';

function init(bundle, parent, options = {}) {

  const horizontalPanel = new Surface(600, 500, Surface.SurfaceShape.Flat);
  const location = new Location([500,-90,25]);

  horizontalPanel.setAngle(0,-70);

  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  // Render your app content to the default cylinder surface
  r360.renderToSurface(r360.createRoot('HorizontalPanel', {
    photos: [
      {uri: './static_assets/a1.jpg', title: '360 World', format: '2D'},
      {uri: './static_assets/a2.jpg', title: '360 World', format: '2D'},
      {uri: './static_assets/a3.jpg', title: '360 World', format: '2D'},
    ],
  }), horizontalPanel);
  r360.renderToLocation(
    r360.createRoot('Hello360'),
    r360.getDefaultSurface()
  );
  r360.renderToLocation(
    r360.createRoot('My3DView'),
    location,
  );

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('a3.jpg'));
  // r360._cameraPosition = [0, 3, 0]; 
}

window.React360 = {init};
